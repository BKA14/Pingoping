import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifVenteInformatiquePageRoutingModule } from './modif-vente-informatique-routing.module';

import { ModifVenteInformatiquePage } from './modif-vente-informatique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifVenteInformatiquePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifVenteInformatiquePage]
})
export class ModifVenteInformatiquePageModule {}
