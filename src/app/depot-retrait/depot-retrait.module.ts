import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotRetraitPageRoutingModule } from './depot-retrait-routing.module';

import { DepotRetraitPage } from './depot-retrait.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepotRetraitPageRoutingModule
  ],
  declarations: [DepotRetraitPage]
})
export class DepotRetraitPageModule {}
