import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmuPageRoutingModule } from './pmu-routing.module';

import { PmuPage } from './pmu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmuPageRoutingModule
  ],
  declarations: [PmuPage]
})
export class PmuPageModule {}
