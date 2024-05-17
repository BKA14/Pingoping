import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifPlomberiePage } from './modif-plomberie.page';

const routes: Routes = [
  {
    path: '',
    component: ModifPlomberiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifPlomberiePageRoutingModule {}
