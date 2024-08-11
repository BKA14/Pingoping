import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertUserPageRoutingModule } from './alert-user-routing.module';

import { AlertUserPage } from './alert-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertUserPageRoutingModule
  ],
  declarations: [AlertUserPage]
})
export class AlertUserPageModule {}
