import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValiderPanierPageRoutingModule } from './valider-panier-routing.module';

import { ValiderPanierPage } from './valider-panier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValiderPanierPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ValiderPanierPage]
})
export class ValiderPanierPageModule {}
