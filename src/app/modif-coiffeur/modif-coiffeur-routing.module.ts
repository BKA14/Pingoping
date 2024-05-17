import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifCoiffeurPage } from './modif-coiffeur.page';

const routes: Routes = [
  {
    path: '',
    component: ModifCoiffeurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifCoiffeurPageRoutingModule {}
