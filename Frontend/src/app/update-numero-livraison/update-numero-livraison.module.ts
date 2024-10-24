import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNumeroLivraisonPageRoutingModule } from './update-numero-livraison-routing.module';

import { UpdateNumeroLivraisonPage } from './update-numero-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateNumeroLivraisonPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateNumeroLivraisonPage]
})
export class UpdateNumeroLivraisonPageModule {}
