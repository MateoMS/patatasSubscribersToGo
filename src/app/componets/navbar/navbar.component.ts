import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private accountService: AccountService, private router: Router ) { }

  authenticated = false;

  ngOnInit(): void {
    this.authenticated = this.accountService.isAuthenticated();
    console.log(this.authenticated);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

}
