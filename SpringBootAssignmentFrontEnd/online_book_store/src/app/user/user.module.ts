import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserloginComponent } from './userlogin/userlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { SearchComponent } from './search/search.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [
    UserloginComponent,
    HomepageComponent,
    UserregisterComponent,
    SearchComponent,
    ChangePasswordComponent,
    ContactusComponent,
    ProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports:[
    HomepageComponent

  ]
})
export class UserModule {}
