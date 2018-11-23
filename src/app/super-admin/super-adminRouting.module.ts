import { RouterModule ,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AddUserComponent } from './add-user/add-user.component';
import { LandingComponent } from '../mainlayout/landing/landing.component';
import { ListuserComponent } from './listuser/listuser.component';
import { XslsComponent } from './xsls/xsls.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ChatComponent } from './chat/chat.component';


export const routes: Routes = [
    {
        path : "" ,component : LandingComponent,
        data: {
            title: 'superadmin'
          },
        children :
        [   {path  : "",redirectTo :"listuser"  } ,
            {path : "adduser" ,component : AddUserComponent, data: {
                title: 'adduser'
              },},
            {
                path : "listuser" ,component : ListuserComponent, data: {
                    title: 'listuser'
                  },
            },
            {
                path : "xsl" , component : XslsComponent
            },
            {
                path : "gallery" , component : GalleryComponent
            },
            {
                path : "chat" , component : ChatComponent
            }
        ]
    }
]
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule{}