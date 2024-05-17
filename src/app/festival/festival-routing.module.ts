import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FestivalPage } from './festival.page';

const routes: Routes = [
  {
    path: '',
    component: FestivalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FestivalPageRoutingModule {}
