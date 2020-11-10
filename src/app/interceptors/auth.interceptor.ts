import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (request.url.startsWith('http') && !(`http://localhost:8080` && request.url.startsWith(`http://localhost:8080`)))) {
            return next.handle(request);
        }

        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        // add content type
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request);
    }

}
