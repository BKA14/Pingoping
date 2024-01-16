import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GateauPageRoutingModule } from './gateau-routing.module';

import { GateauPage } from './gateau.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GateauPageRoutingModule
  ],
  declarations: [GateauPage]
})
export class GateauPageModule {}
