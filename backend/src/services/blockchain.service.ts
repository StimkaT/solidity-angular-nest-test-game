import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from '../entities/entities/Users';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import {Games} from '../entities/entities/Games';
import {RegistrationDto} from '../registration/dto/registration.dto';
import {GameDto} from '../game/dto/game.dto';
import {ConfigService} from '@nestjs/config';
// import { ethers } from 'ethers';
// import * as contractJson from '../../build/Game.sol/Game.json';
// // import * as contractArrayJson from '../../build/ArrayGame/ArrayGame.json';
// import * as contractArrayJson from '../../build/GameData.sol/ArrayGame.json';
// import { JsonRpcProvider, Wallet } from 'ethers';

@Injectable()
export class BlockchainService {

  constructor(
    private configService: ConfigService,
    @InjectRepository(Games)
    private gameRepository: Repository<Games>,
  ) {}

  // createGame(data): Promise<Games> {
  createGame(data): any {
    const type = 'Rock-Paper-Scissors';
    const ownerAddress = this.configService.get<string>('OWNER_ADDRESS') as string;

    const gameDto: GameDto = {
      type,
      ownerAddress
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
}
