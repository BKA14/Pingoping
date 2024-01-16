import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifalimentationPageRoutingModule } from './modifalimentation-routing.module';

import { ModifalimentationPage } from './modifalimentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifalimentationPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModifalimentationPage]
})
export class ModifalimentationPageModule {}
