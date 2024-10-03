import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetCommandeUserPage } from './get-commande-user.page';

const routes: Routes = [
  {
    path: '',
    component: GetCommandeUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetCommandeUserPageRoutingModule {}
