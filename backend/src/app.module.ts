import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameController } from './game/game.controller';
import { BlockchainService } from './services/blockchain.service';
import { GameService } from './services/deploy';

@Module({
  imports: [],
  controllers: [AppController, GameController],
  providers: [AppService, BlockchainService, GameService],
})
export class AppModule {}
