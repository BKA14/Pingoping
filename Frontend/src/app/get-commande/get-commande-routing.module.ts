import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetCommandePage } from './get-commande.page';

const routes: Routes = [
  {
    path: '',
    component: GetCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetCommandePageRoutingModule {}
