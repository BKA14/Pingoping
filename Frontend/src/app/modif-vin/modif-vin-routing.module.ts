import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifVinPage } from './modif-vin.page';

const routes: Routes = [
  {
    path: '',
    component: ModifVinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifVinPageRoutingModule {}
