import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailsComponent } from '../books/card-details/card-details.component';
import { OrdersComponent } from '../books/orders/orders.component';
import { MycartComponent } from '../books/mycart/mycart.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: 'showBookbyId/:id',
    component: CardDetailsComponent,
  },
  {
    path:"getorder",
    component:OrdersComponent
  },
  {
    path: 'getcart/:userId',
    component:MycartComponent
  },
  {
    path: 'series/:id',
    component: SeriesDetailComponent
  },
  {
    path:'getNotify/:userId',
    component:NotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesRoutingModule { }
