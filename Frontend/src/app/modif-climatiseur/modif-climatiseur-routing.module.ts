import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifClimatiseurPage } from './modif-climatiseur.page';

const routes: Routes = [
  {
    path: '',
    component: ModifClimatiseurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifClimatiseurPageRoutingModule {}
