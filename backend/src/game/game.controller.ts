import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BlockchainService } from '../services/blockchain.service';
import { GameService } from '../services/deploy';

@Controller('game')
export class GameController {
  constructor(
    private blockchainService: BlockchainService,
    private gameService: GameService,
  ) {}

  @Get('get')
  getData() {
    return this.blockchainService.getGame();
  }

  @Post('start')
  startGame(@Body() id: any) {
    return this.blockchainService.addGame(id);
  }

  // @Post('startArray')
  // startGameArray(@Body() id: any) {
  //   return this.blockchainService.addGameArray(id);
  // }

  @Get('getArray')
  getDataArray(@Query('data') data: string) {
    return this.blockchainService.getGameArray(data);
  }

  @Post('startArray')
  async startGameArray(@Body() data: any) {
    try {
      const address = await this.gameService.deployContract(data);
      return { success: true, contractAddress: address };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  }
}
