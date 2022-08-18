import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {User} from "../domain/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL: string = environment.baseUrl + ApiPaths.Users;

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  public getUsers(roleName: string): Observable<User[]> {
    let params = new HttpParams().set('roleName', roleName);
    return this.httpClient.get<User[]>(this.BASE_URL, {params: params});
  }

  public getUsersForIssue(roleName: string, issueId: number): Observable<User[]> {
    let params = new HttpParams().set('roleName', roleName).set("issueId", issueId);
    return this.httpClient.get<User[]>(this.BASE_URL + "/issue", {params: params});
  }
}
