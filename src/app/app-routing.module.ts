import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ChatComponent} from "./chat/chat.component";
import {AuthGuard} from "./guards/AuthGuard";
import {ChatListComponent} from "./chat-list/chat-list.component";
import {NewIssueComponent} from "./new-issue/new-issue.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'chat-channels',
    component: ChatListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:channelId',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'issue/new',
    component: NewIssueComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
