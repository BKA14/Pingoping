import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistePage } from './artiste.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistePageRoutingModule {}
