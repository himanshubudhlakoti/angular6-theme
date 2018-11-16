import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//modules
import { SuperAdminRoutingModule } from './super-adminRouting.module';
import { MainLayoutModule } from '../mainlayout/mainlayout.module';

//components
import { SuperAdminComponent } from './super-admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListuserComponent } from './listuser/listuser.component';

import { SuperAdminServices } from './superAdminServices/usersService';
import { XslsComponent } from './xsls/xsls.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports :
    [
        RouterModule,
        SuperAdminRoutingModule,
        MainLayoutModule,
        FormsModule,
        CommonModule
        
    ],
    providers : [SuperAdminServices],
    
    declarations :
    [ SuperAdminComponent ,
      AddUserComponent,
      ListuserComponent,
      XslsComponent
     ]
})
export class SuperAdminModule{}