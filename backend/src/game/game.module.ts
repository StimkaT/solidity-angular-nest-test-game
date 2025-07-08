import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GameController } from './game.controller';
import { BlockchainService } from '../services/blockchain.service';
import { GameService } from '../services/deploy';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Games} from '../entities/entities/Games';

@Module({
  imports: [
    TypeOrmModule.forFeature([Games]),
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
  providers: [JwtStrategy, BlockchainService, GameService],
  exports: [JwtModule, PassportModule],
})
export class GameModule {}
