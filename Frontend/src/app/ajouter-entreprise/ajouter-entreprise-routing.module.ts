import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterEntreprisePage } from './ajouter-entreprise.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterEntreprisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterEntreprisePageRoutingModule {}
