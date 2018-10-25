import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    console.log("enters in authguard");
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      this.checkLOgin();
    }
  }
  checkLOgin() {
    if (localStorage.getItem("token")) {
      this.router.navigate(["login"]);
    }
  }
}
