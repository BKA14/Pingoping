import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifResidencePage } from './modif-residence.page';

const routes: Routes = [
  {
    path: '',
    component: ModifResidencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifResidencePageRoutingModule {}
