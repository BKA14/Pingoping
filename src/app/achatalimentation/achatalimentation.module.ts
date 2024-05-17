import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchatalimentationPageRoutingModule } from './achatalimentation-routing.module';

import { AchatalimentationPage } from './achatalimentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchatalimentationPageRoutingModule
  ],
  declarations: [AchatalimentationPage]
})
export class AchatalimentationPageModule {}
