import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AccountModel } from '../models/account.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = "https://lab.arkbox.co/api";
  public jwttoken: string;

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
    today.setSeconds( 3600 );  // una hora para que venza el token

    localStorage.setItem('expires', today.getTime().toString());

  }

  // Borra el Token al terminar la Sesion
  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('expires');

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

  isAuthenticated(): boolean {

    if ( this.jwttoken.length < 2 ) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();
    expiresDate.setTime(expires);

    if ( expiresDate > new Date() ) {
      return true;
    }
    else {
      return false;
    }

  }

}
