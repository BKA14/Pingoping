import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifGateauPage } from './modif-gateau.page';

const routes: Routes = [
  {
    path: '',
    component: ModifGateauPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifGateauPageRoutingModule {}
