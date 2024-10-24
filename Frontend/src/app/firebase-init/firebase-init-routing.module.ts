import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirebaseInitPage } from './firebase-init.page';

const routes: Routes = [
  {
    path: '',
    component: FirebaseInitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirebaseInitPageRoutingModule {}
