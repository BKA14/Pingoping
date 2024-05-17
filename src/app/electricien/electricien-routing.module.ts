import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricienPage } from './electricien.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricienPageRoutingModule {}
