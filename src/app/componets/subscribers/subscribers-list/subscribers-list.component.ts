import { Component, OnInit } from '@angular/core';

//Services
import { SubscribersService } from 'src/app/services/subscribers.service';

//Models
import { SubscribersListModel, Datum } from 'src/app/models/subscribersList.model';

@Component({
  selector: 'app-subscribers-list',
  templateUrl: './subscribers-list.component.html',
  styleUrls: ['./subscribers-list.component.css']
})
export class SubscribersListComponent implements OnInit {

  subscribersList: SubscribersListModel = new SubscribersListModel;

  constructor( private subscribersService: SubscribersService ) { }


  ngOnInit(): void {

    this.getSubscribersList();

    console.log(this.subscribersList);
  }

  getSubscribersList() {

    this.subscribersService.getSubscribersList().subscribe (
        data => {
          this.subscribersList.Count = data['Count'];
          this.subscribersList.Data = data['Data'];
          // console.log( data );
          return data;
        }
    );

  }

  addSubscribers() {
    console.log('Presiono añadir');
    this.subscribersService.addSubscribers().subscribe( data => console.log(data) );
  }

  updateSubscribers( id: number ) {
    console.log('Presiono actualizar');
    this.subscribersService.updateSubscriber(id).subscribe( data => console.log(data) );
  }

  deleteSubscribers( id: number ) {
    console.log('Presiono borrar');
    this.subscribersService.deleteSubscriber(id).subscribe( data => console.log(data) );
  }

}
