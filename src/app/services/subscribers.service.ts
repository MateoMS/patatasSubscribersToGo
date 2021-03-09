import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AccountService } from './account.service';
import { Datum } from '../models/subscribersList.model';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private url = "https://lab.arkbox.co/api";
  private jwttoken: string;

  constructor( private http: HttpClient, private accountService: AccountService) {
    this.jwttoken = accountService.jwttoken;
  }

  // maneja el token y permite reutilizarlo
  header() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwttoken}`
    })

    return headers;
  }

  // Obtiene la lista
  getSubscribersList() {

    return this.http.get(
      `${ this.url }/subscribers`,
      { headers: this.header() }
    );

  }

  // Obtiene informacion de un unico suscriptor
  getSubscriber( id: number ) {

    return this.http.get(
      `${ this.url }/subscribers/${ id }`,
      { headers: this.header() }
    );

  }

  // Actualiza la informacion del suscriptor actual
  updateSubscriber( id: number, subscriptor: Datum ) {

    subscriptor['id'] = id;

    return this.http.put(
      `${ this.url }/subscribers/${ id }`,
      subscriptor,
      { headers: this.header() }
    );

  }

  // Añade la informacion de un nuevo suscriptor
  addSubscribers( subscriptor: Datum ) {

    const   body = JSON.stringify({
      "Subscribers": [
          subscriptor
      ]
    });

    return this.http.post(
      `${ this.url }/subscribers`,
      body,
      { headers: this.header() }
    );

  }

  // Chasquea los dedos como Thanos y elimina al suscriptor
  deleteSubscriber( id: number ) {

    return this.http.delete(
      `${ this.url }/subscribers/${ id }`,
      { headers: this.header() }
    );

  }

}
