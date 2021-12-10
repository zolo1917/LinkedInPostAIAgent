import { EventModel } from './../Models/Event.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  eventList : EventModel[] = [{eventTitle: "TEst Event 1", eventDesc:"this is a description on the first test and see hot it works"},{eventTitle: "TEst Event 2", eventDesc:"this is a description on the first test and see hot it works"}];

  blogForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  // Initialte form Values
  private initForm(){
    let eventTitle: String = "";
    let eventDesc: String = "";
    this.blogForm= new FormGroup({
      'eventTitle' : new FormControl(eventTitle),
      'eventDesc' : new FormControl(eventDesc)
    })
  }

  OnSubmit(){
    this.eventList.push(this.blogForm.value);
    console.log("Form Submitted");
  }

  OnCancle() {
    this.initForm();
    console.log("form canceled");
  }

}
