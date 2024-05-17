import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { BackButtonService } from './services/back-button.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { PushNotifications } from '@capacitor/push-notifications';
import { AcceuilPage } from './acceuil/acceuil.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage: any = AcceuilPage;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backButtonService: BackButtonService,
    private network: Network,
    public alertController: AlertController
  ) {
    this.initializeApp();

    window.addEventListener('online', () => {
      this.openAlert1();
    });
    window.addEventListener('offline', () => {
      this.openAlert();
    });

  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur réseau',
      message: 'Il semble que vous ne soyez pas connecté à internet, vérifiez votre connexion !',
      buttons: [{
        text: "OK",
        role: 'confirm',
      }]
    });

    await alert.present();
  }

  async openAlert1() {
    // Vous pouvez implémenter cette méthode si nécessaire
  }



  async initializeApp() {
    this.platform.ready().then(async () => {
      // Attendre que la plateforme soit prête
      await this.platform.ready();

      // Masquer le splash screen une fois que la plateforme est prête
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Initialiser d'autres fonctionnalités de votre application après la fin du splash screen
      this.backButtonService.init();
    });
  }



}
