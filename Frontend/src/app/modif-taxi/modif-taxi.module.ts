import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifTaxiPageRoutingModule } from './modif-taxi-routing.module';

import { ModifTaxiPage } from './modif-taxi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifTaxiPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifTaxiPage]
})
export class ModifTaxiPageModule {}
