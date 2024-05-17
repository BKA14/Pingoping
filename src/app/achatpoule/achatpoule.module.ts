import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchatpoulePageRoutingModule } from './achatpoule-routing.module';

import { AchatpoulePage } from './achatpoule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchatpoulePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AchatpoulePage]
})
export class AchatpoulePageModule {}
