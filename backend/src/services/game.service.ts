import { Injectable } from '@nestjs/common';
import { GameDto } from '../dto/game.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from '../entities/entities/Games';
import { Repository } from 'typeorm';
import { GamePlayers } from '../entities/entities/GamePlayers';
import { Users } from '../entities/entities/Users';
import { GameTypes } from '../entities/entities/GameTypes';
import {ICreateGameData} from "../types/gameData";
import {IPlayerBlockchain} from "../types/blockchain";
import {IDataToPay} from "../types/dataToPay";
import {GameGateway} from "../game/game-websocket";
import {RockPaperScissorsService} from './games/rock-paper-scissors.service';
import {GameCommonService} from './game-common.service';
import {BlockchainService} from './blockchain.service';
import {DiceService} from './games/dice.service';
import {ethers} from 'ethers';

@Injectable()
export class GameService {
  private contractListeners = new Map<number, any>();
  private lastSendByGame: Map<number, { note: string; ts: number } | undefined> = new Map();

  constructor(
      private configService: ConfigService,
      @InjectRepository(Games)
      private gameRepository: Repository<Games>,
      @InjectRepository(GamePlayers)
      private gamePlayersRepository: Repository<GamePlayers>,
      @InjectRepository(GameTypes)
      private gameTypesRepository: Repository<GameTypes>,
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
      private blockchainService: BlockchainService,
      private rockPaperScissorsService: RockPaperScissorsService,
      private diceService: DiceService,
      private gameCommonService: GameCommonService,
      private readonly gameGateway: GameGateway
  ) {
    this.gameGateway._websocketEvents.subscribe(async (data: {event: string, payload: any}) => {
      if(data.event === 'connect_game') {
        const getStorageAddress = (await this.getGameById(data.payload.gameId))?.contractAddress;
        const gameData = await this.gameCommonService.getGameData(data.payload.gameId);
        if (getStorageAddress) {
          await this.contractListener(data.payload.gameId, getStorageAddress);
        }
        if (gameData.gameInfo.type === 'rock-paper-scissors') {
          await this.rockPaperScissorsService.sendRpsData('game_data', 'first_send', gameData, data.payload.gameId);
        } else if (gameData.gameInfo.type === 'dice') {
          await this.diceService.sendDiceData('game_data', 'first_send', gameData, data.payload.gameId, {});
        }
      } else if (data.event === 'handleConnection') {
        console.log('handleConnection')
      } else if (data.event === 'join_game') {
        await this.addWalletToGame(data.payload.gameId, data.payload.wallet);
        const gameDataBeforeDeploy = await this.gameCommonService.getGameData(data.payload.gameId);
        if (gameDataBeforeDeploy.gameInfo.type === 'rock-paper-scissors') {
          await this.rockPaperScissorsService.sendRpsData('game_data', 'before_deploy', gameDataBeforeDeploy, data.payload.gameId);
          await this.checkEverythingIsReady(gameDataBeforeDeploy.gameInfo.bet.toString(), data.payload.gameId);
          const gameData = await this.gameCommonService.getGameData(data.payload.gameId);
          await this.rockPaperScissorsService.sendRpsData('game_data', 'after_deploy', gameData, data.payload.gameId);
        } else if (gameDataBeforeDeploy.gameInfo.type === 'dice') {
          await this.diceService.sendDiceData('game_data', 'before_deploy', gameDataBeforeDeploy, data.payload.gameId, null);
          await this.checkEverythingIsReady(gameDataBeforeDeploy.gameInfo.bet.toString(), data.payload.gameId);
          const gameData = await this.gameCommonService.getGameData(data.payload.gameId);
          await this.diceService.sendDiceData('game_data', 'after_deploy', gameData, data.payload.gameId, null);
        }

      } else if (data.event === 'send_money') {
        await this.sendMoney(data.payload.gameId, data.payload.wallet);
      } else if (data.event === 'leave_game') {
        await this.leaveGame({
          gameId: data.payload.gameId,
          wallet: data.payload.wallet
        });
        const gameData = await this.gameCommonService.getGameData(data.payload.gameId);
        this.gameGateway.send('game_data', gameData, data.payload.gameId)
      }
    })
  }

  async createGame(data: ICreateGameData): Promise<Games> {


    const gameDto: GameDto = {
      type: data.type || '',
      ownerAddress: this.configService.get<string>('OWNER_ADDRESS') as string,
      wallet: data.wallet,
    };

    const game = await this.gameRepository.save(gameDto);
    if (!game?.id) {
      throw new Error('Не удалось сохранить игру');
    }

    return game;
  }

  async getGameById(id: number) {
    return await this.gameRepository.findOne({
      where: { id },
      relations: ['gameData', 'gamePlayers', 'gamePlayers.user', 'gamePlayers.game'],
    });
  }

  async getUserDataByWallet(wallet: string) {
    return await this.usersRepository.findOne({
      where: { wallet },
    });
  }

  async addWalletToGame(gameId: number, wallet: string) {
    return this.modifyGamePlayers('add', gameId, wallet);
  }

  async leaveGame(params: { gameId: number; wallet: string }) {
    return this.modifyGamePlayers('remove', params.gameId, params.wallet);
  }

  private async modifyGamePlayers(
      action: 'add' | 'remove',
      gameId: number,
      wallet: string
  ): Promise<{ wallet: string }> {
    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) throw new Error('Game not found');

    const user = await this.usersRepository.findOne({ where: { wallet } });
    if (!user) throw new Error('User not found for the provided wallet');

    const existingPlayer = await this.gamePlayersRepository.findOne({
      where: { gameId, userId: user.id }
    });

    if (action === 'add') {
      const gameData = await this.gameCommonService.getGameDataById(gameId);
      if (existingPlayer) throw new Error('This user is already participating in the game');
      if (gameData.activePlayersCount > gameData.playersNumber) {
        throw new Error('No available spots in this game');
      }
      await this.gamePlayersRepository.save({ gameId, wallet, userId: user.id });
    } else if (action === 'remove') {
      if (!existingPlayer) {
        return { wallet };
      } else {
        await this.gamePlayersRepository.delete({ gameId, wallet });
      }
    }

    await this.gameCommonService.updatePlayerNumberSet(gameId);
    return { wallet };
  }

  async getGamesByTypeWithPlayerFlag(type: string, playerWallet: string) {
    const games = await this.gameRepository.find({
      where: { type },
      relations: ['gameData', 'gamePlayers'],
      select: {
        id: true,
        type: true,
        contractAddress: true,
        ownerAddress: true,
        finishedAt: true,
        createdAt: true,
        updatedAt: true,
        gameData: {
          bet: true,
          playersNumber: true,
          playerNumberSet: true,
          bots: true,
        },
      },
    });

    if (!games.length) {
      return [];
    }

    return games.map((game) => {
      const isPlayerJoined = game.gamePlayers?.some(
          (p) => p.wallet === playerWallet,
      ) ?? false;

      return {
        id: game.id,
        type: game.type,
        contractAddress: game.contractAddress,
        ownerAddress: game.ownerAddress,
        finishedAt: game.finishedAt,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        bet: game.gameData?.bet,
        playersNumber: game.gameData?.playersNumber,
        playerNumberSet: game.gameData?.playerNumberSet,
        bots: game.gameData?.bots,
        isPlayerJoined,
      };
    });
  }


  async areAllPlayersJoined(gameId: number): Promise<boolean> {

    const game = await this.gameCommonService.getGameDataById(
        gameId,
    );

    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    const playersNumber = Number(game.playersNumber);
    const playerNumberSet = Number(game.activePlayersCount);

    return playerNumberSet === playersNumber;
  }

  async updateContractAddress(
      gameId: number,
      contractAddress: string,
  ): Promise<void> {
    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    await this.gameRepository.update({ id: gameId }, { contractAddress });
  }

  getGameTypes() {
    return this.gameTypesRepository.find();
  }

  async getGamePlayers(gameId: number): Promise<(GamePlayers & { user?: Users })[]> {
    return this.gamePlayersRepository.find({
      where: { gameId },
      relations: ['user'],
    });
  }

  async getGameLogicAddress(gameId: number) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      select: ['type'],
    });
    let gameTypeWithAddress: any;
    if (game?.type) {
      gameTypeWithAddress = await this.gameTypesRepository.findOne({
        where: { name: game.type },
        select: ['logicAddress']
      });
    }
    return gameTypeWithAddress.logicAddress;
  }

  async setGameLogicAddress(gameId: number, logicAddress: string) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      select: ['type'],
    });

    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    if (!game.type) {
      throw new Error(`Game type not set for game ${gameId}`);
    }

    await this.gameTypesRepository.update({ name: game.type }, { logicAddress });
  }

  async checkEverythingIsReady(bet: any, gameId: number) {
    const betInWei = ethers.parseEther(bet);

    const allReady = await this.areAllPlayersJoined(gameId);
    let logicAddress = await this.getGameLogicAddress(gameId);
    if (allReady) {
      const gamePlayers = await this.getGamePlayers(gameId);
      const players: IPlayerBlockchain[] = gamePlayers.map(player => ({
        name: player.user?.login || 'Player',
        wallet: player.wallet,
        bet: betInWei.toString(),
        isPaid: false,
        isPaidOut: false,
        result: 0,
      }));

      const contractData = await this.blockchainService.deployGameLogicAddress(logicAddress);
      await this.setGameLogicAddress(gameId, contractData.logicAddress);
      const bettingTime = 5000 * 60;
      const playingTime = 30000 * 60;
      const storageAddress = await this.blockchainService.deployGameStorageAddress(
          players,
          bettingTime,
          playingTime,
          contractData.logicAddress,
      );
      await this.startTimer('betting_time', bettingTime, gameId);
      await this.updateContractAddress(gameId, storageAddress);
      await this.contractListener(gameId, storageAddress);
    }
  }

  async createFirstRound(gameId: number) {
    const type = (await this.gameCommonService.getGameDataById(gameId)).type
    if (type === 'rock-paper-scissors') {
      await this.rockPaperScissorsService.createRoundRockPaperScissors(gameId);
    }
    if (type === 'dice') {
      await this.diceService.createRoundDice(gameId);
    }
  }

  private timers = new Map<number, NodeJS.Timeout>();

  private async startTimer(note: string, duration: number, gameId: number) {
    this.stopTimer(gameId);

    let remainingSeconds = duration;

    const intervalId = setInterval(async () => {
      try {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          await this.sendTimer(note, remainingSeconds, gameId);
        } else {
          this.stopTimer(gameId);
        }
      } catch (error) {
        console.error(`Timer error for game ${gameId}:`, error);
        this.stopTimer(gameId);
      }
    }, 1000);

    this.timers.set(gameId, intervalId);
  }

  private stopTimer(gameId: number) {
    const timer = this.timers.get(gameId);
    if (timer) {
      clearInterval(timer);
      this.timers.delete(gameId);
    }
  }

  async sendTimer(note: string, remainingSeconds: number, gameId: number) {
    let dataTimer = {remainingSeconds, gameId};
    this.gameGateway.send(note, dataTimer, gameId)
  }

  async contractListener(gameId: number, storageAddress: any) {
    if (this.contractListeners.has(gameId)) {
      return this.contractListeners.get(gameId);
    }

    const contract = this.blockchainService.getContract(storageAddress);

    await contract.on("LogBet", async () => {
      await this.sendGameData('player_is_bet', gameId);
      await this.checkCanBotsPay(gameId)
    });

    await contract.once("BettingFinished", async () => {
      await this.sendGameData('betting_finished', gameId);
      const playingTime = 30000 * 60;
      await this.startTimer('playing_time', playingTime, gameId);
      await this.createFirstRound(gameId);
    });

    await contract.once("GameFinalized", async () => {
      this.stopTimer(gameId);
      await this.updateDataBaseFromBlockchain(gameId);
      await this.sendGameData('finish_game_data', gameId);

      this.contractListeners.delete(gameId);

    });

    this.contractListeners.set(gameId, contract);


    return contract
  }

  async checkCanBotsPay(gameId: number) {
    const gameData = await this.gameCommonService.getGameData(gameId);

    const unpaidWallets = gameData.players
        .filter(player => !player.bet)
        .map(player => player.wallet);

    let hasUnpaidRealPlayers = false;

    for (const wallet of unpaidWallets) {
      const realPlayer = await this.usersRepository.findOne({
        where: { status: 'player', wallet: wallet },
      });

      if (realPlayer) {
        hasUnpaidRealPlayers = true;
        break;
      }
    }

    if (hasUnpaidRealPlayers) {
      return;
    } else {
      if (unpaidWallets.length > 0 && unpaidWallets[0]) {
        await this.sendMoney(gameId, unpaidWallets[0]);
      }
    }
  }


  private async sendGameData(note: string, gameId: number) {
    const now = Date.now();
    const last = this.lastSendByGame.get(gameId);
    const debounceMs = note === 'player_is_bet' ? 300 : 0;
    if (last && last.note === note && debounceMs > 0 && (now - last.ts) < debounceMs) {
      return;
    }
    this.lastSendByGame.set(gameId, { note, ts: now });

    const gameData = await this.gameCommonService.getGameData(gameId);
    if (gameData.gameInfo.type === 'rock-paper-scissors') {
      await this.rockPaperScissorsService.sendRpsData('game_data', note, gameData, gameId);
    } else if (gameData.gameInfo.type === 'dice') {
      await this.diceService.sendDiceData('game_data', note, gameData, gameId, {activeWallet: null, diceCount:null});
      // await this.diceService.sendDiceData('game_data', note, gameData, gameId, null);
    }
  }

  async updateDataBaseFromBlockchain(gameId: number) {
    const gameDataById = await this.gameCommonService.getGameDataById(gameId);

    if (gameDataById?.contractAddress) {
      const playerData = await this.blockchainService.getGameData(gameDataById.contractAddress);
      await this.gameRepository.update(
          { id: gameId },
          { finishedAt: () => "NOW()" }
      );
      if (playerData.players && Array.isArray(playerData.players)) {
        for (const player of playerData.players) {
          const winInEth = ethers.formatEther(player.result.toString());
          await this.gamePlayersRepository.update(
              {
                gameId,
                wallet: player.wallet
              },
              {
                win: Number(winInEth),
              }
          );
        }
      }
    }
  }

  async sendMoney(gameId: number, wallet: string) {
    const game = await this.getGameById(gameId);
    const userData = await this.getUserDataByWallet(wallet);

    const dataToPay: IDataToPay = {
      wallet: wallet,
      gameId: gameId,
      contractAddress: game?.contractAddress || '',
      contractBet: game?.gameData.bet.toString() || '0',
      privateKey: userData?.encryptedPrivateKey || '',
    }
    await this.blockchainService.playerPayment(dataToPay);
  }

  async getBotsAccounts() {
    return await this.usersRepository.find({
      where: { status: 'bot' },
    });
  }
}
