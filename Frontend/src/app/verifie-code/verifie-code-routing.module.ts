import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifieCodePage } from './verifie-code.page';

const routes: Routes = [
  {
    path: '',
    component: VerifieCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifieCodePageRoutingModule {}
