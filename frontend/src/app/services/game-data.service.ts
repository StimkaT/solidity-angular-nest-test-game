import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameDataService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/game';

  getGameList(data: {type: string, player: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/getGameList`, {type: data.type, player: data.player} );
  }
  createGame(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createGame`, data );
  }
  getGameTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getGameTypes`);
  }

}
