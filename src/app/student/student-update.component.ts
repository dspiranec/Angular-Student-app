import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService} from "./student.service";
import { UserService} from "../user/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  student: Student;

  exampleForm = new FormGroup ({
    firstName: new FormControl(this.student.firstName, [Validators.required]),
    lastName: new FormControl(this.student.lastName, [Validators.required]),
    jmbag: new FormControl(this.student.jmbag, [Validators.required]),
    numberOfEcts: new FormControl(this.student.numberOfEcts, [Validators.required]),
  });
  
  constructor(private studentService: StudentService, 
                public userService: UserService,
                private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const jmbag = params.get('jmbag');
        return this.studentService.getStudentByJmbag(jmbag);
      }
      )
    ).subscribe((student: Student) => {
      this.student = student;
    });
  }
  
  add(firstName: string, lastName: string, jmbag: string, numberOfEcts: number): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    jmbag = jmbag.trim();

    if (!firstName || ! lastName || !jmbag || !numberOfEcts) { return; }

    const dateOfBirth = "11.11.1999.";

    this.studentService
      .addStudent({ jmbag, firstName, lastName, numberOfEcts, dateOfBirth } as Student)
      .subscribe(student => {
        console.log(student);
      });
  }
  

}
