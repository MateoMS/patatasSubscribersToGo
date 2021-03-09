import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  countryName: string = '';
  countryPhone: string = '';
  topics: Array<any>[] = [];
  id: number;
  isNewSubscriber: boolean = false;

  constructor( private subscribersService: SubscribersService,
               private activatedRoute: ActivatedRoute,
               private router: Router
             ) {

   }

  ngOnInit(): void {

    // se obtiene el id con el params
    this.id = this.activatedRoute.snapshot.params.id;
    // si no se encuentra el id, se esta creando un suscriptor, en caso contrario se esta actualizando uno
    if ( this.id === undefined ) {
      this.isNewSubscriber = true;
    }
    else {
      this.getSubscriber( this.id );
    }

  }

  // Añadira los topicos para luego utilizarlos
  addTopics(thopic: any) {

    this.topics.push(thopic.value);

  }

  changeTopic( i: number, val: any ) {

    this.topics[i] = val.target.value;

  }

  // Obtiene el nombre del país y el número de teléfono, los guarda y luego los
  // rescatara en la función donde se añadiran
  getCountryName(countryCode: string) {
    const country: Country | undefined = this.countries.find((c: Country) => c.code === countryCode);
    if (!country) {
        return;
    }

    this.countryName = country.name;
    this.countryPhone = country.dialCode;

  }

  getSubscriber( id: number ) {

    this.subscribersService.getSubscriber( id ).subscribe (
        (data: any) => {
          this.subscriber = data;

          if ( data['CountryCode'] != null ) {
            this.getCountryName( data['CountryCode'] );
          }

          this.topics = data['Topics'];
          console.log(data);
          return data;
        }
    );

  }
  // ******************************************
  // ******** Zona de los botones *************
  // ******************************************

  // Botón de retorno a la lista
  returnToList() {
    this.router.navigateByUrl('/subscribersList');
  }

  // El submit con NgForm por medio de template
  updateSubscriber( formSubscriber: NgForm ) {

    // En caso de que la informacion primordial no sea suministrada se avisara del error
    if( formSubscriber.invalid ) {
      Swal.fire({
       icon: 'warning',
       title: 'Formulario incompleto!!!',
       text: 'Recuerde que es necesario el nombre del subscriptor, el correo electrónico o en caso de no tenerlo, el país y el número de celular.'
     });
     return;
    }

    formSubscriber.value['Topics'] = []; // lo inicializo vacio

    if ( this.topics.length > 0 ) {
      formSubscriber.value['Topics'] = [];
      for ( let i=0; this.topics.length>i; i++ ) {
        if ( this.topics[i].length > 0 ){
          formSubscriber.value['Topics'].push(this.topics[i]);
        }
      }
    }

    // Se recupera el codigo de telefono del pais y el nombre del pais segun lo que eligieran el select
    // si no se selecciono ningún país se saltara este paso
    if ( this.countryName.length > 0 && this.countryPhone.length > 0 ) {
      formSubscriber.value['CountryName'] = this.countryName;
      formSubscriber.value['PhoneCode'] = this.countryPhone;
    }
    // el subscriber era porque me estaba enredando con los datos
    this.subscriber = formSubscriber.value;
    if ( formSubscriber.valid && this.subscriber['Name']!==undefined && ( this.subscriber['Email']!==undefined || (this.subscriber['CountryCode']!==undefined && this.subscriber['PhoneNumber']!==undefined) ) ) {

      // si el suscriptor no tiene un id entonces se nuevo y se esta creando, en caso contrario se actualizara
      if (this.isNewSubscriber) {
        this.subscribersService.addSubscribers(this.subscriber).subscribe( data => this.confirmationSwal() );
      }
      else {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showCancelButton: true,
          confirmButtonText: `Guardar`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Cambios guardados!', '', 'success')
            this.subscribersService.updateSubscriber(this.id, this.subscriber).subscribe( );
          }
        });

      }
    }

  }

  // Botón de eliminar con su respectiva confirmación
  deleteSubscription() {
    Swal.fire({
      title: '¿Eliminar subscriptor?',
      icon: 'warning',
      text: 'No se podra deshacer',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Se eliminó el subscriptor', '', 'success');
        this.subscribersService.deleteSubscriber(this.id).subscribe( /*data => console.log(data)*/ );
        this.router.navigateByUrl(`subscribersLists`);
      }
    });
  }


  // Un sweetalert para cuando se añada un nuevo subscriptor confirme en la parte superior y luego redirecciona a la lista
  confirmationSwal(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se guardo con exitó',
      showConfirmButton: false,
      timer: 2000
    })
    this.router.navigateByUrl(`subscribersLists`);
  }

}
