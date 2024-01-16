import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormationInformatiquePageRoutingModule } from './formation-informatique-routing.module';

import { FormationInformatiquePage } from './formation-informatique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormationInformatiquePageRoutingModule
  ],
  declarations: [FormationInformatiquePage]
})
export class FormationInformatiquePageModule {}
