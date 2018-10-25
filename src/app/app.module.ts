import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };

import { AppComponent } from './app.component';


import {
  // AppAsideModule,
  AppBreadcrumbModule,
  // AppHeaderModule,
  // AppFooterModule,
  // AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ChartsModule } from 'ng2-charts/ng2-charts';




// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyInterceptor } from './common/interceptor/interceptor.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    // AppFooterModule,
    // AppHeaderModule,
    // AppSidebarModule,
    // PerfectScrollbarModule,
    // BsDropdownModule.forRoot(),
    // TabsModule.forRoot(),
    // ChartsModule,
    RouterModule,
    // ReactiveFormsModule,
    // FormsModule,
    CommonModule
  ],
  declarations: [
    AppComponent
   
    
    
    
  ],
  providers: [{
   
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  { //for interceptors it is must
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true
  }],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
