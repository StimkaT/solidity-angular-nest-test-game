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
      const gameData = await this.gameDataService.createGameData({
        ...data,
        gameId: game.id,
      });
      return {
        success: true,
        game,
        gameData,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('getGameList')
  async getGameList(@Body() data: { type: string }) {
    try {
      const games = await this.gameService.getGamesByType(data.type);
      console.log('games', games);
      const filteredGames = games.filter(game => game.contractAddress === null);
      const result = await Promise.all(filteredGames.map(async (game) => {
        const gameData = await this.gameDataService.getGameDataByGameId(game.id);
        return {
          ...game,
          gameData,
        };
      }));
      return {
        success: true,
        games: result,
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
      const player = await this.gameService.addWalletToGame(data.game, data.wallet);
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
