import { Injectable } from '@nestjs/common';
import { GameDto } from '../dto/game.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from '../entities/entities/Games';
import { Repository } from 'typeorm';
import { GamePlayers } from '../entities/entities/GamePlayers';
import { Users } from '../entities/entities/Users';
import { GameData } from '../entities/entities/GameData';

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
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(GameData)
    private gameDataRepository: Repository<GameData>,
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
    return this.gameRepository.findOne({ where: { id } });
  }

  async addWalletToGame(
    gameId: number,
    wallet: string,
  ): Promise<{ player: GamePlayers; gameData: GameData | null }> {
    const user = await this.usersRepository.findOne({
      where: { wallet },
    });

    if (!user) {
      throw new Error('User not found for the provided wallet');
    }

    const game = await this.gameRepository.findOne({
      where: { id: gameId },
    });
    if (!game) {
      throw new Error('Game not found');
    }

    const gameData = await this.gameDataRepository.findOne({
      where: { gameId },
    });
    if (!gameData) {
      throw new Error('Game data not found');
    }

    const existingPlayer = await this.gamePlayersRepository.findOne({
      where: {
        gameId,
        userId: user.id,
      },
    });

    if (existingPlayer) {
      throw new Error('This user is already participating in the game');
    }

    if (gameData.playerNumberSet >= gameData.playersNumber) {
      throw new Error('No available spots in this game');
    }

    const newPlayer = await this.gamePlayersRepository.save({
      gameId,
      wallet,
      userId: user.id,
    });

    await this.updatePlayerNumberSet(gameId);
    const updatedGameData = await this.gameDataRepository.findOne({
      where: { gameId },
    });

    return {
      player: newPlayer,
      gameData: updatedGameData,
    };
  }

  async leaveGame(params: { gameId: number; wallet: string }) {
    const gameData = await this.gameDataRepository.findOne({
      where: { gameId: params.gameId },
    });

    if (!gameData) {
      return {
        success: false,
        message: 'Game not found',
      };
    }

    await this.gamePlayersRepository.delete({
      gameId: params.gameId,
      wallet: params.wallet,
    });

    await this.updatePlayerNumberSet(params.gameId);

    return {
      success: true,
      message: 'Successfully left the game',
    };
  }

  async updatePlayerNumberSet(gameId: number): Promise<void> {
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

    const [gameData, gamePlayers] = await Promise.all([
      this.gameDataRepository.findOne({ where: { gameId } }),
      this.gamePlayersRepository.find({ where: { gameId } }),
    ]);

    // Проверяем два условия:
    // 1. Текущее количество игроков соответствует требуемому (playersNumber)
    // 2. Значение playerNumberSet было успешно обновлено
    if (
      gameData &&
      playersCount === game.playersNumber &&
      gameData.playerNumberSet === playersCount
    ) {
      // console.log('Комната готова для деплоя контракта!');
      // console.log('Данные для деплоя:');
      // console.log('Game:', game);
      // console.log('GameData:', gameData);
      // console.log('GamePlayers:', gamePlayers);
      // Здесь будет вызов метода для деплоя контракта на blockchain
      // await this.blockchainService.deployContract(game, gameData, gamePlayers);
    }
  }

  // games.service.ts

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
      .andWhere('game.contractAddress IS NULL')
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

  async getGameByIdWithPlayerFlag(gameId: string, playerWallet: string) {
    return await this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.gameData', 'gameData')
      .leftJoinAndSelect(
        'game.gamePlayers',
        'gamePlayer',
        'gamePlayer.wallet = :wallet',
        { wallet: playerWallet },
      )
      .where('game.id = :gameId', { gameId })
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
      .getRawOne();
  }

  async areAllPlayersJoined(gameId: number): Promise<boolean> {
    const fakeWallet = '';

    const game = await this.getGameByIdWithPlayerFlag(
      gameId.toString(),
      fakeWallet,
    );

    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    const playersNumber = Number(game.gameData_players_number);
    const playerNumberSet = Number(game.gameData_player_number_set);

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

  async getGamePlayers(
    gameId: number,
  ): Promise<(GamePlayers & { user?: Users })[]> {
    return this.gamePlayersRepository.find({
      where: { gameId },
      relations: ['user'],
    });
  }
  //
  // async getGameData(gameId: number): Promise<GameData> {
  //   return this.gameDataRepository.findOne({
  //     where: { gameId },
  //   });
  // }
}
