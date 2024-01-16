import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifCoiffeurPageRoutingModule } from './modif-coiffeur-routing.module';

import { ModifCoiffeurPage } from './modif-coiffeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifCoiffeurPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifCoiffeurPage]
})
export class ModifCoiffeurPageModule {}
