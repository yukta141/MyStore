import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { Book } from '../model/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { BookService } from '../service/book.service';
import Swal from 'sweetalert2';
import { CardDetailsComponent } from './card-details/card-details.component';
import { OrdersComponent } from './orders/orders.component';
import { MycartComponent } from './mycart/mycart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserGuard } from '../user.guard';

const routes: Routes = [
  {
    path: 'getcards/:category',
    component: CardsComponent,
  },
  {
    path: 'showBookbyId/:id',
    component: CardDetailsComponent,
  },
  {
    path:"getorder",
    component:OrdersComponent,
    canActivate:[UserGuard]
  },
  {
    path: 'getcart/:userId',
    component:MycartComponent,
    canActivate:[UserGuard]
  },
  {
    path:'wishlist/:userId',
    component:WishlistComponent,
    canActivate:[UserGuard]
  },
  {
    path:"feedback",
    component:FeedbackComponent,
    canActivate:[UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
