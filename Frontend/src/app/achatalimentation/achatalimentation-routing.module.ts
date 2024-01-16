import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchatalimentationPage } from './achatalimentation.page';

const routes: Routes = [
  {
    path: '',
    component: AchatalimentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchatalimentationPageRoutingModule {}
