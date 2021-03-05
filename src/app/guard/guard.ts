import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AccountService } from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {

  constructor( private service: AccountService, private router: Router ) { }

  canActivate(): boolean {
    if (this.service.isAuthenticated()){
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
