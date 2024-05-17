import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutcategoriePage } from './ajoutcategorie.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutcategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutcategoriePageRoutingModule {}
