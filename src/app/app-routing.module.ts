import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ChatComponent} from "./chat/chat.component";
import {AuthGuard} from "./guards/AuthGuard";
import {ChatListComponent} from "./chat-list/chat-list.component";

const routes: Routes = [
  {
    path: '', component: ChatComponent,
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
