import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    
    private studentsUrl = 'http://localhost:8080/students';
    private studentsJmbagUrl = 'http://localhost:8080/students/StudentByJmbag';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getStudents(): Observable<Student[]> {
        
        return this.http.get<Student[]>(this.studentsUrl)
            .pipe(
            tap(_ => console.log('fetched students')),
            catchError(this.handleError<Student[]>('getStudents', []))  
        );
    }

    getStudentByJmbag(jmbag: String): Observable<Student> {

        const urlByJmbag = `${this.studentsJmbagUrl}/${jmbag}`;

        return this.http.get<Student>(urlByJmbag)
            .pipe(
            tap(_ => console.log('fetched student')),
            catchError(this.handleError<Student>('getStudent'))
        );
    }

    addStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(this.studentsUrl, student, this.httpOptions)
        .pipe(
        tap((newStudent: Student) => console.log(`added student w/ JMBAG=${newStudent.jmbag}`)),
        catchError(this.handleError<Student>('addStudent'))
        );
    }

    deleteStudent(jmbag){
        const url = `${this.studentsUrl}/${jmbag}`;

        return this.http.delete(url,this.httpOptions)
        .subscribe(_ => console.log(`deleted student JMBAG=`+jmbag)),
        catchError(this.handleError<Student>('deleteStudent'));

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation);
            console.error(error);
            return of(result as T);
        };
    }
}