import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { SharedModule } from "../shared/shared.module";
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    SeriesDetailComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    SharedModule
]
})
export class SeriesModule { }
