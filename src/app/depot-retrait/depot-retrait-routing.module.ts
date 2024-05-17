import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepotRetraitPage } from './depot-retrait.page';

const routes: Routes = [
  {
    path: '',
    component: DepotRetraitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepotRetraitPageRoutingModule {}
