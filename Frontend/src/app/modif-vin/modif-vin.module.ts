import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifVinPageRoutingModule } from './modif-vin-routing.module';

import { ModifVinPage } from './modif-vin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifVinPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifVinPage]
})
export class ModifVinPageModule {}
