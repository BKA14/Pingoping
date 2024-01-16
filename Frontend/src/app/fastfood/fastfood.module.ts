import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FastfoodPageRoutingModule } from './fastfood-routing.module';

import { FastfoodPage } from './fastfood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FastfoodPageRoutingModule
  ],
  declarations: [FastfoodPage]
})
export class FastfoodPageModule {}
