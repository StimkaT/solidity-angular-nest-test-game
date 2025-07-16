import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../services/game.service';

@WebSocketGateway({ cors: true })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly gameService: GameService) {}

  afterInit(server: Server) {
    console.log('WebSocket сервер инициализирован');
  }

  handleConnection(client: Socket) {
    console.log(`Клиент подключился: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Клиент отключился: ${client.id}`);
  }

  // @SubscribeMessage('sendMessage') handleMessage(
  //   @MessageBody() data: { gameId: string; message: string },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   // отправляем сообщение в комнату с gameId
  //   this.server.to(data.gameId).emit('receiveMessage', {
  //     senderId: client.id,
  //     message: data.message,
  //   });
  // }

  @SubscribeMessage('joinGame')
  async joinGame(
    @MessageBody() data: { gameId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.gameId);
    console.log(`Клиент ${client.id} вошел в игру ${data.gameId}`);

    this.server.to(data.gameId).emit('playerJoined', {
      playerId: client.id,
    });

    const allReady = await this.gameService.areAllPlayersJoined(+data.gameId);
    console.log(`Клиент ${allReady}`);

    if (allReady) {
      this.server.to(data.gameId).emit('gameReady', {
        message: 'Все игроки на месте!',
      });
    }
  }

  // @SubscribeMessage('leaveGame') leaveGame(
  //   @MessageBody() data: { gameId: string },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   client.leave(data.gameId);
  //   console.log(`Клиент ${client.id} покинул игру ${data.gameId}`);
  //
  //   this.server.to(data.gameId).emit('playerLeft', {
  //     playerId: client.id,
  //   });
  // }
}
