import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifElectricienPage } from './modif-electricien.page';

const routes: Routes = [
  {
    path: '',
    component: ModifElectricienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifElectricienPageRoutingModule {}
