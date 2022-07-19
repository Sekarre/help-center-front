import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserCredentials} from '../domain/UserCredentials';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  authUrl = 'http://localhost:8080/api/v1/auth/login';

  constructor(private http: HttpClient) {
  }

  login(login: string, password: string): Observable<any> {

    const userCredentials = new UserCredentials();
    userCredentials.username = login;
    userCredentials.password = password;

    return this.http.post<TokenResponse>(`${this.authUrl}`, userCredentials);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('key');
  }

  getToken(): string {
    return sessionStorage.getItem('token')!;
  }

  getAuthHeaders(): any {
    return {
      'Authorization' : 'Bearer ' + this.getToken()
    };
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}

interface TokenResponse {
  token: string
}

