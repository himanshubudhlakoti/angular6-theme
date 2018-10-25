import { RouterModule ,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AddUserComponent } from './add-user/add-user.component';
import { LandingComponent } from '../mainlayout/landing/landing.component';
import { ListuserComponent } from './listuser/listuser.component';

export const routes: Routes = [
    {
        path : "" ,component : LandingComponent,
        data: {
            title: 'ADDUSER'
          },
        children :
        [   {path  : "",redirectTo :"listuser"  } ,
            {path : "adduser" ,component : AddUserComponent},
            {
                path : "listuser" ,component : ListuserComponent
            }
        ]
    }
]
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule{}