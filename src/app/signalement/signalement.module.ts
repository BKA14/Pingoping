import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalementPageRoutingModule } from './signalement-routing.module';

import { SignalementPage } from './signalement.page';
import { CustomFilterPipe } from './custom-filter.pipe';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [SignalementPage, CustomFilterPipe],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SignalementPageRoutingModule,
        SharedModule
    ]
})

export class SignalementPageModule {}
