import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PieceMotoPage } from './piece-moto.page';

const routes: Routes = [
  {
    path: '',
    component: PieceMotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PieceMotoPageRoutingModule {}
