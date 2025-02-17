import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { CardsComponent } from './cards/cards.component';
import { SharedModule } from '../shared/shared.module';
import { CardDetailsComponent } from './card-details/card-details.component';
import { OrdersComponent } from './orders/orders.component';
import { MycartComponent } from './mycart/mycart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [CardsComponent, CardDetailsComponent, OrdersComponent, MycartComponent, WishlistComponent, FeedbackComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [CardsComponent],
})
export class BooksModule {}
