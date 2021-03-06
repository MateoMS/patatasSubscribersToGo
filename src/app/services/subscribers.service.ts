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

  private dataSubscriber = Datum;

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

  updateSubscriber( id: number  ) {

    const body = JSON.stringify(
      {
        "Id": 7949,
        "Name": "Kevin el peli camaleon",
        "Email": "kevin.piedrahita@tekus.co",
        "CountryCode": "CO",
        "PhoneNumber": "6043035",
        "Area": "Desarrollo",
        "JobTitle": "Frond",
        "Topics": []
      }
    );

    return this.http.put(
      `${ this.url }/subscribers/${ id }`,
      body,
      { headers: this.header() }
    );

  }

  addSubscribers() {

    const body = JSON.stringify({
      "Subscribers": [
        {
          "Name": "Suscriptor 4",
          "Email": "s4@tekus.co",
          "CountryCode": "CO",
          "CountryName": "Colombia",
          "PhoneCode": "+57",
          "PhoneNumber": 3012824768,
          "JobTitle": "",
          "Area": "",
          "Topics": []
        }
      ]
    });

    return this.http.post(
      `${ this.url }/subscribers`,
      body,
      { headers: this.header() }
    );

  }

  deleteSubscriber( id: number ) {

    console.log( id );

    return this.http.delete(
      `${ this.url }/subscribers/${ id }`,
      { headers: this.header() }
    );

  }

}
