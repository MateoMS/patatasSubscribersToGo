import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { AccountComponent } from './componets/account/account.component';
import { SubscriberComponent } from './componets/subscribers/subscriber/subscriber.component';
import { SubscribersListComponent } from './componets/subscribers/subscribers-list/subscribers-list.component';

// Guard
import { Guard } from './guard/guard';

const routes: Routes = [
  { path: 'login', component: AccountComponent },
  { path: 'subscribersList',
    canActivate: [ Guard ],
    component: SubscribersListComponent
  },
  { path: 'subscriber/:id',
    canActivate: [ Guard ],
    component: SubscriberComponent
  },
  { path: 'subscriber',
    canActivate: [ Guard ],
    component: SubscriberComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
