import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalementPage } from './signalement.page';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SignalementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalementPageRoutingModule {}
