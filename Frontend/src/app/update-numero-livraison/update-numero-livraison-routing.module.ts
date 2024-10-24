import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNumeroLivraisonPage } from './update-numero-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateNumeroLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateNumeroLivraisonPageRoutingModule {}
