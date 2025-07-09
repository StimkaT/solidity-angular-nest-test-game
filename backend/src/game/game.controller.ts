import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { GameDataService } from '../services/game-data.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly gameDataService: GameDataService,
  ) {}

  @Post('createGame')
  async createGame(@Body() data: any) {
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
}
