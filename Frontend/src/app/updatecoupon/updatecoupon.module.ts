import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatecouponPageRoutingModule } from './updatecoupon-routing.module';

import { UpdatecouponPage } from './updatecoupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatecouponPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatecouponPage]
})
export class UpdatecouponPageModule {}
