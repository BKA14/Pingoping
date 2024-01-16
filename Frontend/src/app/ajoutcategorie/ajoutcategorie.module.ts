import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AjoutcategoriePageRoutingModule } from './ajoutcategorie-routing.module';

import { AjoutcategoriePage } from './ajoutcategorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjoutcategoriePageRoutingModule
  ],
  declarations: [AjoutcategoriePage]
})
export class AjoutcategoriePageModule {}
