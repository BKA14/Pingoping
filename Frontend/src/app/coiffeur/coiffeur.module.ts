import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoiffeurPageRoutingModule } from './coiffeur-routing.module';

import { CoiffeurPage } from './coiffeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoiffeurPageRoutingModule
  ],
  declarations: [CoiffeurPage]
})
export class CoiffeurPageModule {}
