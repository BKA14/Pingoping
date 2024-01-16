import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifGenieCivilPageRoutingModule } from './modif-genie-civil-routing.module';

import { ModifGenieCivilPage } from './modif-genie-civil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifGenieCivilPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifGenieCivilPage]
})
export class ModifGenieCivilPageModule {}
