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
import {BlockchainService} from "../services/blockchain.service";
import {IDataToPay} from "../types/dataToPay";

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
      private readonly gameService: GameService,
      private readonly gameDeployNewService: GameDeployNewService,
      private blockchainService: BlockchainService
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

    const gameData = await this.gameService.getGameData(payload.gameId);
    client.to(roomName).emit('game_data', gameData);
    client.emit('game_data_response', gameData);
  }

  @SubscribeMessage('join_game')
  async handleJoinGame(client: Socket, payload: { wallet: string; gameId: number }) {
    try {
      await this.gameService.addWalletToGame(payload.gameId, payload.wallet);
      const roomName = `game_${payload.gameId}`;
      client.join(roomName);

      const gameDataBeforeDeploy = await this.gameService.getGameData(payload.gameId);
      client.to(roomName).emit('data_update', gameDataBeforeDeploy);
      client.emit('data_update', gameDataBeforeDeploy);

      const allReady = await this.gameService.areAllPlayersJoined(payload.gameId);

      if (allReady) {
        const gamePlayers = await this.gameService.getGamePlayers(payload.gameId);
        const players = gamePlayers.map(player => ({
          name: player.user?.login || 'Player',
          wallet: player.wallet,
          bet: gameDataBeforeDeploy.gameInfo.bet.toString(),
          isPaid: false,
          isPaidOut: false,
          result: 0,
        }));

        const result = await this.gameDeployNewService.deployGameWithLogic(
            players,
            5 * 60,
            30 * 60,
            payload.gameId
        );

        const gameData = await this.gameService.getGameData(payload.gameId);
        client.to(roomName).emit('data_update', gameData);
        client.emit('data_update', gameData);
      }
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('send_money')
  async handleSendMoney(client: Socket, payload: { wallet: string; gameId: number }) {
    try {
      const game = await this.gameService.getGameById(payload.gameId);
      const userData = await this.gameService.getUserDataByWallet(payload.wallet);

      const dataToPay: IDataToPay = {
        wallet: payload.wallet,
        gameId: payload.gameId,
        contractAddress: game?.contractAddress || '',
        contractBet: game?.gameData.bet || 0,
        privateKey: userData?.encryptedPrivateKey || '',
      }

      await this.blockchainService.playerPayment(dataToPay);

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
      const gameData = await this.gameService.getGameData(payload.gameId);

      client.to(roomName).emit('data_update', gameData);
      client.emit('data_update', gameData);
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
