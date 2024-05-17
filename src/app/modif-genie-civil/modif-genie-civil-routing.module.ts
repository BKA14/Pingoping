import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifGenieCivilPage } from './modif-genie-civil.page';

const routes: Routes = [
  {
    path: '',
    component: ModifGenieCivilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifGenieCivilPageRoutingModule {}
