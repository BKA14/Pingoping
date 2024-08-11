import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AproposPageRoutingModule } from './apropos-routing.module';

import { AproposPage } from './apropos.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AproposPageRoutingModule,
    SharedModule
  ],
  declarations: [AproposPage]
})
export class AproposPageModule {}
