import { Injectable } from '@nestjs/common';
import { GameDto } from '../dto/game.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from '../entities/entities/Games';
import { Repository } from 'typeorm';
import { GamePlayers } from '../entities/entities/GamePlayers';
import { Users } from '../entities/entities/Users';
import { GameData } from '../entities/entities/GameData';
import { GameTypes } from '../entities/entities/GameTypes';
import {IGameData} from "../types/gameData";
import {GameDataDto} from "../dto/gameData.dto";
import {GamePlayerDto} from "../dto/GamePlayer.dto";
import {BlockchainService} from "./blockchain.service";

export interface ICreateGameData {
  wallet: string;
  userId: number;
  type: string;
  playersNumber: number;
  bet: number;
}

@Injectable()
export class GameService {
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
      @InjectRepository(GameData)
      private gameDataRepository: Repository<GameData>,
      private blockchainService: BlockchainService,
  ) {}

  async createGame(data: ICreateGameData): Promise<Games> {
    const user = await this.usersRepository.findOne({
      where: { wallet: data.wallet },
    });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const gameDto: GameDto = {
      type: data.type || '',
      ownerAddress: this.configService.get<string>('OWNER_ADDRESS') as string,
      wallet: data.wallet,
    };

    const game = await this.gameRepository.save(gameDto);
    if (!game?.id) {
      throw new Error('Не удалось сохранить игру');
    }

    await this.gamePlayersRepository.save({
      gameId: game.id,
      wallet: data.wallet,
      userId: user.id,
    });

    try {
      await this.updatePlayerNumberSet(game.id);
    } catch (error) {
      console.error('Ошибка при обновлении playerNumberSet:', error);
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
      const gameData = await this.getGameDataById(gameId.toString());
      if (existingPlayer) throw new Error('This user is already participating in the game');
      if (gameData.activePlayersCount >= gameData.playersNumber) {
        throw new Error('No available spots in this game');
      }
      await this.gamePlayersRepository.save({ gameId, wallet, userId: user.id });
    } else if (action === 'remove') {
      if (!existingPlayer) throw new Error('Player not found in this game');
      await this.gamePlayersRepository.delete({ gameId, wallet });
    }

    await this.updatePlayerNumberSet(gameId);
    return { wallet };
  }

  async getGameData(gameId: number): Promise<IGameData> {
    const gameDataById: any = (await this.getGameDataById(gameId.toString()));

    const gameData: IGameData = {
      gameInfo: {
        id: gameDataById.id,
        type: gameDataById.type,
        bet: gameDataById.bet,
        activePlayersCount: gameDataById.activePlayersCount,
        playersNumber: gameDataById.playersNumber,
        createdAt: gameDataById.createdAt,
        finishedAt: gameDataById.finishedAt,
        updatedAt: gameDataById.finishedAt,
        status: !gameDataById.contractAddress ? 'notStarted' : 'notPaid',
      },
      players: gameDataById.players.map((player: GamePlayerDto) => ({
        wallet: player.wallet,
        bet: false,
        ready: false
      }))
    };
    if (gameDataById.contractAddress) {
      const playerData = await this.blockchainService.getPlayerData(gameDataById.contractAddress)
    }

    return gameData;
  }


  async updatePlayerNumberSet(gameId: number) {
    const playersCount = await this.gamePlayersRepository.count({
      where: { gameId },
    });

    const game = await this.gameDataRepository.findOne({
      where: { gameId: gameId },
    });
    if (!game) {
      throw new Error('Game not found');
    }

    await this.gameDataRepository.update(
        { gameId },
        { playerNumberSet: playersCount },
    );

    const [gameData] = await Promise.all([
      this.gameDataRepository.findOne({ where: { gameId } }),
      this.gamePlayersRepository.find({ where: { gameId } }),
    ]);
    if (
        gameData &&
        playersCount === game.playersNumber &&
        gameData.playerNumberSet === playersCount
    ) {
    }
  }

  async getGamesByTypeWithPlayerFlag(type: string, playerWallet: string) {
    return await this.gameRepository
        .createQueryBuilder('game')
        .leftJoinAndSelect('game.gameData', 'gameData')
        .leftJoinAndSelect(
            'game.gamePlayers',
            'gamePlayer',
            'gamePlayer.wallet = :wallet',
            { wallet: playerWallet },
        )
        .where('game.type = :type', { type })
        .select([
          'game.id',
          'game.type',
          'game.contractAddress',
          'game.ownerAddress',
          'game.finishedAt',
          'game.createdAt',
          'game.updatedAt',
          'gameData.bet',
          'gameData.playersNumber',
          'gameData.playerNumberSet',
          'CASE WHEN gamePlayer.id IS NOT NULL THEN true ELSE false END as isPlayerJoined',
        ])
        .getRawMany();
  }

  async getGameDataById(gameId: string): Promise<GameDataDto> {
    const game = await this.gameRepository.findOne({
      where: { id: Number(gameId) },
      relations: ['gameData', 'gamePlayers', 'gamePlayers.user', 'gamePlayers.game'],
    });
    if (!game) throw new Error('Game not found');

    return {
      id: game.id,
      type: game.type,
      finishedAt: game.finishedAt,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
      bet: game.gameData.bet,
      playersNumber: game.gameData.playersNumber,
      activePlayersCount: game.gameData.playerNumberSet,
      contractAddress: game.contractAddress,
      players: game.gamePlayers
    };
  }

  async areAllPlayersJoined(gameId: number): Promise<boolean> {

    const game = await this.getGameDataById(
        gameId.toString(),
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

  async getGamePlayersWallets(gameId: number): Promise<string[]> {
    const players = await this.gamePlayersRepository.find({
      where: { gameId },
      relations: ['user'],
    });

    return players
        .map(player => player.user?.wallet) // получаем wallet или undefined
        .filter((wallet): wallet is string => wallet !== null && wallet !== undefined);
  }

  getGameTypes() {
    return this.gameTypesRepository.find();
  }

  async getGamePlayers(
      gameId: number,
  ): Promise<(GamePlayers & { user?: Users })[]> {
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

    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    if (!game.type) {
      throw new Error(`Game type not set for game ${gameId}`);
    }

    const gameTypeWithAddress = await this.gameTypesRepository.findOne({
      where: { name: game.type },
      select: ['logicAddress']
    });

    if (!gameTypeWithAddress) {
      throw new Error(`Game type ${game.type} not found`);
    }

    if (!gameTypeWithAddress) {
      throw new Error(`Logic address not set for game type ${game.type}`);
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
}
