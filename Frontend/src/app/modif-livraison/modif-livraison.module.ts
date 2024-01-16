import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifLivraisonPageRoutingModule } from './modif-livraison-routing.module';

import { ModifLivraisonPage } from './modif-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifLivraisonPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifLivraisonPage]
})
export class ModifLivraisonPageModule {}
