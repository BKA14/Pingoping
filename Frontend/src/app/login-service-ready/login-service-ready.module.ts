import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginServiceReadyPageRoutingModule } from './login-service-ready-routing.module';

import { LoginServiceReadyPage } from './login-service-ready.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginServiceReadyPageRoutingModule
  ],
  declarations: [LoginServiceReadyPage]
})
export class LoginServiceReadyPageModule {}
