import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SuperAdminServices
{   constructor(private http : HttpClient){}

    xslService() : any
    {
        return this.http.get("http://localhost:3000/api/generateXls");
    }
    getAllUsers(filter : any) : any
    {
        return this.http.post("http://localhost:3000/api/getAllUsers" ,filter);
    }
}
