import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';

import { StudentManagerComponent } from './students/student-manager/student-manager.component';
const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  { path: 'student', component: StudentsComponent,
    children: [
      {path: '', component: StudentListComponent},
      {path: 'new', component: StudentManagerComponent},
      {path: 'edit/:key', component: StudentManagerComponent},
      {path: 'view/:key', component: StudentDetailsComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
