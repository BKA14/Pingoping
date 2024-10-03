import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPlatPage } from './list-plat.page';

const routes: Routes = [
  {
    path: '',
    component: ListPlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPlatPageRoutingModule {}
