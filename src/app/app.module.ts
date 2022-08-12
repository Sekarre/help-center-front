import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ChatComponent} from './chat/chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {AlertComponent} from './alert/alert.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {AppRoutingModule} from "./app-routing.module";
import {ChatListComponent} from './chat-list/chat-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {NewIssueComponent} from './new-issue/new-issue.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { IssuesListComponent } from './issues-list/issues-list.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { SingleIssueComponent } from './single-issue/single-issue.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { CommentDialogComponent } from './dialogs/comment-dialog/comment-dialog.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import { CommentsComponent } from './comments/comments.component';
import { ChatDialogComponent } from './dialogs/chat-dialog/chat-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    AlertComponent,
    ChatListComponent,
    NavbarComponent,
    NewIssueComponent,
    IssuesListComponent,
    SingleIssueComponent,
    CommentDialogComponent,
    CommentsComponent,
    ChatDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
