import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-chat',
  templateUrl: './sticky-chat.component.html',
  styleUrls: ['./sticky-chat.component.css']
})
export class StickyChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeChat() {
    // $('#live-chat header').on('click', function () {
    //
    //   $('.chat').slideToggle(300, 'swing');
    //   $('.chat-message-counter').fadeToggle(300, 'swing');
    //
    // });
    //
    // $('.chat-close').on('click', function (e) {
    //
    //   e.preventDefault();
    //   $('#live-chat').fadeOut(300);
    //
    // });

  }

  hideChat() {

  }
}
