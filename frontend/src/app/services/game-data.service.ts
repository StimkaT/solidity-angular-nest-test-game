import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

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
  getGameList(type: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/getGameList`, {type} );
  }
  createGame(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createGame`, data );
  }
  joinGame(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/joinGame`, data );
  }
  leaveGame(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/leaveGame`, data );
  }

}
