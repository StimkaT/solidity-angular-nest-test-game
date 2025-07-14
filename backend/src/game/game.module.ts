import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GameController } from './game.controller';
import { BlockchainService } from '../services/blockchain.service';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Games,
      GameData,
      GameTypes,
      GamePlayers,
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
    PassportModule,
  ],
  controllers: [GameController],
  providers: [
    JwtStrategy,
    BlockchainService,
    GameDataService,
    GameService,
    GameDeployService,
    GameGateway
  ],
  exports: [JwtModule, PassportModule],
})
export class GameModule {}
