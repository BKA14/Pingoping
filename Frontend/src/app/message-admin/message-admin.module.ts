import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageAdminPageRoutingModule } from './message-admin-routing.module';

import { MessageAdminPage } from './message-admin.page';
import { CustomFilterPipe } from './custom-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageAdminPageRoutingModule
  ],
  declarations: [MessageAdminPage, CustomFilterPipe]
})
export class MessageAdminPageModule {}
