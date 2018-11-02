import { RouterModule ,Routes  } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes : Routes = [
    {
        path :"" ,component : LoginComponent,pathMatch: 'full',

    },
    {
        path :"registration" ,component : RegisterComponent
    }
    
    
]

@NgModule({
imports :[RouterModule.forChild(routes)],
exports : [RouterModule]
})
export class SignupSigninRoutingMoudle {}
