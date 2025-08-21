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

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
      private readonly gameService: GameService,
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
    if (wallet && this.connectedWallets.get(wallet) === client) {
      this.connectedWallets.delete(wallet);
    }

    this.server.emit('player_disconnected', { wallet });
  }

  async sendGameData(gameId: number) {
    const roomName = `game_${gameId}`;

    const gameData = await this.gameService.getGameData(gameId);
    this.server.to(roomName).emit('game_data', gameData);
  }

  sendContractEvent(contractData: any) {
    // gameByAddress = this.gameService.getGameByAddress(contractData.storageAddress)
    //
    // await this.sendGameData(gameByAddress.gameId);

  }

  @SubscribeMessage('connect_game')
  async handleConnectGame(client: Socket, payload: { gameId: number, wallet: string }) {
    const roomName = `game_${payload.gameId}`;
    client.join(roomName);

    await this.sendGameData(payload.gameId);
  }

  @SubscribeMessage('join_game')
  async handleJoinGame(client: Socket, payload: { wallet: string; gameId: number }) {
    try {
      await this.gameService.addWalletToGame(payload.gameId, payload.wallet);
      const roomName = `game_${payload.gameId}`;
      client.join(roomName);

      const gameDataBeforeDeploy = await this.gameService.getGameData(payload.gameId);
      await this.sendGameData(payload.gameId);

      await this.gameService.checkEverythingIsReady(gameDataBeforeDeploy, payload.gameId);
      // this.sendContractEvent(contractData);

      await this.sendGameData(payload.gameId);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('send_money')
  async handleSendMoney(client: Socket, payload: { wallet: string; gameId: number }) {
    try {
      await this.gameService.sendMoney(payload.gameId, payload.wallet);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('leave_game')
  async handleLeaveGame(client: Socket, payload: { gameId: number }) {
    try {
      const wallet = client.handshake.query.wallet as string;
      await this.gameService.leaveGame({ gameId: payload.gameId, wallet });

      await this.sendGameData(payload.gameId);
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
