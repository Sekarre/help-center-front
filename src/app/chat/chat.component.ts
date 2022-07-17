import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  input: any;

  constructor(public chatService: ChatService) {

  }

  ngOnInit(): void {
  }

  sendMessage() {
    if (this.input) {
      this.chatService.sendMessage(this.input);
      this.input = '';
    }
  }
}
