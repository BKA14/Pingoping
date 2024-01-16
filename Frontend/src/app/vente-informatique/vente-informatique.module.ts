import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenteInformatiquePageRoutingModule } from './vente-informatique-routing.module';

import { VenteInformatiquePage } from './vente-informatique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenteInformatiquePageRoutingModule
  ],
  declarations: [VenteInformatiquePage]
})
export class VenteInformatiquePageModule {}
