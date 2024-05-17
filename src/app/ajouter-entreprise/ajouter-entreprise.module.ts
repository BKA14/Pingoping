import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjouterEntreprisePageRoutingModule } from './ajouter-entreprise-routing.module';

import { AjouterEntreprisePage } from './ajouter-entreprise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterEntreprisePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AjouterEntreprisePage]
})
export class AjouterEntreprisePageModule {}
