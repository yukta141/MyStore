import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { AddBookComponent } from './add-book/add-book.component';
import { SharedModule } from '../shared/shared.module';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UserModule } from '../user/user.module';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { ViewCouponComponent } from './view-coupon/view-coupon.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SellerRevenueComponent } from './seller-revenue/seller-revenue.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminNavBarComponent,
    AdminSideBarComponent,
    AddBookComponent,
    ViewBookComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    UpdateBookComponent,
    UpdateCategoryComponent,
    ViewUsersComponent,
    ViewFeedbacksComponent,
    AddCouponComponent,
    ViewCouponComponent,
    ViewOrderComponent,
    SellerRevenueComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    UserModule,
    FormsModule
  ],
  exports: [
    AddBookComponent,
    AdminHomeComponent,
    AdminNavBarComponent,
    AdminSideBarComponent,
  ],
})
export class AdminModule {}
