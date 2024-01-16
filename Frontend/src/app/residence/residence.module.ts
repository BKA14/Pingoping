import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResidencePageRoutingModule } from './residence-routing.module';

import { ResidencePage } from './residence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResidencePageRoutingModule
  ],
  declarations: [ResidencePage]
})
export class ResidencePageModule {}
