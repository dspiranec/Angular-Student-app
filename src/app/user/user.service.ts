import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Authority } from './authority.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;

  private usersUrl = `http://localhost:8080/api/user`;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/current-user`);
  }

  isRoleAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.authorities.some((authority: string) => authority === Authority.ADMIN);
    } else {
      return false;
    }
  }
}
