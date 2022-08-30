import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserCredentials} from '../domain/UserCredentials';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import jwt_decode from 'jwt-decode';
import {RoleNames} from "../domain/RoleNames";

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
    localStorage.removeItem('token');
  }

  isUserAuthenticated(): boolean {
    return !!(this.getToken() && !this.isTokenExpired());
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getRoles(): string[] {
    const jwtDecode: any = jwt_decode(this.getToken());
    return jwtDecode.roles;
  }

  isSupportOrHigher(): boolean {
    const jwtDecode: any = jwt_decode(this.getToken());
    let roles: string[] = jwtDecode.roles;
    roles = roles.filter(v => {
      return v.includes(RoleNames.SUPPORT) || v.includes(RoleNames.ADMIN);
    });

    return !(roles.length == 0);
  }

  getUsername(): string {
    const jwtDecode: any = jwt_decode(this.getToken());
    return jwtDecode.userFullName;
  }

  isTokenExpired(): boolean {
    const jwtDecode: any = jwt_decode(this.getToken());
    let expiredDate = jwtDecode.exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiredDate;
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

