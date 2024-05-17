import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifPlomberiePageRoutingModule } from './modif-plomberie-routing.module';

import { ModifPlomberiePage } from './modif-plomberie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifPlomberiePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifPlomberiePage]
})
export class ModifPlomberiePageModule {}
