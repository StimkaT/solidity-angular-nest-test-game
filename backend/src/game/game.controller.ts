import { Body, Controller, Post } from '@nestjs/common';
import { BlockchainService } from '../services/blockchain.service';

@Controller('game')
export class GameController {
  constructor(private blockchainService: BlockchainService) {}
  @Post('createGame')
  createGame(@Body() data: any) {
    return this.blockchainService.createGame(data);
  }
}
