import { Component } from '@angular/core';
import { RegistationService } from '../services/register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(private RegistationService : RegistationService) { }


  getFileData(e)
  {
    
    let data ={
    username : "Himanshu"
      }
    const _formData = new FormData();
    let selectedFile = e.target.files[0];
    console.log(selectedFile)
    _formData.append('file', selectedFile);
    _formData.append('data', data.username);
    _formData.append('asdfas', data.username);


    this.RegistationService.register(_formData).subscribe(res=>{

    })  

  }

}
