import {Injectable} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket: Socket | null = null;
  private gameId?: number;
  private wallet?: string;

  socketExists(): boolean {
    return !!this.socket && this.socket.connected;
  }

  private connect() {
    this.socket = io(environment.hostUrl, {
      query: { wallet: this.wallet }
    });
  }

  initGameConnection(gameId: number, wallet: string) {
    this.gameId = gameId;
    this.wallet = wallet;

    if (!this.socketExists()) {
      this.connect();

      this.socket!.on('connect', () => {
        console.log('Socket connected:', this.socket!.id);

        this.socket!.on('player_joined', ({ gameId, wallet }) => {
          console.log(`Player ${wallet} joined game ${gameId}`);
        });
       //
       // const pay = {
       //   gameId: this.gameId, wallet: this.wallet
       //  }
       //  this.gameDataService.getDataGame(pay);

        this.socket!.emit('join_game', { gameId: this.gameId });
      });

    } else {
      this.socket!.emit('join_game', { gameId: this.gameId });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.emit('leave_game', { gameId: this.gameId })
      this.socket?.on('player_left', ({ gameId, wallet }) => {
        console.log(`Player ${wallet} left game ${gameId}`);
      });
      this.socket.disconnect();
    }
  }
}

