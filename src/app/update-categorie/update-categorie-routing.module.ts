import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCategoriePage } from './update-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCategoriePageRoutingModule {}
