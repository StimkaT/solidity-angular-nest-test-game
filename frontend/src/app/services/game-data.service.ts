import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, refCount} from 'rxjs';
import {IGameData} from '../+state/game-data/game-data.reducer';

@Injectable({ providedIn: 'root' })
export class GameDataService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/game';

  setGameData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/startArray`, data);
  }
  getGameData(data: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/getArray`, { params: { data } } );
  }
  createGame(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.apiUrl}/createGame`, data );
  }

}
