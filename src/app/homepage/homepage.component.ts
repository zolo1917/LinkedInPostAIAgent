import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  httpAddress: string = 'https://formspree.io/f/xwkyvnvq';
  queryForm: FormGroup;
  constructor(private httpClient:HttpClient ) { }

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
    this.httpClient
      .post(this.httpAddress, this.queryForm.value)
      .subscribe((data) => {
        console.log(data);
      });

    this.initializeQueryForm();
  }

}
