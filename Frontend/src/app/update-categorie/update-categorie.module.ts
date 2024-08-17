import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCategoriePageRoutingModule } from './update-categorie-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateCategoriePage } from './update-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCategoriePageRoutingModule,
    ReactiveFormsModule,
   // Ng2SearchPipeModule
  ],
  declarations: [UpdateCategoriePage]
})
export class UpdateCategoriePageModule {}
