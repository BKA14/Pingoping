import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPlatPageRoutingModule } from './list-plat-routing.module';

import { ListPlatPage } from './list-plat.page';
import { CustomFilterPipe } from './custom-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPlatPageRoutingModule
  ],
  declarations: [ListPlatPage, CustomFilterPipe]
})
export class ListPlatPageModule {}
