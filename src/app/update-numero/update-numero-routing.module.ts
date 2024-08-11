import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNumeroPage } from './update-numero.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateNumeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateNumeroPageRoutingModule {}
