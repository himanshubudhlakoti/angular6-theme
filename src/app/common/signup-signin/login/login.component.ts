import { Component } from '@angular/core';
import { RouterModule ,Router  } from '@angular/router';

import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public loginForm: FormGroup

  constructor(private formbuilder : FormBuilder, private router : Router)
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
  }
  login()
  {
    let loginData ={
      userEmail : this.loginForm.controls.userEmail.value ,
      userPassword : this.loginForm.controls.userPassword.value
    }
    console.log("logindata>>>>",loginData);

  }
 }
