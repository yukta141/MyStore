import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSellerComponent } from './view-seller/view-seller.component';
import { SeeUsersComponent } from './see-users/see-users.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { ViewCouponsComponent } from './view-coupons/view-coupons.component';
import { ViewBooksComponent } from './view-books/view-books.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewSellersComponent } from './view-sellers/view-sellers.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { AdminRevenueComponent } from './admin-revenue/admin-revenue.component';

const routes: Routes = [
  {
    path: 'superadmin',
    component: ViewSellerComponent,
  },
  {
    path:'seeUsers',
    component:SeeUsersComponent
  },
  {
    path:'addcoupon',
    component:AddCouponsComponent
  },
  {
    path:'viewcoupons',
    component:ViewCouponsComponent
  },
  {
    path:'viewbooks',
    component:ViewBooksComponent
  },
  {
    path:'vieworders',
    component:ViewOrdersComponent
  },
  {
    path:'addcategory',
    component:AddCategoriesComponent
  },
  {
    path:'viewcategory',
    component:ViewCategoriesComponent
  },
  {
    path:'viewusers',
    component:ViewUserComponent
  },
  {
    path:'viewsellers',
    component:ViewSellersComponent
  },
  {
    path:'viewfeedbacks',
    component:ViewFeedbackComponent
  },
  {
    path:'viewAdminRevenue',
    component:AdminRevenueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
