import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifiePasswordPageRoutingModule } from './verifie-password-routing.module';

import { VerifiePasswordPage } from './verifie-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifiePasswordPageRoutingModule
  ],
  declarations: [VerifiePasswordPage]
})
export class VerifiePasswordPageModule {}
