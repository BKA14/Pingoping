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
import { WebSocketService } from './websocket.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



@NgModule({
  declarations: [AppComponent, IntersectionDirective],
  imports: [
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [StatusBar,Network,
    SplashScreen,CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, WebSocketService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Enregistrement du service worker pour Firebase Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
