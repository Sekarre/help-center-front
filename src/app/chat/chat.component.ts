import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  input: any;
  @ViewChild('content') content!: ElementRef;
  @ViewChildren('messages') messages!: QueryList<any>;

  constructor(public chatService: ChatService) {

  }
  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
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
