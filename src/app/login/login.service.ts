import { Injectable } from '@angular/core';
import { UserCredentials } from './user-credentials.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtToken } from './jwt-token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  authenticate(userCredentials: UserCredentials): Observable<JwtToken> {
    return this.http.post<JwtToken>(`http://localhost:8080/api/authenticate`, userCredentials);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
