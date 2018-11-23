import { Component, OnInit } from '@angular/core';
import {SuperAdminServices} from "../superAdminServices/usersService";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public selectedFile : any = [];
  public Base64File : any ;

  constructor(private SuperAdminServices: SuperAdminServices,
                private toastr : ToastrService) { }

  ngOnInit() {
  }

   getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  fileSelected(e )
  {
    let formData_ = new FormData();

    this.selectedFile = e.target.files;
    console.log("files>>>>>>>>>>>>>" ,this.selectedFile);
    console.log("files length>>>>>>>>>>>>>" ,this.selectedFile.length);

    for(var i = 0 ; i < this.selectedFile.length ; i++)
    {

       formData_.append("file", this.selectedFile[i]);
    }
   // console.log(this.selectedFile);

    //this.getBase64(this.selectedFile).then(
    //  data => {
    //  this.Base64File = data;
     // console.log("<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>" ,this.Base64File);
      

   // }
   // );

   
  //  this.xhrRequest("http://localhost:3000/api/addPic", formData_);
   
    this.SuperAdminServices.addPic(formData_).subscribe(res=>
      {
       
        console.log("addpic res >>>>>>>>>>", res);
        if(res['code'] ==  200)
        {
          this.toastr.success(res.messages, "Successfull!!!");

        }
        else{
          this.toastr.error(res.messages, "Failed");

        }

      })
  
  }

}
