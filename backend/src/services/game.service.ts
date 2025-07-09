import { Injectable } from '@nestjs/common';
import { GameDto } from '../dto/game.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from '../entities/entities/Games';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Games)
    private gameRepository: Repository<Games>,
  ) {}

  createGame(data): any {
    const type = data.type || '';

    const ownerAddress = this.configService.get<string>('OWNER_ADDRESS',) as string;

    const gameDto: GameDto = {
      type,
      ownerAddress,
    };
    console.log('game data:', gameDto);
    return this.gameRepository.save(gameDto);

    // try {
    //   const tx = await this.contract.addGame(game.id);
    //   await tx.wait(); // Ожидание подтверждения транзакции
    //   console.log(`Game with ID ${game.id} added successfully.`);
    // } catch (error) {
    //   console.error('Failed to add game:', error);
    //   throw new Error(`Failed to add game: ${error.message}`);
    // }
  }

  async getGamesByType(type: string) {
    console.log('22222222222', this.gameRepository.find({ where: { type } }));
    return this.gameRepository.find({ where: { type } });
  }
}
