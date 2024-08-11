import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNumeroPageRoutingModule } from './update-numero-routing.module';

import { UpdateNumeroPage } from './update-numero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateNumeroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateNumeroPage]
})
export class UpdateNumeroPageModule {}
