import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifTailleurPage } from './modif-tailleur.page';

const routes: Routes = [
  {
    path: '',
    component: ModifTailleurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifTailleurPageRoutingModule {}
