import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenieCivilPage } from './genie-civil.page';

const routes: Routes = [
  {
    path: '',
    component: GenieCivilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenieCivilPageRoutingModule {}
