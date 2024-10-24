import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterNumeroLivraisonPage } from './ajouter-numero-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterNumeroLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterNumeroLivraisonPageRoutingModule {}
