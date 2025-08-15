import {inject, Injectable} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {environment} from '../../environments/environment';
import {disconnectGame, setGameData} from '../+state/game-data/game-data.actions';
import {Store} from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket: Socket | null = null;
  private gameId?: number;
  private wallet?: string;

  private store = inject(Store);

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

      this.socket!.off('connect');
      this.socket!.off('player_connected');
      this.socket!.off('player_join');
      this.socket!.off('player_left');

      this.socket!.on('connect', () => {
        console.log('Socket connected:', this.socket!.id);

        this.socket!.on('player_connected', ({ gameId, wallet }) => {
          console.log(`Player ${wallet} connected game ${gameId}`);
        });

        this.socket!.emit('connect_game', { gameId: this.gameId, wallet });

        this.socket!.on('player_join', (data) => {
          this.store.dispatch(setGameData({ data }));
        });

        this.socket!.on('player_left', (data) => {
          this.store.dispatch(setGameData({ data }));
        });
      });

    } else {
      this.socket!.emit('connect_game', { gameId: this.gameId });
    }
  }

  joinGame(wallet: string, gameId: number) {
    this.gameId = gameId;
    this.wallet = wallet;

    if (this.socket) {
      this.socket.emit('join_game', {
        wallet: this.wallet,
        gameId: this.gameId,
      });
    }
  }

  onJoinGameSuccess(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('join_game_success', callback);
      if (this.socket.on('join_game', callback)) {
        console.log('join_game', callback)
      }
    }
  }

  onPlayerJoin(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('game_data_response', callback);
    }
  }

  onError(callback: (error: any) => void) {
    if (this.socket) {
      this.socket.on('error', callback);
    }
  }

  leaveGame(wallet: string, gameId: number) {
    this.gameId = gameId;
    this.wallet = wallet;

    if (this.socket) {
      this.socket.emit('leave_game', {
        wallet: this.wallet,
        gameId: this.gameId,
      });
    }
  }

  onLeaveGameSuccess(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('leave_game_success', callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.emit('disconnect_game', { gameId: this.gameId, wallet: this.wallet }, () => {
        this.socket?.disconnect();
      });
    }
  }

  disconnectGame() {
    if (this.socket) {
      this.socket.emit('leave_game', { gameId: this.gameId, wallet: this.wallet }, () => {
        this.socket?.disconnect();
      });
      this.socket.emit('disconnect_game', { gameId: this.gameId, wallet: this.wallet }, () => {
        this.socket?.disconnect();
      });
    }
  }
}

