import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifalimentationPage } from './modifalimentation.page';

const routes: Routes = [
  {
    path: '',
    component: ModifalimentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifalimentationPageRoutingModule {}
