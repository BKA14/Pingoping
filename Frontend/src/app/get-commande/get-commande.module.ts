import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetCommandePageRoutingModule } from './get-commande-routing.module';

import { GetCommandePage } from './get-commande.page';
import { CustomFilterPipe } from './custom-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetCommandePageRoutingModule
  ],
  declarations: [GetCommandePage, CustomFilterPipe]
})
export class GetCommandePageModule {}
