import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterNumeroPageRoutingModule } from './ajouter-numero-routing.module';

import { AjouterNumeroPage } from './ajouter-numero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterNumeroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AjouterNumeroPage]
})
export class AjouterNumeroPageModule {}
