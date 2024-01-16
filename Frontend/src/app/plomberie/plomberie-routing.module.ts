import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlomberiePage } from './plomberie.page';

const routes: Routes = [
  {
    path: '',
    component: PlomberiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlomberiePageRoutingModule {}
