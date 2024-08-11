import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageAdminPage } from './message-admin.page';

const routes: Routes = [
  {
    path: '',
    component: MessageAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageAdminPageRoutingModule {}
