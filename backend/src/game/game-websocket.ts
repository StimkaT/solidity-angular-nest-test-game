import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

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

  @SubscribeMessage('join_game')
  handleJoinGame(client: Socket, payload: { gameId: number }) {
    const roomName = `game_${payload.gameId}`;
    client.join(roomName);

    client.to(roomName).emit('player_joined', {
      gameId: payload.gameId,
      wallet: client.handshake.query.wallet,
    });

    client.emit('joined_game', { gameId: payload.gameId });
  }

  @SubscribeMessage('leave_game')
  handleLeaveGame(client: Socket, payload: { gameId: number }) {
    const roomName = `game_${payload.gameId}`;

    client.to(roomName).emit('player_left', {
      gameId: payload.gameId,
      wallet: client.handshake.query.wallet,
    });

    client.emit('leave_game', { gameId: payload.gameId });

    client.leave(roomName);
  }
}
