import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//Services
import { SubscribersService } from 'src/app/services/subscribers.service';

//Models
import { SubscribersListModel } from 'src/app/models/subscribersList.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribers-list',
  templateUrl: './subscribers-list.component.html',
  styleUrls: ['./subscribers-list.component.css']
})
export class SubscribersListComponent implements OnInit {

  subscribersList: SubscribersListModel = new SubscribersListModel;

  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Area', 'Options'];
  dataSource: MatTableDataSource<SubscribersListModel>;

  constructor( private subscribersService: SubscribersService,
    private router: Router ) { }

  ngOnInit(): void {
    this.getSubscribersList();
  }

  //Funciones necesarias para el mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // se rescata la informacion que se mostrara la tabla
  dataS(data) {

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  // se obtiene la informacion de la base de datos
  getSubscribersList() {

    this.subscribersService.getSubscribersList().subscribe (
        data => {
          this.subscribersList.Count = data['Count'];
          this.subscribersList.Data = data['Data'];
          this.dataS(this.subscribersList.Data);
          return data;
        }
    );

  }

  // se redirecciona a la pagina de actualizar subscriptor
  updateSubscribers( id: number ) {

    this.router.navigateByUrl(`subscriber/${ id }`);

  }




}
