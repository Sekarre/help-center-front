import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {Observable} from "rxjs";
import {IssueType} from "../domain/IssueType";
import {Issue, IssueStatusChange} from "../domain/Issue";
import {GroupedIssue} from "../domain/GroupedIssue";
import {User} from "../domain/User";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private BASE_URL: string = environment.baseUrl + ApiPaths.Issues;

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  getIssueTypes(): Observable<IssueType[]> {
    return this.httpClient.get<IssueType[]>(this.BASE_URL + "/types");
  }

  getIssueStatusTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.BASE_URL + "/issue-statuses");
  }

  getAllIssuesWithStatus(status: string): Observable<Issue[]> {
    let params = new HttpParams().set('status', status);
    return this.httpClient.get<Issue[]>(this.BASE_URL, {params: params})
  }

  getAllIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.BASE_URL)
  }

  getAllIssuesGrouped(): Observable<GroupedIssue> {
    return this.httpClient.get<GroupedIssue>(this.BASE_URL + "/grouped")
  }

  getSingleIssue(id: number): Observable<Issue> {
    return this.httpClient.get<Issue>(this.BASE_URL + "/" + id);
  }

  changeIssueStatus(issueId: number, issueStatusChange: IssueStatusChange): Observable<any> {
    const headers = {'content-type': 'application/json'}
    console.log(JSON.stringify(issueStatusChange));
    return this.httpClient.patch(this.BASE_URL + "/" + issueId, JSON.stringify(issueStatusChange), {headers});
  }

  createNewIssue(newIssue: Issue): Observable<any> {
    const headers = {'content-type': 'application/json'}

    return this.httpClient.post(this.BASE_URL, JSON.stringify(newIssue), {headers});
  }

  addUsersToIssue(usersId: number[], issueId: number): Observable<any> {
    const headers = {'content-type': 'application/json'}
    return this.httpClient.put(this.BASE_URL + "/" + issueId + "/user-add", JSON.stringify(usersId), {headers});
  }

  getIssueParticipants(issueId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BASE_URL + "/" + issueId + "/participants");
  }
}
