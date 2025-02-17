import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { ViewSellerComponent } from './view-seller/view-seller.component';
import { SuperAdminNavComponent } from './super-admin-nav/super-admin-nav.component';
import { SharedModule } from "../shared/shared.module";
import { TopSalesComponent } from './top-sales/top-sales.component';
import { SeeUsersComponent } from './see-users/see-users.component';
import { SuperAdminSideBarComponent } from './super-admin-side-bar/super-admin-side-bar.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCouponsComponent } from './view-coupons/view-coupons.component';
import { ViewBooksComponent } from './view-books/view-books.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewSellersComponent } from './view-sellers/view-sellers.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { AdminRevenueComponent } from './admin-revenue/admin-revenue.component';
import { RevenuechartComponent } from './revenuechart/revenuechart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';




@NgModule({
  declarations: [
    ViewSellerComponent,
    SuperAdminNavComponent,
    TopSalesComponent,
    SeeUsersComponent,
    SuperAdminSideBarComponent,
    AddCouponsComponent,
    ViewCouponsComponent,
    ViewBooksComponent,
    ViewOrdersComponent,
    AddCategoriesComponent,
    ViewCategoriesComponent,
    ViewUserComponent,
    ViewSellersComponent,
    ViewFeedbackComponent,
    AdminRevenueComponent,
    RevenuechartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
   
]
})
export class SuperAdminModule { }
