import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertePageRoutingModule } from './alerte-routing.module';
import { CustomFilterPipe } from './custom-filter.pipe';

import { AlertePage } from './alerte.page';
import { WebSocketService } from '../websocket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertePageRoutingModule,
  ],
  declarations: [AlertePage, CustomFilterPipe],
  providers: [WebSocketService]
})
export class AlertePageModule {}
