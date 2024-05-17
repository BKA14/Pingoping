import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifMenuisierPageRoutingModule } from './modif-menuisier-routing.module';

import { ModifMenuisierPage } from './modif-menuisier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifMenuisierPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifMenuisierPage]
})
export class ModifMenuisierPageModule {}
