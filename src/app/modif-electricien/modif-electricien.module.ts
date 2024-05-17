import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifElectricienPageRoutingModule } from './modif-electricien-routing.module';

import { ModifElectricienPage } from './modif-electricien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifElectricienPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifElectricienPage]
})
export class ModifElectricienPageModule {}
