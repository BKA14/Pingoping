import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifTailleurPageRoutingModule } from './modif-tailleur-routing.module';

import { ModifTailleurPage } from './modif-tailleur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifTailleurPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifTailleurPage]
})
export class ModifTailleurPageModule {}
