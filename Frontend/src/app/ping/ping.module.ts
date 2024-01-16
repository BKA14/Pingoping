import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PingPageRoutingModule } from './ping-routing.module';

import { PingPage } from './ping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PingPageRoutingModule
  ],
  declarations: [PingPage]
})
export class PingPageModule {}
