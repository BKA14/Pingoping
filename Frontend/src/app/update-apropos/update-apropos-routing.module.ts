import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAproposPage } from './update-apropos.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAproposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAproposPageRoutingModule {}
