import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifArtistePageRoutingModule } from './modif-artiste-routing.module';

import { ModifArtistePage } from './modif-artiste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifArtistePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifArtistePage]
})
export class ModifArtistePageModule {}
