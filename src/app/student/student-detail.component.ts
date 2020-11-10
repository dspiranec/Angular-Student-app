import { Component, OnInit, Input } from '@angular/core';
import { Student } from './student';
import { StudentService} from "./student.service";
import { ActivatedRoute } from '@angular/router';

import { Course } from '../course/course';
import { CourseService} from "../course/course.service";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  allCourses: Course[];
  courses: Course[];
  student: Student;
  jmbag: String;

  constructor(private studentService: StudentService, private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.jmbag = this.route.snapshot.paramMap.get('jmbag');

    this.courseService.getCourses();

    this.courseService.getCoursesByJmbag(this.jmbag)
      .subscribe(courses => this.courses = courses);

    this.studentService.getStudentByJmbag(this.jmbag)
      .subscribe(s => {
          this.student = s;
          console.log(s);
      });
      
  }

    getCourses(): void {
      this.courseService.getCourses()
      .subscribe(allCourses => this.allCourses = allCourses);
    }
  
}
