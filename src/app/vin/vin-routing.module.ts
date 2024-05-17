import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinPage } from './vin.page';

const routes: Routes = [
  {
    path: '',
    component: VinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VinPageRoutingModule {}
