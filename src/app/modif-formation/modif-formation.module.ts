import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifFormationPageRoutingModule } from './modif-formation-routing.module';

import { ModifFormationPage } from './modif-formation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifFormationPageRoutingModule,
     ReactiveFormsModule,
  ],
  declarations: [ModifFormationPage]
})
export class ModifFormationPageModule {}
