import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './user/homepage/homepage.component';
import { UserregisterComponent } from './user/userregister/userregister.component';
import { SearchComponent } from './user/search/search.component';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'search/:query',
    component: SearchComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'register',
    component: UserregisterComponent,
  },
  {
    path: 'login',
    component: UserloginComponent,
  },
  {
    path: 'setNewPassword',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
