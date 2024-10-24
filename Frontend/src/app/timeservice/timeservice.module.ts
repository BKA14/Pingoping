import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeservicePageRoutingModule } from './timeservice-routing.module';

import { TimeservicePage } from './timeservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeservicePageRoutingModule
  ],
  declarations: [TimeservicePage]
})
export class TimeservicePageModule {}
