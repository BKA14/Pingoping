import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlomberiePageRoutingModule } from './plomberie-routing.module';

import { PlomberiePage } from './plomberie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlomberiePageRoutingModule
  ],
  declarations: [PlomberiePage]
})
export class PlomberiePageModule {}
