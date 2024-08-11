import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageUserPage } from './message-user.page';

const routes: Routes = [
  {
    path: '',
    component: MessageUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageUserPageRoutingModule {}
