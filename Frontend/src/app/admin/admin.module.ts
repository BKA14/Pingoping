import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AdminPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminPageRoutingModule,
        SharedModule,

    ]
})
export class AdminPageModule {}


