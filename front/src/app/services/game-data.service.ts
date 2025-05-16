import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameDataService {
  constructor(private http: HttpClient) {}

  setGameData(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/game/startArray', data );
  }
  getGameData(data: string): Observable<any> {
    return this.http.get('http://localhost:3000/game/getArray', { params: { data } });
  }

}
