import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class LoginService
{
    constructor(private httpClient :HttpClient){}
    login(loginData) : any
    {  
       return this.httpClient.post("http://localhost:3000/api/login",loginData);
    }
    forgotPassword(userEmail) : any
    {  
       return this.httpClient.post("http://localhost:3000/api/forgotPassword",{userEmail : userEmail});
    }
    
}