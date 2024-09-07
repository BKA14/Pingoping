import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifieCodePageRoutingModule } from './verifie-code-routing.module';

import { VerifieCodePage } from './verifie-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifieCodePageRoutingModule
  ],
  declarations: [VerifieCodePage]
})
export class VerifieCodePageModule {}
