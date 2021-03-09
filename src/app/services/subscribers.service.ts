import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from 'rxjs/operators';
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

  header() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwttoken}`
    })

    return headers;
  }

  getSubscribersList() {

    return this.http.get(
      `${ this.url }/subscribers`,
      { headers: this.header() }
    );

  }

  getSubscriber( id: number ) {

    return this.http.get(
      `${ this.url }/subscribers/${ id }`,
      { headers: this.header() }
    );

  }

  updateSubscriber( id: number, subscriptor: Datum ) {

    subscriptor['id'] = id;

    return this.http.put(
      `${ this.url }/subscribers/${ id }`,
      subscriptor,
      { headers: this.header() }
    );

  }

  addSubscribers( subscriptor: Datum ) {
    //
    // let body = JSON.stringify({
    //   "Subscribers": [
    //     {
    //       "Name": "Suscriptor 4",
    //       "Email": "s4@tekus.co",
    //       "CountryCode": "CO",
    //       "CountryName": "Colombia",
    //       "PhoneCode": "+57",
    //       "PhoneNumber": 3012824768,
    //       "JobTitle": "",
    //       "Area": "",
    //       "Topics": []
    //     }
    //   ]
    // });
    //
    // console.log(body);

    // console.log(subscriptor);

    const   body = JSON.stringify({
      "Subscribers": [
          subscriptor
      ]
    });

    console.log(body);

    return this.http.post(
      `${ this.url }/subscribers`,
      body,
      { headers: this.header() }
    );

  }

  deleteSubscriber( id: number ) {

    return this.http.delete(
      `${ this.url }/subscribers/${ id }`,
      { headers: this.header() }
    );

  }

}
