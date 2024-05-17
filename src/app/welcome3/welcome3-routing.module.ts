import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Welcome3Page } from './welcome3.page';

const routes: Routes = [
  {
    path: '',
    component: Welcome3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule],
})
export class Welcome3PageRoutingModule {}
