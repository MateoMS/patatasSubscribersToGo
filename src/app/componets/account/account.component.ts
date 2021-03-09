import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

import { AccountModel } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: AccountModel = new AccountModel;

  constructor( private accountService: AccountService, private router: Router ) { }

  ngOnInit(): void {
    // si hay un Token y esta autenticado te regresara a la pagina principal
    if ( localStorage.getItem('token') && this.accountService.isAuthenticated() ){
      this.router.navigateByUrl('/subscribersList');
    }
  }

  // el proceso del login
  login( form: NgForm ) {

    if( form.invalid ){
      return;
    }

    // hace el login, en caso de error le anuncia
    this.accountService.login( this.user ).subscribe( resp => {
             this.router.navigateByUrl('/subscribersList');
           },
         error => {
           Swal.fire({
            icon: 'error',
            title: 'Acceso denegado!!!',
            text: 'Parece que algo salio mal, prueba de nuevo.'
          })
         } );
  }

}
