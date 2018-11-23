import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
public user : object = {};
  constructor(private LoginService : LoginService) { }

  ngOnInit() {
  }
  forgetpassword()
  {
    console.log(">>>>",this.user['userEmail'])
    let userEmail = this.user['userEmail'];
    this.LoginService.forgotPassword(userEmail).subscribe(res=>
      {
        console.log("res");
      })
  }

}
