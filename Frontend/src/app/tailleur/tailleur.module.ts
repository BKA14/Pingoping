import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TailleurPageRoutingModule } from './tailleur-routing.module';

import { TailleurPage } from './tailleur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TailleurPageRoutingModule
  ],
  declarations: [TailleurPage]
})
export class TailleurPageModule {}
