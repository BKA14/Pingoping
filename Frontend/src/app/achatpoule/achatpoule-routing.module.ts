import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchatpoulePage } from './achatpoule.page';

const routes: Routes = [
  {
    path: '',
    component: AchatpoulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchatpoulePageRoutingModule {}
