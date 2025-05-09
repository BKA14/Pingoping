import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [MenuPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MenuPageRoutingModule,
        SharedModule
    ]
})
export class MenuPageModule {}
