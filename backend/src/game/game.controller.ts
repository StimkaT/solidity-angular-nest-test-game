import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { GameDataService } from '../services/game-data.service';
import { ICreateGameData } from "../types/gameData";

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
        console.error('Игра не была создана, отсутствует ID');
      }

      const gameDataParams = {
        gameId: game.id,
        bet: data.bet,
        bots: data.bots,
        playersNumber: +data.playersNumber + +data.bots,
      };

      const gameDataResult = await this.gameDataService.createGameData(gameDataParams);

      if (!gameDataResult?.success) {
        console.error('Не удалось создать GameData');
      } else {
        if (data.bots > 0) {
          const botsList = await this.gameService.getBotsAccounts();
          for (let i = 0; i < data.bots; i++) {
            const wallet = botsList[i]?.wallet;
            if (wallet) {
              await this.gameService.addWalletToGame(game.id, wallet);
            }
          }
        }
        await this.gameService.addWalletToGame(game.id, data.wallet);
        await this.gameService.checkEverythingIsReady(data.bet.toString(), game.id);

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

  @Get('getGameTypes')
  async getGameTypes() {
    try {
      const gameTypes = await this.gameService.getGameTypes();
      return { success: true, gameTypes };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
