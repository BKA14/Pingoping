import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifFormationPage } from './modif-formation.page';

const routes: Routes = [
  {
    path: '',
    component: ModifFormationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifFormationPageRoutingModule {}
