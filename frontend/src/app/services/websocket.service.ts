import {inject, Injectable} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {environment} from '../../environments/environment';
import {setGameData} from '../+state/game-data/game-data.actions';
import {Store} from '@ngrx/store';
import {ResultsContainerComponent} from '../containers/results-container/results-container.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket: Socket | null = null;
  private gameId?: number;
  private wallet?: string;

  private store = inject(Store);
  private dialog = inject(MatDialog);

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
      this.socket!.off('game_data');

      this.socket!.on('connect', () => {
        this.socket!.on('game_data', (data) => {
          this.store.dispatch(setGameData({ data }));
        });
        this.socket!.on('finish_game_data', (data) => {
          this.store.dispatch(setGameData({ data }));
          this.openLoginModal();
        });
        this.socket!.emit('connect_game', { gameId: this.gameId, wallet });
      });

    } else {
      this.socket!.emit('connect_game', { gameId: this.gameId });
    }
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(ResultsContainerComponent, {
      width: '30%',
      height: '30%',
      hasBackdrop: true,
    });
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
      this.socket.on('game_data', callback);
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

  sendMoney(wallet: string, gameId: number) {
    if (this.socket) {
      this.socket.emit('send_money', { wallet, gameId });
    }
  }

  winGame(wallet: string, gameId: number) {
    if (this.socket) {
      this.socket.emit('win_game', { wallet, gameId });
    }
  }

  loseGame(wallet: string, gameId: number) {
    if (this.socket) {
      this.socket.emit('lose_game', { wallet, gameId });
    }
  }
}

