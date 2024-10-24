import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirebaseInitPageRoutingModule } from './firebase-init-routing.module';

import { FirebaseInitPage } from './firebase-init.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebaseInitPageRoutingModule
  ],
  declarations: [FirebaseInitPage]
})
export class FirebaseInitPageModule {}
