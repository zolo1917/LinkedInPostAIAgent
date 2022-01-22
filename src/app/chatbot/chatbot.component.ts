import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToMessageComponent } from './toMessage.component';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  chatForm : FormGroup;
  chatContainer:any = []; 
  headUser: string = "Oatey";
  constructor() { }

  ngOnInit(): void {
    this.initializeChat();
  }
  private initializeChat(){
    let query = "";
    this.chatForm = new FormGroup({
      'query': new FormControl(query)
    });
  }
  public OnSend(){
    // i have to send a messgae here
    var test = new ToMessageComponent();
    this.chatContainer.push(test);
    console.log(test);
  }

  collapseChatBox(){
    // need the code for the collapse of the chat box
    console.log("time to collapse");
  }

}
