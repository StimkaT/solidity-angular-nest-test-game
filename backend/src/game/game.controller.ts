import { Body, Controller, Post } from '@nestjs/common';
import { GameService, ICreateGameData } from '../services/game.service';
import { GameDataService } from '../services/game-data.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly gameDataService: GameDataService,
  ) {}

  @Post('createGame')
  async createGame(@Body() data: ICreateGameData) {
    try {
      const game = await this.gameService.createGame(data);
      if (!game?.id) {
        throw new Error('Игра не была создана, отсутствует ID');
      }

      const gameDataParams = {
        gameId: game.id,
        bet: data.bet,
        playersNumber: data.playersNumber,
      };

      const gameDataResult =
        await this.gameDataService.createGameData(gameDataParams);

      if (!gameDataResult?.success) {
        throw new Error('Не удалось создать GameData');
      }

      return {
        success: true,
        game,
        gameData: gameDataResult.gameData,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('getGameList')
  async getGameList(@Body() data: { type: string; player: string }) {
    try {
      const games = await this.gameService.getGamesByTypeWithPlayerFlag(
        data.type,
        data.player,
      );

      return {
        success: true,
        games,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('getDataGame')
  async getDataGame(@Body() data: { gameId: string; player: string }) {
    try {
      const games = await this.gameService.getGameByIdWithPlayerFlag(
        data.gameId,
        data.player,
      );

      return {
        success: true,
        games,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('joinGame')
  async joinGame(@Body() data: { game: number; wallet: string }) {
    try {
      const game = await this.gameService.getGameById(data.game);
      if (!game) {
        return { success: false, message: 'Game not found' };
      }
      const player = await this.gameService.addWalletToGame(
        data.game,
        data.wallet,
      );
      return { success: true, player };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('leaveGame')
  async leaveGame(@Body() data: { gameId: number; wallet: string }) {
    try {
      const game = await this.gameService.leaveGame(data);
      return { success: true, game };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
