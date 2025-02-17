import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { HomepageComponent } from '../user/homepage/homepage.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { ViewCouponComponent } from './view-coupon/view-coupon.component';
import { AdminGuard } from '../admin.guard';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SellerRevenueComponent } from './seller-revenue/seller-revenue.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminHomeComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'insert',
    component: AddBookComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'details',
    component: ViewBookComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'insertCategory',
    component: AddCategoryComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'viewCategory',
    component: ViewCategoryComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'edit/:bookId',
    component: UpdateBookComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'editCategory/:id',
    component: UpdateCategoryComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'viewUsers',
    component: ViewUsersComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path:'viewfeedback',
    component:ViewFeedbacksComponent,
    canActivate:[AdminGuard]
  },
  {
    path:'addCoupon',
    component:AddCouponComponent,
    canActivate:[AdminGuard]
  },
  {
    path:'viewCoupon',
    component:ViewCouponComponent,
    canActivate:[AdminGuard]
  },
  {
    path:'vieworder',
    component:ViewOrderComponent
  },
  {
    path:'viewSellerRevenue',
    component:SellerRevenueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
