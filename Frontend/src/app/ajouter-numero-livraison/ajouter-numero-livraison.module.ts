import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterNumeroLivraisonPageRoutingModule } from './ajouter-numero-livraison-routing.module';

import { AjouterNumeroLivraisonPage } from './ajouter-numero-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjouterNumeroLivraisonPageRoutingModule
  ],
  declarations: [AjouterNumeroLivraisonPage]
})
export class AjouterNumeroLivraisonPageModule {}
