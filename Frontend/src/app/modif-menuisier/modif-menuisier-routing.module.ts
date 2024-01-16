import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifMenuisierPage } from './modif-menuisier.page';

const routes: Routes = [
  {
    path: '',
    component: ModifMenuisierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifMenuisierPageRoutingModule {}
