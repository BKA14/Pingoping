import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatepubPageRoutingModule } from './updatepub-routing.module';

import { UpdatepubPage } from './updatepub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdatepubPageRoutingModule
  ],
  declarations: [UpdatepubPage]
})
export class UpdatepubPageModule {}
