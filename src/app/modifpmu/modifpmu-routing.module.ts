import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifpmuPage } from './modifpmu.page';

const routes: Routes = [
  {
    path: '',
    component: ModifpmuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifpmuPageRoutingModule {}
