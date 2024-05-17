import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifTaxiPage } from './modif-taxi.page';

const routes: Routes = [
  {
    path: '',
    component: ModifTaxiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifTaxiPageRoutingModule {}
