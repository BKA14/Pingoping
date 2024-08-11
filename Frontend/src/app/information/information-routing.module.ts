import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationPage } from './information.page';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: InformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class InformationPageRoutingModule {}
