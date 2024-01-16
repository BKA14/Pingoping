import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FestivalPageRoutingModule } from './festival-routing.module';

import { FestivalPage } from './festival.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FestivalPageRoutingModule
  ],
  declarations: [FestivalPage]
})
export class FestivalPageModule {}
