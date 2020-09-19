import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public postData: any;
  public totalItems: any;

  constructor() { }

  data(event) {
    this.postData = event.getDetails;
    this.totalItems = event.totalItems;
  }

  ngOnInit() {
  }

}
