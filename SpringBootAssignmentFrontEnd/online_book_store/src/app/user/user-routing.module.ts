import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CardDetailsComponent } from '../books/card-details/card-details.component';
import { SeriesDetailComponent } from '../series/series-detail/series-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserGuard } from '../user.guard';

const routes: Routes = [
  {
    path: 'user',
    children: [
      // {
      //   path: 'category/:categoryName',
      //    component: CardsComponent
      // },
      // {
      //   path: 'carddetails/:productName',
      //   component: CardDetailsComponent
      // },
      
      {
        path: 'home',
        component: HomepageComponent,
      },
      {
        path: 'register/{UserRole}',
        component: UserregisterComponent,
      },
      {
        path: 'login',
        component: UserloginComponent,
      },
      {
        path:'setNewPassword',
        component:ChangePasswordComponent
      },
      {
        path:'conatact',
        component:ContactusComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate:[UserGuard]
      },
     
    ],
  },
  {
    path: 'showBookbyId/:id',
    component: CardDetailsComponent,
 
  },
  {
    path: 'series/:id',
    component: SeriesDetailComponent,
    // canActivate:[UserGuard]
  },
  {
    path:'getSeries',
    component:HomepageComponent,
    canActivate:[UserGuard]
  },
  {
    path:'updateProfile/:userId',
    component:UpdateProfileComponent,
    canActivate:[UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
