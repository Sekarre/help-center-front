import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {Observable} from "rxjs";
import {Comment, CommentCreate} from "../domain/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private BASE_URL: string = environment.baseUrl + ApiPaths.Comments;


  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  getIssueComments(issueId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.BASE_URL + "/" + issueId);
  }

  createNewComment(comment: CommentCreate, issueId: number): Observable<any> {
    const headers = {'content-type': 'application/json'}
    return this.httpClient.post(this.BASE_URL + "/" + issueId, JSON.stringify(comment), {headers});
  }
}
