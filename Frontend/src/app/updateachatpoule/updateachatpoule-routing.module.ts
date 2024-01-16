import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateachatpoulePage } from './updateachatpoule.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateachatpoulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateachatpoulePageRoutingModule {}
