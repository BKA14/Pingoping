import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TailleurPage } from './tailleur.page';

const routes: Routes = [
  {
    path: '',
    component: TailleurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TailleurPageRoutingModule {}
