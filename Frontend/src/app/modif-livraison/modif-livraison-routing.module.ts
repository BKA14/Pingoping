import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifLivraisonPage } from './modif-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: ModifLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifLivraisonPageRoutingModule {}
