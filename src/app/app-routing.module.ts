import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentDetailComponent } from './student/student-detail.component';
import { StudentUpdateComponent } from './student/student-update.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import {MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'students', component: StudentComponent, canActivate: [AuthGuardService] },
  { path: 'edit/:jmbag', component: StudentUpdateComponent, canActivate: [AdminAuthGuardService]},
  { path: 'students/StudentByJmbag/:jmbag', component: StudentDetailComponent, canActivate: [AdminAuthGuardService] },
  { path: 'courses', component: StudentComponent },
  { path: 'login', component: LoginComponent},
  { path: 'forbidden', component: ForbiddenPageComponent},
  
  {path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
