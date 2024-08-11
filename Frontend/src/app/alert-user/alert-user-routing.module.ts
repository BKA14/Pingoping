import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertUserPage } from './alert-user.page';

const routes: Routes = [
  {
    path: '',
    component: AlertUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertUserPageRoutingModule {}
