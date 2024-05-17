import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenieCivilPageRoutingModule } from './genie-civil-routing.module';

import { GenieCivilPage } from './genie-civil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenieCivilPageRoutingModule
  ],
  declarations: [GenieCivilPage]
})
export class GenieCivilPageModule {}
