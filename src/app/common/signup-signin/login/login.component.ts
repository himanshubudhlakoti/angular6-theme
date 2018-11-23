import { Component } from '@angular/core';
import { Router  } from '@angular/router';

import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public modalRef: BsModalRef;
  public loginForm: FormGroup;
  public user : any = {};

  constructor(private formbuilder : FormBuilder, private router : Router,
              private LoginService : LoginService,private toastr :ToastrService,
              private model : BsModalService)
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
        if(res['code'] == 200 )
        {
          this.toastr.success(res.messages, "Welcome!");
          localStorage.setItem("token" , res.data.token);
          this.router.navigate(["auth/superadmin"]);
        }
        else
        {
          this.toastr.error(res.messages, "");

        }


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
  openModel(template) {
    console.log("><><<><><<");
    this.modalRef = this.model.show(template);
  }
  forgetpassword()
  {
    console.log(">>>>",this.user['userEmail'])
    let userEmail = this.user['userEmail'];
    this.LoginService.forgotPassword(userEmail).subscribe(res=>
      {
        console.log("res>>>>>>>>", res);
        if(res.code == 200)
        {
          this.toastr.success(res.data, "Forgot Password!");
          this.modalRef.hide();

        }
        else{
          this.toastr.error(res.data, "Forgot Password!");

        }
      })
  }
 }
