import { Component, OnInit, Input } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-displaydata',
  templateUrl: './displaydata.component.html',
  styleUrls: ['./displaydata.component.css']
})
export class DisplaydataComponent implements OnInit {

  itemsPerPage = 10;
  currentPage = 1;
  searchKey: any;
 @Input() postData: any;
 @Input() totalItems: any;
 public noDataFound: boolean;
 hide = false;

  constructor(private service: WebService) {
  }

  pageChange(pageNo: number): void {
    if (pageNo) {
      this.currentPage = pageNo;
      this.getData();
    }
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getAll(this.currentPage, this.itemsPerPage).subscribe((response: any) => {
      console.log(response.totalItems);
      if (response) {
      this.postData = response.students;
      this.totalItems = response.totalItems;
      // if(this.totalItems > 9) {
      //   this.hide = true;
      // } else {
      //   this.hide = false;
      // }
    }
    //  if (response !== null) {
    //   this.noDataFound = false;
    //   this.postData = response.students;
    //   this.totalItems = response.totalItems;
    //   if (this.totalItems !== 0) {
    //     this.hide = true;
    //   } else {
    //     this.hide = false;
    //   }
    //} 
    else {
      this.noDataFound = true;
      this.hide = false;
    }
    });
  }

  searchByName() {
    if (this.postData) {
      this.currentPage = 1;
      this.service.getByName(this.currentPage, this.itemsPerPage, this.searchKey).subscribe((response: any) => {
        if (response) {
          this.noDataFound = false;
          this.postData = response.students;
          this.totalItems = response.totalItems;
          // if (this.totalItems > 9) {
          //   this.hide = true;
          // } else {
          //   this.hide = false;
          // }
        } else {
          this.noDataFound = true;
        }
      });
    }
  }

  deleteStudentData(id) {
    this.service.deleteRecord(id).subscribe(response => {
      this.getData();
    });
  }

}
