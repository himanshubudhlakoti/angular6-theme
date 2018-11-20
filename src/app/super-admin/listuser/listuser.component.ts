import { Component, OnInit } from '@angular/core';
import {SuperAdminServices} from "../superAdminServices/usersService";

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  public users : any = [];
  public action : any = {};
  public searchArr : any = [];
  public filter : any =
  {
    limit : 4,
    pageNumber :1,
    isSearching : false,
    searchingData :null,
  }
  constructor(private SuperAdminServices : SuperAdminServices) { }

  ngOnInit()
  {
    this.getAllUsers()
  }
  getAllUsers()
  {
    this.SuperAdminServices.getAllUsers(this.filter).subscribe(res=>
      {
        this.users =  res.data;
        // this.searchArr = this.users;
        console.log("getAllUsers res >>>>>>>>>>", this.users);

      })
  }
  search(data : any)
  { 
    this.filter.searchingData = this.action.search;
    this.filter.isSearching = this.filter.searchingData ? true : false;

    console.log("search >>>" , this.filter);
    this.searchArr =[];
    // this.users.map((userData , index)=>
    // {
    //   if((parseInt(userData.user_email.search(this.action.search)) != -1 ))
    //   {
    //     this.searchArr.push(userData);
    //   }
    // })
    this.getAllUsers();
  }

}
