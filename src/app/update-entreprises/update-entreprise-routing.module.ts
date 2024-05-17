import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateEntreprisePage } from './update-entreprise.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateEntreprisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateEntreprisePageRoutingModule {}
