import {inject, Injectable} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {environment} from '../../environments/environment';
import {setGameData, setTimer} from '../+state/game-data/game-data.actions';
import {Store} from '@ngrx/store';
import {ResultsContainerComponent} from '../containers/results-container/results-container.component';
import {MatDialog} from '@angular/material/dialog';
import {resetActiveGameElements, setRpsRoundsData} from '../+state/rps-game/rps-game.actions';
import {setDiceRoundsData} from '../+state/dice-game/dice-game.actions';
import {ErrorHandlerService} from './error-handler.service';
import {ErrorType} from '../models/error.model';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket: Socket | null = null;
  private gameId?: number;
  private wallet?: string;

  private store = inject(Store);
  private dialog = inject(MatDialog);
  private errorHandlerService = inject(ErrorHandlerService);

  socketExists(): boolean {
    return !!this.socket && this.socket.connected;
  }

  private connect() {
    this.socket = io(environment.hostUrl, {
      query: { wallet: this.wallet }
    });

    // Обработка ошибок подключения WebSocket
    this.socket.on('connect_error', (error) => {
      this.errorHandlerService.addError({
        message: 'Ошибка подключения к серверу игры',
        type: ErrorType.NETWORK,
        details: {
          error: error.message,
          type: 'WebSocket Connect Error',
          gameId: this.gameId
        }
      });
    });

    this.socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        this.errorHandlerService.addError({
          message: 'Сервер игры отключил соединение',
          type: ErrorType.NETWORK,
          details: {
            reason,
            type: 'WebSocket Disconnect',
            gameId: this.gameId
          }
        });
      }
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
          if (data.gameData.gameInfo.type === 'rock-paper-scissors') {
            this.store.dispatch(setRpsRoundsData({ data }));
          } else if (data.gameData.gameInfo.type === 'dice') {
            this.store.dispatch(setDiceRoundsData({ data }));
          }
          if (data.sendNote === 'new_round') {
            this.store.dispatch(resetActiveGameElements());
          } else if (data.sendNote === 'finish_game_data') {
            this.store.dispatch(setGameData({ data }));
            this.store.dispatch(setTimer({ gameId: data.gameData.gameInfo.gameId, second: 0, title: '' }));
            this.openFinishedModal();
          }
        });
        this.socket!.on('playing_time', (data) => {
          this.store.dispatch(setTimer({ gameId: data.gameId, second: data.remainingSeconds, title: 'Time left until the end of the game' }));
        });
        this.socket!.on('betting_time', (data) => {
          this.store.dispatch(setTimer({ gameId: data.gameId, second: data.remainingSeconds, title: 'Time left until the end of the betting' }));
        });
        this.socket!.emit('connect_game', { gameId: this.gameId, wallet });
      });

    } else {
      this.socket!.emit('connect_game', { gameId: this.gameId });
    }
  }

  openFinishedModal(): void {
    this.dialog.open(ResultsContainerComponent, {
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

  makeAction(data: string, wallet: string, round: number) {
    if (this.socket) {
      this.socket.emit('make_action', {
        gameId: this.gameId,
        data,
        wallet,
        round
      });
    }
  }

  makeActionWithoutData( wallet: string, round: number) {
    if (this.socket) {
      this.socket.emit('make_action', {
        gameId: this.gameId,
        wallet,
        round
      });
    }
  }

  onJoinGameSuccess(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('join_game_success', callback);
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
}

