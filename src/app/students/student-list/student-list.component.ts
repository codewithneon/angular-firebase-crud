import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
declare const $: any;
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any;
  selectedKey: string;
  constructor(private ss: StudentsService, private router: Router) { }
  ngOnInit() {
    this.getStudentList();
  }
  getStudentList() {
    this.ss.getList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(students => {
      this.students = students;
    });
  }
  viewItem(key){
    this.router.navigate(['student/details/', key]);
  }
  updateItem(key){
    this.router.navigate(['student', key]);
  }
  deleteItem(){
    if (this.selectedKey) {
      this.ss.delete(this.selectedKey).catch(err => console.log(err));
    }
    $('#confirmDelete').modal('hide');
  }
  ConfirmRemove(key){
    this.selectedKey = key;
    $('#confirmDelete').modal('show');
  }
}
