import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentairePageRoutingModule } from './commentaire-routing.module';

import { CommentairePage } from './commentaire.page';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentairePageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [CommentairePage]
})
export class CommentairePageModule {}
