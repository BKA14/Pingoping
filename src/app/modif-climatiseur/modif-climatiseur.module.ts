import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifClimatiseurPageRoutingModule } from './modif-climatiseur-routing.module';

import { ModifClimatiseurPage } from './modif-climatiseur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifClimatiseurPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifClimatiseurPage]
})
export class ModifClimatiseurPageModule {}
