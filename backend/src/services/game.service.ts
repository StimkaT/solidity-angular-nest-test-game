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

  async createGame(data: ICreateGameData): Promise<any> {
    const type = data.type || '';
    const ownerAddress = this.configService.get<string>(
      'OWNER_ADDRESS',
    ) as string;

    const gameDto: GameDto = {
      type,
      ownerAddress,
      wallet: data.wallet,
    };

    const user = await this.usersRepository.findOne({
      where: { wallet: data.wallet },
    });

    if (!user) {
      throw new Error('User not found for the provided wallet');
    }

    const game = await this.gameRepository.save(gameDto);

    await this.gamePlayersRepository.save({
      gameId: game.id,
      wallet: data.wallet,
      userId: user.id,
    });

    return game;
  }

  async getGamesByType(type: string) {
    return this.gameRepository.find({ where: { type } });
  }

  async getGameById(id: number) {
    return this.gameRepository.findOne({ where: { id } });
  }

  async addWalletToGame(
    gameId: number,
    wallet: string,
  ): Promise<{ player: GamePlayers; gameData: GameData }> {
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

    if (gameData.playerNumberSet >= gameData.playersNumber) {
      throw new Error('No available spots in this game');
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

    const newPlayer = await this.gamePlayersRepository.save({
      gameId,
      wallet,
      userId: user.id,
    });

    gameData.playerNumberSet += 1;
    const updatedGameData = await this.gameDataRepository.save(gameData);

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

    return {
      success: true,
      message: 'Successfully left the game',
    };
  }
}
