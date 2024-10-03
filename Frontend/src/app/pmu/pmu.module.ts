import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmuPageRoutingModule } from './pmu-routing.module';

import { PmuPage } from './pmu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmuPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [PmuPage]
})
export class PmuPageModule {}
