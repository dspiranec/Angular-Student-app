import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CourseService {
    
    private coursesUrl = 'http://localhost:8080/courses';
    private coursesJmbagUrl = 'http://localhost:8080/courses/CourseByJmbag';
    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {
        
        return this.http.get<Course[]>(this.coursesUrl)
            .pipe(
            tap(_ => console.log('fetched courses')),
            catchError(this.handleError<Course[]>('getCourses', []))  
        );
    }

    getCoursesByJmbag(jmbag: String): Observable<Course[]> {

        const urlByJmbag = `${this.coursesJmbagUrl}/${jmbag}`;
        
        return this.http.get<Course[]>(urlByJmbag)
            .pipe(
            tap(_ => console.log('fetched course')),
            catchError(this.handleError<Course[]>('getCourse', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation);
            console.error(error);
            return of(result as T);
        };
    }
}