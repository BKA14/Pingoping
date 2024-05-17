import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FastfoodPage } from './fastfood.page';

const routes: Routes = [
  {
    path: '',
    component: FastfoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastfoodPageRoutingModule {}
