import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'from-message',
    template: `<div class="chat-message-group">
    <div class="chat-thumb">
      <figure class="image is-32x32">
        <img class="is-32x32" src="../../assets/logo-option1-_anupama_.ico">
      </figure>
    </div>
    <div class="chat-messages">
      <div class="message"> {{ message }}</div>
      <div class="from">{{ messageTime }} </div>
    </div>
  </div>`
})
export class FromMessageComponent implements OnInit{
    message : string = "This is a test";
    messageTime : Date = new Date();
    constructure(){}
    ngOnInit(): void{

    }
}
