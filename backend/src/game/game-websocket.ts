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
    console.log('Клиент12313', {data});

    if (allReady) {
      const gamePlayers = await this.gameService.getGamePlayers(+data.gameId);
      // const gameData = await this.gameService.getGameData(+data.gameId);

      const players = gamePlayers.map(player => ({
        name: player.user?.login || 'Player',
        wallet: player.wallet,
        bet: '1',
        isPaid: false,
        isPaidOut: false,
        result: 0,
      }));
      const time1 = 5 * 60;
      const time2 = 30 * 60;

      const result = await this.gameDeployNewService.deployGameWithLogic(
        players,
        time1,
        time2,
        +data.gameId,
      );
      console.log('Контракты задеплоены:', result);

      this.server.to(data.gameId).emit('gameReady', {
        message: 'Все игроки на месте!',
        logicAddress: result.logicAddress,
        storageAddress: result.storageAddress,
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
