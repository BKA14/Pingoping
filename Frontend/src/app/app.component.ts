import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomePage } from './welcome/welcome.page';
import { BackButtonService } from './services/back-button.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage:any=WelcomePage;
  navCtrl: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backButtonService: BackButtonService,
    private network : Network,
    private router: Router,
    public alertController: AlertController
  ) {
    window.addEventListener('online', () => {
      this.openAlert1();
     } )
    window.addEventListener('offline', () => {
      this.openAlert();
     } )
    this.initializeApp();
   
  }
     async openAlert(){
   const alert = await this.alertController.create({
header: 'erreur reseau',
message: 'pas de connexion internet ! ',
buttons: [{
  text:"ok",
  role: 'confirm',
  handler: () => {
    //navigator['app'].exit.App();
    this.router.navigateByUrl('/welcome2');
  }
}]
   });

await alert.present();
     }
  
     async openAlert1(){
      const alert = await this.alertController.create({
  
      });
        }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backButtonService.init();
      
       });
  }

}
