// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONETS
import { AppComponent } from './app.component';
import { AccountComponent } from './componets/account/account.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { SubscribersListComponent } from './componets/subscribers/subscribers-list/subscribers-list.component';
import { SubscribersUpdateComponent } from './componets/subscribers/subscribers-update/subscribers-update.component';
import { SubscriberComponent } from './componets/subscribers/subscriber/subscriber.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavbarComponent,
    SubscribersListComponent,
    SubscribersUpdateComponent,
    SubscriberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
