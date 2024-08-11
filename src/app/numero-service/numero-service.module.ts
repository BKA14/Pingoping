import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumeroServicePageRoutingModule } from './numero-service-routing.module';

import { NumeroServicePage } from './numero-service.page';
import { CustomFilterPipe } from './custom-filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumeroServicePageRoutingModule
  ],
  declarations: [NumeroServicePage, CustomFilterPipe]
})
export class NumeroServicePageModule {}
