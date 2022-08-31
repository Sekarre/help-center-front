import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ChatMessage} from "../domain/ChatMessage";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {ChatService} from "../services/chat.service";
import {Stomp} from "@stomp/stompjs";
// @ts-ignore
import SockJS from "sockjs-client";
import {botId, snackBarDuration} from "../constants/Properties";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sticky-chat',
  templateUrl: './sticky-chat.component.html',
  styleUrls: ['./sticky-chat.component.css']
})
export class StickyChatComponent implements OnInit {

  @Input() channelId: string = '';
  @Output() toDestroyEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') content!: ElementRef;
  @ViewChildren('messagesTracker') messagesTracker!: QueryList<any>;
  public input: any;
  public inputImage: any;
  private isConnected: boolean = false;
  public messages: ChatMessage[] = [];
  private stompClient: any;
  private serverUrl: string = environment.baseUrl + ApiPaths.WebSocket;
  public fileBase64!: string | ArrayBuffer | null;
  public showPreviewImageDeleteButton: boolean = false;
  public showSpinner: boolean = true;

  constructor(public chatService: ChatService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.loadAllMessages();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messagesTracker.changes.subscribe(this.scrollToBottom);
  }

  ngOnDestroy(): void {
    console.log('Disconnected');
    this.disconnectStomp();
  }

  initializeWebSocketConnection() {
    this.stompClient = Stomp.over(() => {
      return new SockJS(this.serverUrl, this.chatService.getAuthHeader());
    });
    this.stompClient.debug = () => {
    };
    this.stompClient.reconnect_delay = 5000;
    this.stompClient.connect(this.chatService.getAuthHeader(), (frame: any) => {
      this.isConnected = true;
      this.stompClient.subscribe(ApiPaths.WebSocketErrorsSubscribe,
        (message: any) => {
          this.snackBar.open('Error with chat occurred.', 'Ok', {
            duration: snackBarDuration
          });
        }
      );
      this.stompClient.subscribe(ApiPaths.WebSocketSubscribe + this.channelId,
        (message: any) => {
          if (message.body) {
            let parsedMessage: ChatMessage = <ChatMessage>JSON.parse(message.body);
            this.messages.push(parsedMessage);
          }
        }
      );
    });
  }

  private disconnectStomp() {
    this.stompClient.disconnect();
    this.isConnected = false;
  }

  loadAllMessages() {
    this.chatService.getChatMessages(this.channelId).subscribe((data) => {
        this.messages = data;
        this.showSpinner = false;
      }, error => {
        this.snackBar.open('Selected chat couldn\'t be loaded, try again later.', 'Ok', {
          duration: snackBarDuration
        });
      }
    );
  }

  getAndSendMessage() {
    if (this.input || this.fileBase64) {
      this.sendMessage(this.input);
      this.input = '';
    }
  }

  sendMessage(message: string) {
    let content = JSON.stringify({'message': message, 'file': this.fileBase64});
    this.stompClient.send(ApiPaths.WebSocketSend + this.channelId, {}, content);
    this.fileBase64 = null;
    this.inputImage = '';
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  checkIfBotMessage(senderId: number) {
    return senderId == botId;
  }

  onFileInputChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileBase64 = reader.result;
    };
  }

  removeFile() {
    this.fileBase64 = null;
    this.inputImage = '';
  }

  closeChat() {
    this.toDestroyEvent.emit();
  }
}
