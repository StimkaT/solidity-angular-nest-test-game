import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GameController } from './game.controller';
import { GameDeployService } from '../services/deploy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameDataService } from '../services/game-data.service';
import { GameService } from '../services/game.service';
import { GamePlayers } from '../entities/entities/GamePlayers';
import { Users } from '../entities/entities/Users';
import { Games } from '../entities/entities/Games';
import { GameData } from '../entities/entities/GameData';
import { GameTypes } from '../entities/entities/GameTypes';
import {GameGateway} from './game-websocket';
import {BlockchainService} from "../services/blockchain.service";
import {GameRockPaperScissors} from '../entities/entities/GameRockPaperScissors';
import {RockPaperScissorsService} from '../services/games/rock-paper-scissors.service';
import {GameCommonService} from '../services/game-common.service';
import {GameDice} from '../entities/entities/GameDice';
import {DiceService} from '../services/games/dice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Games,
      GameData,
      GameTypes,
      GamePlayers,
      GameRockPaperScissors,
      GameDice,
      Users,
    ]),
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
    }),
    PassportModule
  ],
  controllers: [GameController],
  providers: [
    JwtStrategy,
    GameDataService,
    GameService,
    GameDeployService,
    GameGateway,
    BlockchainService,
    RockPaperScissorsService,
    GameCommonService,
    DiceService
  ],
  exports: [JwtModule, PassportModule],
})
export class GameModule {}
