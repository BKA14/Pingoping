import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifiePasswordPage } from './verifie-password.page';

const routes: Routes = [
  {
    path: '',
    component: VerifiePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifiePasswordPageRoutingModule {}
