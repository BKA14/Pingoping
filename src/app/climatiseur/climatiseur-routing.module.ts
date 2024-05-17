import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClimatiseurPage } from './climatiseur.page';

const routes: Routes = [
  {
    path: '',
    component: ClimatiseurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClimatiseurPageRoutingModule {}
