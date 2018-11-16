import { Component } from '@angular/core';
import { RouterModule ,Router  } from '@angular/router';

import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public user : any = {};

  constructor(private formbuilder : FormBuilder, private router : Router,
              private LoginService : LoginService)
  {
      this.loginForm =this.formbuilder.group({
        userEmail: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
        userPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],

      })
  }
  ngOnInit()
  { 
    if(localStorage.getItem("token"))
    {
      this.router.navigate(["auth/superadmin/listuser"]);
    }
    else{
      this.router.navigate(["login"]);
    }
  }
  login()
  {
    let loginData ={
      userEmail : this.loginForm.controls.userEmail.value ,
      userPassword : this.loginForm.controls.userPassword.value
    }
    console.log("logindata>>>>",loginData);
      this.LoginService.login(loginData).subscribe(res=>{

        console.log("LOGIN RESPONSE >>>>>>>>",res);


    })

  }
  saveData()
  {
    console.log("user data is", this.user)
  }
  deleteData()
  {
    console.log("user data is", this.user)
  }
 }
