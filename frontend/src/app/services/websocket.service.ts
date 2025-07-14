import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket: Socket = {} as Socket;

  constructor() {
    this.connect();
    console.log(this.socket);
  }

  connect() {
    if (!this.socketExists()) {
      this.socket = io(environment.hostUrl);
    }
  }

  socketExists(): boolean {
    return !!(!!this.socket && this.socket.connected);
  }

  joinGame(gameId: number, username: string) {
    this.socket.emit('joinGame', { gameId, username });
  }

  // joinGame(gameId: number, username: string) {
  //   this.socket.emit('joinGame', { gameId, username });
  // }
  //
  // playerReady(gameId: number, username: string) {
  //   this.socket.emit('playerReady', { gameId, username });
  // }
  //
  // onPlayerJoined(): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on('playerJoined', data => observer.next(data));
  //   });
  // }
  //
  // onPlayerReadyStatus(): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on('playerReadyStatus', data => observer.next(data));
  //   });
  // }
  //
  onGameStarted(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('gameStarted', (data) => observer.next(data));
    });
  }
}
