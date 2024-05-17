import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuisierPageRoutingModule } from './menuisier-routing.module';

import { MenuisierPage } from './menuisier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuisierPageRoutingModule
  ],
  declarations: [MenuisierPage]
})
export class MenuisierPageModule {}
