import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatepubPage } from './updatepub.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatepubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatepubPageRoutingModule {}
