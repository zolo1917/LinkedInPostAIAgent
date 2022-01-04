import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/**
 * Creatd by @zolo1917
 * 
 */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  queryForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initializeQueryForm();
  }

  private initializeQueryForm(){
    let name="";
    let contactNo = "";
    let email = "";
    let queryContent = "";
    this.queryForm = new FormGroup({
      'name' : new FormControl(name),
      'contactNo' : new FormControl(contactNo),
      'email': new FormControl(email),
      'queryContent': new FormControl(queryContent)
    });
  }
  OnSubmit(){
    // TODO: submit the query form
    console.log(this.queryForm.value);
  }

}
