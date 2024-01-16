import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterpubPage } from './ajouterpub.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterpubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterpubPageRoutingModule {}
