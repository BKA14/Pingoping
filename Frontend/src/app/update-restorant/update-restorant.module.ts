import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRestorantPageRoutingModule } from './update-restorant-routing.module';

import { UpdateRestorantPage } from './update-restorant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateRestorantPageRoutingModule
  ],
  declarations: [UpdateRestorantPage]
})
export class UpdateRestorantPageModule {}
