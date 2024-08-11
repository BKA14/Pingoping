import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageUserPageRoutingModule } from './message-user-routing.module';

import { MessageUserPage } from './message-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageUserPageRoutingModule
  ],
  declarations: [MessageUserPage]
})
export class MessageUserPageModule {}
