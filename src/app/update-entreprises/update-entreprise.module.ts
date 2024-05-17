import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEntreprisePageRoutingModule } from './update-entreprise-routing.module';

import { UpdateEntreprisePage } from './update-entreprise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateEntreprisePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateEntreprisePage]
})
export class UpdateEntreprisePageModule {}
