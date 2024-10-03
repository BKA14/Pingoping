import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetCommandeUserPageRoutingModule } from './get-commande-user-routing.module';

import { GetCommandeUserPage } from './get-commande-user.page';
import { CustomFilterPipe } from './custom-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetCommandeUserPageRoutingModule
  ],
  declarations: [GetCommandeUserPage, CustomFilterPipe]
})
export class GetCommandeUserPageModule {}
