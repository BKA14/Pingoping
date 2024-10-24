import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestorantPageRoutingModule } from './restorant-routing.module';

import { RestorantPage } from './restaurant.page';
import { CustomFilterPipe } from './custom-filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestorantPageRoutingModule
  ],
  declarations: [RestorantPage, CustomFilterPipe]
})
export class RestorantPageModule {}
