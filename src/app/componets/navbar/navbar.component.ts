import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated : Observable<boolean>;

  constructor( private accountService: AccountService, private router: Router ) { }

  ngOnInit(): void {
    // se encargara de ver si esta el usuario autenticado y vea las funciones que debe ver
    this.authenticated = this.accountService.isAuthenticated();
  }

  // funcion para salir de la aplicación
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

}
