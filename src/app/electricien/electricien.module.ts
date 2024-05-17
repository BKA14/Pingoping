import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricienPageRoutingModule } from './electricien-routing.module';

import { ElectricienPage } from './electricien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectricienPageRoutingModule
  ],
  declarations: [ElectricienPage]
})
export class ElectricienPageModule {}
