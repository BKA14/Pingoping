import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceuilPageRoutingModule } from './acceuil-routing.module';

import { AcceuilPage } from './acceuil.page';
import { HttpClientModule } from '@angular/common/http';
import { IonVideoPlayerModule } from 'ion-video-player';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceuilPageRoutingModule,
    HttpClientModule,
    IonVideoPlayerModule,

  ],
  declarations: [AcceuilPage]
})
export class AcceuilPageModule {}
