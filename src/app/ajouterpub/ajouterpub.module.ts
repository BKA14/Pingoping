import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterpubPageRoutingModule } from './ajouterpub-routing.module';

import { AjouterpubPage } from './ajouterpub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjouterpubPageRoutingModule
  ],
  declarations: [AjouterpubPage]
})
export class AjouterpubPageModule {}
