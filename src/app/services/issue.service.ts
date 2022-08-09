import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {Observable} from "rxjs";
import {IssueType} from "../domain/IssueType";
import {NewIssue} from "../domain/NewIssue";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private BASE_URL: string = environment.baseUrl + ApiPaths.Issues;

  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  getIssueTypes(): Observable<IssueType[]> {
    return this.httpClient.get<IssueType[]>(this.BASE_URL + "/types");
  }

  createNewIssue(newIssue: NewIssue): Observable<any> {
    return this.httpClient.post(this.BASE_URL, JSON.stringify(newIssue));
  }
}
