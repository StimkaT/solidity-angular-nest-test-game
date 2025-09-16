import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameData } from '../entities/entities/GameData';

@Injectable()
export class GameDataService {
  constructor(
    @InjectRepository(GameData)
    private readonly gameDataRepository: Repository<GameData>,
  ) {}

  async createGameData(params: {
    gameId: number;
    bet: number;
    playersNumber: number;
    bots: number;
    playerNumberSet?: number;
  }) {
    const newGameData = this.gameDataRepository.create({
      gameId: params.gameId,
      bet: params.bet,
      playersNumber: params.playersNumber,
      playerNumberSet: params.playerNumberSet ?? 1,
      bots: params.bots ?? 0
    });

    const savedData = await this.gameDataRepository.save(newGameData);

    return {
      success: true,
      gameData: {
        id: savedData.id,
        gameId: savedData.gameId,
        bet: savedData.bet,
        playersNumber: savedData.playersNumber,
        playerNumberSet: savedData.playerNumberSet,
      },
    };
  }
}
