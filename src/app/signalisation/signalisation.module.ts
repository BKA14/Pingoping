import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalisationPageRoutingModule } from './signalisation-routing.module';

import { SignalisationPage } from './signalisation.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignalisationPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [SignalisationPage]
})
export class SignalisationPageModule {}
