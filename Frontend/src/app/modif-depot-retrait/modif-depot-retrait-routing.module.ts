import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifDepotRetraitPage } from './modif-depot-retrait.page';

const routes: Routes = [
  {
    path: '',
    component: ModifDepotRetraitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifDepotRetraitPageRoutingModule {}
