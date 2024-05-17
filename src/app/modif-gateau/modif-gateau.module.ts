import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifGateauPageRoutingModule } from './modif-gateau-routing.module';

import { ModifGateauPage } from './modif-gateau.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifGateauPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifGateauPage]
})
export class ModifGateauPageModule {}
