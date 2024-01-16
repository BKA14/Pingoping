import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModiffasfoodPageRoutingModule } from './modiffasfood-routing.module';

import { ModiffasfoodPage } from './modiffasfood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModiffasfoodPageRoutingModule
  ],
  declarations: [ModiffasfoodPage]
})
export class ModiffasfoodPageModule {}
