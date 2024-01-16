import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeUserPageRoutingModule } from './liste-user-routing.module';

import { ListeUserPage } from './liste-user.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomFilterPipe } from './custom-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeUserPageRoutingModule,
  ],
  declarations: [ListeUserPage,CustomFilterPipe]
})
export class ListeUserPageModule {}
