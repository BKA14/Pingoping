import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationPageRoutingModule } from './information-routing.module';

import { InformationPage } from './information.page';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [InformationPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InformationPageRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class InformationPageModule {}
