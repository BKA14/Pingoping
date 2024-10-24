import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginServiceReadyPage } from './login-service-ready.page';

const routes: Routes = [
  {
    path: '',
    component: LoginServiceReadyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginServiceReadyPageRoutingModule {}
