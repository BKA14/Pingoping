import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifResidencePageRoutingModule } from './modif-residence-routing.module';

import { ModifResidencePage } from './modif-residence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifResidencePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifResidencePage]
})
export class ModifResidencePageModule {}
