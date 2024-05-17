import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateachatpoulePageRoutingModule } from './updateachatpoule-routing.module';

import { UpdateachatpoulePage } from './updateachatpoule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateachatpoulePageRoutingModule
  ],
  declarations: [UpdateachatpoulePage]
})
export class UpdateachatpoulePageModule {}
