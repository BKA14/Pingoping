import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatecouponPage } from './updatecoupon.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatecouponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatecouponPageRoutingModule {}
