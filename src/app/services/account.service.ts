import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AccountModel } from '../models/account.model';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = "https://lab.arkbox.co/api";
  public jwttoken: string;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient) {
    this.readToken();
  }

  // Se genera el token para acceder a la cuenta
  login( user: AccountModel ) {

    return this.http.post(
      `${ this.url }/account/login`,
      user
    ).pipe( map (
        data => {
          this.saveToken(data['Token']);
          return data;
        }
    ));

  }

  // Guarda el token en el localStorage
  private saveToken( idToken: string ) {

    this.jwttoken = idToken;
    localStorage.setItem('token', idToken);

    let today = new Date();
    today.setSeconds( 14400 );  // cuatro horas para que venza el token

    localStorage.setItem('expires', today.getTime().toString());

  }

  // Borra el Token al terminar la Sesion
  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('expires');

    this.loggedIn.next(false);

  }

  // Leer si existe un token de autorización
  readToken() {

    if ( localStorage.getItem('token') ){
      this.jwttoken = localStorage.getItem('token');
    }
    else {
      this.jwttoken = '';
    }

    return this.jwttoken;

  }

  isAuthenticated(): Observable<boolean> {

    if ( this.jwttoken.length < 2 ) {
      this.loggedIn.next(false);
      return this.loggedIn;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();
    expiresDate.setTime(expires);

    if ( expiresDate > new Date() ) {
      this.loggedIn.next(true);
    }
    else {
      this.loggedIn.next(false);
    }

    return this.loggedIn;

  }

}
