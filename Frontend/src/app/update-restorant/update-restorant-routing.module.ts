import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRestorantPage } from './update-restorant.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRestorantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRestorantPageRoutingModule {}
