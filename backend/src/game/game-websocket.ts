import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/services/game.service';
import {GameDeployNewService} from "../services/deploy-new";

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
      private readonly gameService: GameService,
      private readonly gameDeployNewService: GameDeployNewService
  ) {}

  private connectedWallets = new Map<string, Socket>();

  afterInit() {
    console.log('WebSocket сервер инициализирован');
  }

  handleConnection(client: Socket) {
    const wallet = client.handshake.query.wallet as string;
    if (this.connectedWallets.has(wallet)) {
      const oldSocket = this.connectedWallets.get(wallet);
      oldSocket?.disconnect(true);
    }
    this.connectedWallets.set(wallet, client);
  }

  handleDisconnect(client: Socket) {
    const wallet = client.handshake.query.wallet as string;
    const gameId = client.handshake.query.gameId as string;
    if (wallet && this.connectedWallets.get(wallet) === client) {
      this.connectedWallets.delete(wallet);
    }

    this.server.emit('player_disconnected', { wallet });
  }

  @SubscribeMessage('connect_game')
  async handleConnectGame(client: Socket, payload: { gameId: number, wallet: string }) {
    const roomName = `game_${payload.gameId}`;
    client.join(roomName);

    const response = await this.gameService.buildGameResponse(payload.gameId, payload.wallet);
    client.to(roomName).emit('game_data', response);

    client.to(roomName).emit('player_connected', {
      gameId: payload.gameId,
      wallet: client.handshake.query.wallet,
    });
    client.emit('connected_game', { response });
    client.emit('game_data_response', response);

  }

  @SubscribeMessage('join_game')
  async handleJoinGame(client: Socket, payload: { wallet: string; gameId: number }) {
    try {
      await this.gameService.addWalletToGame(payload.gameId, payload.wallet);
      const roomName = `game_${payload.gameId}`;
      client.join(roomName);

      const response = await this.gameService.buildGameResponse(payload.gameId, payload.wallet);
      client.to(roomName).emit('player_join', response);
      client.emit('join_game_success', response);

      // Проверяем готовность к деплою (добавлено из старой реализации)
      const allReady = await this.gameService.areAllPlayersJoined(payload.gameId);

      if (allReady) {
        const gamePlayers = await this.gameService.getGamePlayers(payload.gameId);

        const players = gamePlayers.map(player => ({
          name: player.user?.login || 'Player',
          wallet: player.wallet,
          bet: '1',
          isPaid: false,
          isPaidOut: false,
          result: 0,
        }));

        // Деплоим контракты
        const result = await this.gameDeployNewService.deployGameWithLogic(
            players,
            5 * 60,    // time1 (регистрация)
            30 * 60,   // time2 (игра)
            payload.gameId
        );

        this.server.to(roomName).emit('game_ready', {
          logicAddress: result.logicAddress,
          storageAddress: result.storageAddress,
          gameId: payload.gameId
        });
      }

    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('leave_game')
  async handleLeaveGame(client: Socket, payload: { gameId: number }) {
    try {
      const wallet = client.handshake.query.wallet as string;
      await this.gameService.leaveGame({ gameId: payload.gameId, wallet });

      const roomName = `game_${payload.gameId}`;
      const response = await this.gameService.buildGameResponse(payload.gameId, wallet);

      client.to(roomName).emit('player_left', response);
      client.emit('leave_game_success', response);
    } catch (error) {
      client.emit('leave_game_error', { message: error.message });
    }
  }

  @SubscribeMessage('disconnect_game')
  async handleDisconnectGame(client: Socket, payload: { gameId: number }) {
    try {
      const roomName = `game_${payload.gameId}`;

      client.leave(roomName);
    } catch (error) {
      client.emit('disconnect_game_error', { message: error.message });
    }
  }
}
