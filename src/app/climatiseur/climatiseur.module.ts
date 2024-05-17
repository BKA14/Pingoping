import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClimatiseurPageRoutingModule } from './climatiseur-routing.module';

import { ClimatiseurPage } from './climatiseur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClimatiseurPageRoutingModule
  ],
  declarations: [ClimatiseurPage]
})
export class ClimatiseurPageModule {}
