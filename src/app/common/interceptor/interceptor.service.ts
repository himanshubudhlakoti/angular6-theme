import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    public token: any;
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("inside interceptor>>>>>>>>>>>")

        this.setUser();
        if (this.token) {
            console.log("have token >>>>>>")
            let req_with_token = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return next.handle(req_with_token)
        }
        else {
            console.log("dont have token >>>>>>")
            return next.handle(request);
        }
    }
    setUser() {
        this.token = localStorage.getItem('token');
    }
}