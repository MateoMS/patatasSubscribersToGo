import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Moldels
import { Datum } from 'src/app/models/subscribersList.model';
import { Country, countryMap } from 'src/app/models/country.model';

// Services
import { SubscribersService } from 'src/app/services/subscribers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subscriber = new Datum;
  countries = countryMap;
  countryName: string;
  countryPhone: string;
  topics: Array<any>[];
  id: number;
  isNewSubscriber: boolean = false;

  constructor( private subscribersService: SubscribersService,
               private activatedRoute: ActivatedRoute,
               private router: Router
             ) {

   }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;
    this.id = id;
    if ( id === undefined ) {
      this.isNewSubscriber = true;
    }
    else {
      this.getSubscriber( this.id );
    }

  }

  addTopics(thopic: any) {
    this.topics.push(thopic.value);

    console.log(this.topics);
  }

  getCountryName(countryCode: string) {
    const country: Country | undefined = this.countries.find((c: Country) => c.code === countryCode);
    if (!country) {
        console.log("No se encuentra codigo del pais");
    }

    this.countryName = country.name;
    this.countryPhone = country.dialCode;

    console.log(this.subscriber);
  }

  getSubscriber( id: number ) {

    this.subscribersService.getSubscriber( id ).subscribe (
        (data: any) => {
          this.subscriber = data;

          console.log(data);

          this.topics = data['Topics'];
          return data;
        }
    );

  }

  returnToList() {
    this.router.navigateByUrl('/subscribersList');
  }

  updateSubscriber( formSubscriber ) {
    formSubscriber.value['Topics'] = [];

    if ( this.countryName!==undefined && this.countryPhone!==undefined ) {
      formSubscriber.value['CountryName'] = this.countryName;
      formSubscriber.value['CountryPhone'] = this.countryPhone;
    }
    this.subscriber = formSubscriber.value;
    if ( formSubscriber.valid && this.subscriber['Name']!==undefined && ( this.subscriber['Email']!==undefined || (this.subscriber['CountryCode']!==undefined && this.subscriber['PhoneNumber']!==undefined) ) ) {
      console.log( this.subscriber );
      if (this.isNewSubscriber) {
        this.subscribersService.addSubscribers(this.subscriber).subscribe( data => console.log(data) );
      }
      else {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showCancelButton: true,
          confirmButtonText: `Guardar`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Cambios guardados!', '', 'success')
            this.subscribersService.updateSubscriber(this.id, this.subscriber).subscribe( data => console.log(data) );
          }
        });

      }
    }
    else {
      Swal.fire({
       icon: 'warning',
       title: 'Formulario incompleto!!!',
       text: 'Recuerde que es necesario el nombre del subscriptor, el correo electrónico o en caso de no tenerlo, el país y el número de celular.'
     });
    }
  }

  deleteSubscription() {
    Swal.fire({
      title: '¿Eliminar subscriptor?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Se eliminó el subscriptor', '', 'info');
        this.subscribersService.deleteSubscriber(this.id).subscribe( data => console.log(data) );
        this.router.navigateByUrl(`subscribersLists`);
      }
    });
  }

}
