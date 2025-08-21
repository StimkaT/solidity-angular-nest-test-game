import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {Subject} from "rxjs";

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  public _websocketEvents: Subject<{event: string, payload: any}> = new Subject();

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

  send(event: string, data: any, gameId: number) {
    const roomName = `game_${gameId}`;
    if(roomName === '') {
      this.server.emit(event, data);
    } else {
      this.server.to(roomName).emit(event, data);
    }
  }

  @SubscribeMessage('connect_game')
  async handleConnectGame(client: Socket, payload: { gameId: number, wallet: string }) {
    const roomName = `game_${payload.gameId}`;
    client.join(roomName);

    this._websocketEvents.next({event: "connect_game", payload})
  }

  @SubscribeMessage('join_game')
  async handleJoinGame(client: Socket, payload: { wallet: string; gameId: number }) {
    const roomName = `game_${payload.gameId}`;
    client.join(roomName);
    try {
      this._websocketEvents.next({event: "join_game", payload})
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('send_money')
  async handleSendMoney(client: Socket, payload: { wallet: string; gameId: number }) {
    try {
      this._websocketEvents.next({event: "send_money", payload})
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('leave_game')
  async handleLeaveGame(client: Socket, payload: { gameId: number }) {
    try {
      const wallet = client.handshake.query.wallet as string;

      this._websocketEvents.next({
        event: "leave_game",
        payload: {
          gameId: payload.gameId,
          wallet: wallet
        }
      });
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
