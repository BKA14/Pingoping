import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenteInformatiquePage } from './vente-informatique.page';

const routes: Routes = [
  {
    path: '',
    component: VenteInformatiquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenteInformatiquePageRoutingModule {}
