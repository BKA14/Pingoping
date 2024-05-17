import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifpmuPageRoutingModule } from './modifpmu-routing.module';

import { ModifpmuPage } from './modifpmu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifpmuPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifpmuPage]
})
export class ModifpmuPageModule {}
