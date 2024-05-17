import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifFestivalPageRoutingModule } from './modif-festival-routing.module';

import { ModifFestivalPage } from './modif-festival.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifFestivalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifFestivalPage]
})
export class ModifFestivalPageModule {}
