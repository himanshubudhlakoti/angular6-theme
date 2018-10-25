import { NgModule } from "@angular/core";


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { SignupSigninComponent } from "./signup-signin.component";
import { SignupSigninRoutingMoudle } from "./signup-signinRouting.module";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    imports :
    [
        RouterModule,
        SignupSigninRoutingMoudle,
        ReactiveFormsModule,
        FormsModule,
        CommonModule

     ],
    declarations : [SignupSigninComponent,
        LoginComponent,
        RegisterComponent],
    providers : []
})
export class SignupSigninMoudle {}