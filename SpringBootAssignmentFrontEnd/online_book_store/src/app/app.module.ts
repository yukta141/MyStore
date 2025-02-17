import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
// import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { BooksModule } from './books/books.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { CommonModule } from '@angular/common';
import { SeriesModule } from './series/series.module';



@NgModule({
  declarations: 
  [AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    BooksModule,
    FormsModule,
    UserModule,
    SharedModule,
    SuperAdminModule,
    SeriesModule,
    
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
