import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriePageRoutingModule } from './categorie-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoriePage } from './categorie.page';
import { CustomFilterPipe } from './custom-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriePageRoutingModule,
  ],
  declarations: [CategoriePage,CustomFilterPipe]
})
export class CategoriePageModule {}
