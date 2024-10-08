import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WelcomePageRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomFilterPipe } from './custom-filter.pipe';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    HttpClientModule,
    SharedModule

  ],
  declarations: [WelcomePage,CustomFilterPipe]
})
export class WelcomePageModule {}
