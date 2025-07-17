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
import { GameDeployNewService } from '../services/deploy-new';

@WebSocketGateway({ cors: true })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly gameDeployNewService: GameDeployNewService,
  ) {}

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
      // Жёстко прописанные тестовые адреса Hardhat
      const players = [
        {
          name: "Alice",
          wallet: "0x75AFb5a18E0B7960f11529f284c18444C8a76A86", // TODO: передать адрес
          bet: "100000000000000000", // 0.1 ETH в wei
          isPaid: false,
          isPaidOut: false,
          result: 0
        },
        {
          name: "Bob",
          wallet: "0xEC8B785Bf287606E0B6DdE00A6B8d4849aC51c0f", // TODO: передать адрес
          bet: "100000000000000000", // 0.1 ETH в wei
          isPaid: false,
          isPaidOut: false,
          result: 0
        }
      ];
      const time1 = 5 * 60;
      const time2 = 30 * 60;

      const result = await this.gameDeployNewService.deployGameWithLogic(players, time1, time2);
      console.log('Контракты задеплоены:', result);

      this.server.to(data.gameId).emit('gameReady', {
        message: 'Все игроки на месте!',
        logicAddress: result.logicAddress,
        storageAddress: result.storageAddress
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
