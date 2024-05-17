import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAproposPageRoutingModule } from './update-apropos-routing.module';

import { UpdateAproposPage } from './update-apropos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAproposPageRoutingModule
  ],
  declarations: [UpdateAproposPage]
})
export class UpdateAproposPageModule {}
