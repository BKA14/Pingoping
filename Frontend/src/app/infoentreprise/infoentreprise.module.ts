import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoentreprisePageRoutingModule } from './infoentreprise-routing.module';

import { InfoentreprisePage } from './infoentreprise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoentreprisePageRoutingModule
  ],
  declarations: [InfoentreprisePage]
})
export class InfoentreprisePageModule {}
