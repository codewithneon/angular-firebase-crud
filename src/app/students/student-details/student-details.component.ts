import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  constructor(private ar: ActivatedRoute, private r: Router, private ss: StudentsService) { }
  ngOnInit(): void {
    this.ar.params.subscribe(p => {
      if (p.id) {
        this.ss.get(p.id).valueChanges().subscribe(res => {
          if (res) {
            console.log(res);
          } else {
            this.r.navigate(['student']);
          }
        });
      }else{
        this.r.navigate(['student']);
      }
    });
  }

}
