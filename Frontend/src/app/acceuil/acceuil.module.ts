import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceuilPageRoutingModule } from './acceuil-routing.module';

import { AcceuilPage } from './acceuil.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceuilPageRoutingModule,
    HttpClientModule,

  ],
  declarations: [AcceuilPage]
})
export class AcceuilPageModule {}
