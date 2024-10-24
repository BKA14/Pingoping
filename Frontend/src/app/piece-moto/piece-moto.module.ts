import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PieceMotoPageRoutingModule } from './piece-moto-routing.module';

import { PieceMotoPage } from './piece-moto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PieceMotoPageRoutingModule
  ],
  declarations: [PieceMotoPage]
})
export class PieceMotoPageModule {}
