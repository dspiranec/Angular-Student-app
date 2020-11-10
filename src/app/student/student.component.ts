import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService} from "./student.service";
import { UserService} from "../user/user.service";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[];
  
  selectedStudent: Student;

  edit: boolean;

  exampleForm: FormGroup;

  constructor(
    private studentService: StudentService, 
    public userService: UserService,
    private router: Router,
    
    ) { }

  ngOnInit(): void {
    this.getStudents();
  }
  
  getStudents(): void {
    this.studentService.getStudents()
    .subscribe(students => this.students = students);
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }

  navigateToEdit(jmbag: String) {
    this.router.navigate([`edit/${jmbag}`]);
  }

  confirmEdit(student : Student){
    this.edit = true;
    this.selectedStudent = student;
    this.exampleForm = new FormGroup ({
      firstName: new FormControl(this.selectedStudent.firstName, [Validators.required]),
      lastName: new FormControl(this.selectedStudent.lastName, [Validators.required]),
      jmbag: new FormControl(this.selectedStudent.jmbag, [Validators.required]),
      numberOfEcts: new FormControl(this.selectedStudent.numberOfEcts, [Validators.required]),
    });
  }

  ifEdit(): boolean{
    if(this.edit) return true;
    else return false;
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
        this.getStudents();
        console.log(student);
      });
  }

  deleteStudent(jmbag): void{
    this.studentService.deleteStudent(jmbag);
    this.students = this.students.filter(students => students.jmbag !== jmbag);
    
    console.log(this.students);
  }

}
