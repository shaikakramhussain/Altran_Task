import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { WebService } from '../web.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  @Output() userData: EventEmitter<any> = new EventEmitter();
  public getDetails: any = [];
  itemsPerPage = 10;
  currentPage = 1;
  totalItems: number;
  hide = false;

  constructor(private formBuilder: FormBuilder, private service: WebService) { }

  get f() { return this.registerForm.controls; }

  reset() {
    this.registerForm.reset();
    this.submitted = false;
  }

  ngOnInit() {
    const mobileValidate = '^(\\s*\\)?|[0]?)?[6789]\\d{9}$';
    const emailValidator = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      division: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailValidator)]],
      address: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern(mobileValidate), Validators.minLength(10)]]
    });
    this.getData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.service.addStudent(this.registerForm.value).subscribe((response: any) => {
      if (response) {
        this.registerForm.reset();
        this.submitted = false;
        this.getData();
        this.userData.emit({
          totalItems: this.totalItems,
          getDetails: this.getDetails
        });
      }
    });
  }

  getData() {
    this.service.getAll(this.currentPage, this.itemsPerPage).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.getDetails = response.students;
        this.totalItems = response.totalItems;
        this.userData.emit({
          totalItems: this.totalItems,
          getDetails: this.getDetails
        });
      }
    });
  }

}

