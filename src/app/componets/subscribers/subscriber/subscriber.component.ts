import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Moldels
import { Datum } from 'src/app/models/subscribersList.model';

// Services
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subscriber = Datum;

  constructor( private subscribersService: SubscribersService,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    this.getSubscriber( id );

  }

  getSubscriber( id: number ) {

    this.subscribersService.getSubscriber( id ).subscribe (
        (data: any) => {
          this.subscriber = data;
          return data;
        }
    );

  }

}
