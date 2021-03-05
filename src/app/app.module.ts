// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
