import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeservicePage } from './timeservice.page';

const routes: Routes = [
  {
    path: '',
    component: TimeservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeservicePageRoutingModule {}
