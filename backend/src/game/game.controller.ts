import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlockchainService } from '../services/blockchain.service';

@Controller('game')
export class GameController {
  constructor(private blockchainService: BlockchainService) {}

  // @Get('start')
  // startGame(): string {
  //   return 'Игра начата!';
  // }
  @Get('get')
  getData() {
    return this.blockchainService.getGame();
  }

// @Post('start')
// startGame(@Body() data: any) {
//   return {
//     message: data,
//   };
// }

  @Post('start')
  startGame(@Body() id: any) {
    return this.blockchainService.addGame(id);
  }
}
