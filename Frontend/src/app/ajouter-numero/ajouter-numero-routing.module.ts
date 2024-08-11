import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterNumeroPage } from './ajouter-numero.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterNumeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterNumeroPageRoutingModule {}
