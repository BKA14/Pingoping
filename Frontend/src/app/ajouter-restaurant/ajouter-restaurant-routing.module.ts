import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterRestaurantPage } from './ajouter-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterRestaurantPageRoutingModule {}
