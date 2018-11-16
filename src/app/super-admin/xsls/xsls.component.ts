import { Component, OnInit } from '@angular/core';
import {SuperAdminServices} from "../superAdminServices/usersService";
@Component({
  selector: 'app-xsls',
  templateUrl: './xsls.component.html',
  styleUrls: ['./xsls.component.scss']
})
export class XslsComponent implements OnInit {

  constructor(private SuperAdminServices : SuperAdminServices) { }

  ngOnInit() {
  }
  generatexsls()
  {
    this.SuperAdminServices.xslService().subscribe(res=>
    {
      console.log("xsls res>>>>>>",res);
      window.location.href = "http://" + res['path'];
      // window.open("http://" + res['path']);  
  })

  }
}
