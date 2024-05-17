import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifArtistePage } from './modif-artiste.page';

const routes: Routes = [
  {
    path: '',
    component: ModifArtistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifArtistePageRoutingModule {}
