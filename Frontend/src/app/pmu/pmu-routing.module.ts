import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmuPage } from './pmu.page';

const routes: Routes = [
  {
    path: '',
    component: PmuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmuPageRoutingModule {}
