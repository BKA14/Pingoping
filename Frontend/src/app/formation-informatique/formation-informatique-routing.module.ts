import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormationInformatiquePage } from './formation-informatique.page';

const routes: Routes = [
  {
    path: '',
    component: FormationInformatiquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormationInformatiquePageRoutingModule {}
