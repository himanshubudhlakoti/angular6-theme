import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SuperAdminServices {
    newHeaders:any
        constructor(private http: HttpClient) { 
            this.newHeaders={
                "Accept":"application/json"
            }
        }

    xslService(): any {
        return this.http.get("http://localhost:3000/api/generateXls");
    }
    getAllUsers(filter: any): any {
        return this.http.post("http://localhost:3000/api/getAllUsers", filter);
    }
    addPic(formData_: any): any {
        console.log("image >>>>>>>>>>service>>>>>>>>>>>>>>>>>>>>>>>>>>", formData_);
        return this.http.post("http://localhost:3000/api/addPic", formData_ ,{'headers': this.newHeaders});
    }
}
