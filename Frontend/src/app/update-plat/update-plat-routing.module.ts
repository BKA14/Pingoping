import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePlatPage } from './update-plat.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePlatPageRoutingModule {}
