import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//modules
import { SuperAdminRoutingModule } from './super-adminRouting.module';
import { MainLayoutModule } from '../mainlayout/mainlayout.module';

//components
import { SuperAdminComponent } from './super-admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListuserComponent } from './listuser/listuser.component';

@NgModule({
    imports :
    [
        RouterModule,
        SuperAdminRoutingModule,
        MainLayoutModule
        
    ],
    providers : [],
    
    declarations :
    [ SuperAdminComponent ,
      AddUserComponent,
      ListuserComponent
     ]
})
export class SuperAdminModule{}