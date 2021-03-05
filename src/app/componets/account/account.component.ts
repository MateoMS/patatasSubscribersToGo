import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

import { AccountModel } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: AccountModel = new AccountModel;

  constructor( private accountService: AccountService, private router: Router ) { }

  ngOnInit(): void {
    if ( localStorage.getItem('token') && this.accountService.isAuthenticated() ){
      this.router.navigateByUrl('/subscribersList');
    }
  }

  login( form: NgForm ) {

    if( form.invalid ){
      return;
    }

    this.accountService.login( this.user ).subscribe( resp => {
             console.log('Entro al subcribe');
             console.log(resp);
             this.router.navigateByUrl('/subscribersList');
           } );
  }

}
