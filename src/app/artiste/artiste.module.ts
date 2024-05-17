import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistePageRoutingModule } from './artiste-routing.module';

import { ArtistePage } from './artiste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistePageRoutingModule
  ],
  declarations: [ArtistePage]
})
export class ArtistePageModule {}
