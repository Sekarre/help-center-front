import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserCredentials} from '../domain/UserCredentials';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthService {

  authUrl = environment.baseUrl + ApiPaths.Auth;

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
  }

  isUserAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return sessionStorage.getItem('token')!;
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getRoles(): string[] {
    const jwtDecode: any = jwt_decode(this.getToken());
    console.log(jwtDecode.roles);
    return jwtDecode.roles;
  }

  getAuthHeaders(): any {
    return {
      'Authorization' : 'Bearer ' + this.getToken()
    };
  }
}

interface TokenResponse {
  token: string
}

