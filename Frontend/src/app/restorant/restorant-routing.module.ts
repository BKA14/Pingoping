import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestorantPage } from './restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: RestorantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestorantPageRoutingModule {}
