import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifDepotRetraitPageRoutingModule } from './modif-depot-retrait-routing.module';

import { ModifDepotRetraitPage } from './modif-depot-retrait.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifDepotRetraitPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifDepotRetraitPage]
})
export class ModifDepotRetraitPageModule {}
