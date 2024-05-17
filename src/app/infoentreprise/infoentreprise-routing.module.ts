import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoentreprisePage } from './infoentreprise.page';

const routes: Routes = [
  {
    path: '',
    component: InfoentreprisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoentreprisePageRoutingModule {}
