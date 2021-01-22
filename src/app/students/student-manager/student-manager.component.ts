import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentsService } from '../students.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.scss']
})
export class StudentManagerComponent implements OnInit {
  key: string;
  title: string;
  reqForm: FormGroup;
  constructor(
    private r: Router,
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private ss: StudentsService) {
    this.reqForm = this.fb.group({
      date: [formatDate(new Date(), 'HH:MM - DD/MM/YYYY', 'en')],
      fullName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ])],
      fatherName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ])],
      birthday: ['', Validators.compose([
        Validators.required
      ])],
      mobileNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^[0-9\-\(\)\/\+\s]*$/)
      ])],
      className: ['', Validators.compose([
        Validators.required
      ])],
      roleNumber: ['', Validators.compose([
        Validators.required,
        Validators.min(4),
        Validators.max(10000)
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ])]
    });
  }
  ngOnInit(): void {
    this.ar.params.subscribe(p => {
      if (p.key) {
        this.ss.get(p.key).valueChanges().subscribe(res => {
          if (res) {
            this.key = p.key;
            this.title = 'Update Student ID-' + p.key;
            this.reqForm.setValue(res);
          } else {
            this.r.navigate(['student']);
          }
        });
      } else {
        this.key = null;
        this.title = 'New Student';
      }
    });
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFields(control);
        }
    });
  }
  newQuery() {
    if (!(this.reqForm.pristine || this.reqForm.invalid)) {
      if (this.key) {
        this.ss.update(this.key, this.reqForm.value);
      } else {
        this.ss.create(this.reqForm.value);
      }
      this.reqForm.reset();
      this.r.navigate(['student']);
    }else{
      this.validateAllFields(this.reqForm);
    }
  }
}
