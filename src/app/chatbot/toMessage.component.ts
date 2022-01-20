import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'to-message',
    template: `<div class="chat-message-group writer-user">
    <div class="chat-messages">
      <div class="message">{{ message}}</div>
      <div class="from">{{ messageTime}}</div>
    </div>
  </div>`
})
export class ToMessageComponent implements OnInit{
    message : string = "this is a test";
    messageTime : Date = new Date();
    constructor(){}
    ngOnInit(): void{

    }
}