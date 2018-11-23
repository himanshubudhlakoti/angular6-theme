import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { SignupSigninComponent } from "./signup-signin.component";
import { SignupSigninRoutingMoudle } from "./signup-signinRouting.module";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RegistationService } from "./services/register.service";
import { LoginService } from "./services/login.service";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";


//global toaster dependecies
// import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports :
    [
        RouterModule,
        SignupSigninRoutingMoudle,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,

     ],
    declarations : [SignupSigninComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent],
    providers : [RegistationService ,LoginService ]
})
export class SignupSigninMoudle {}