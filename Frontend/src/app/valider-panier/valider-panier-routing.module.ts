import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValiderPanierPage } from './valider-panier.page';

const routes: Routes = [
  {
    path: '',
    component: ValiderPanierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValiderPanierPageRoutingModule {}
