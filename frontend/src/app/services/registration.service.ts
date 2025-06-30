import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/auth';

  addNewUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data );
  }

  checkAuth(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data );
  }
}
