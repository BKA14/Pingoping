import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IntersectionDirective } from './intersection.directive';


@NgModule({
  declarations: [AppComponent, IntersectionDirective],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [StatusBar,Network,
    SplashScreen,CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
