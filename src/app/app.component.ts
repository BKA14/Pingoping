import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { BackButtonService } from './services/back-button.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AcceuilPage } from './acceuil/acceuil.page';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { authService } from './services/auth.service';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  rootPage: any = AcceuilPage;
  private keyboardWillShowListener: any;
  private keyboardWillHideListener: any;
  updateSubscription: Subscription;
  userData: any;
  tokenRefreshTimeout: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backButtonService: BackButtonService,
    private network: Network,
    public alertController: AlertController,
    private router: Router,
    private authService: authService,

  ) {
    this.initializeApp();

    window.addEventListener('online', () => {
      this.openAlert1();
    });
    window.addEventListener('offline', () => {
      this.openAlert();
    });

    this.lekeyboard();
  }


  ngOnInit(): void {
    // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });

    // Démarrer le rafraîchissement périodique du token
   // this.startTokenRefresh();
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
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backButtonService.init();
    });
  }

  lekeyboard(){
    if (Capacitor.isPluginAvailable('Keyboard')) {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (info: { keyboardHeight: number }) => {
        this.adjustContentForKeyboard(info.keyboardHeight);
      });

      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
        this.resetContentPosition();
      });
    }
  }
  ngAfterViewInit() {
    if (Capacitor.isPluginAvailable('Keyboard')) {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (info: { keyboardHeight: number }) => {
        this.adjustContentForKeyboard(info.keyboardHeight);
      });

      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
        this.resetContentPosition();
      });
    }
  }

  ngOnDestroy() {
    if (this.keyboardWillShowListener) {
      this.keyboardWillShowListener.remove();
    }
    if (this.keyboardWillHideListener) {
      this.keyboardWillHideListener.remove();
    }

       // Nettoyer le timeout lorsqu'on quitte le composant
       if (this.tokenRefreshTimeout) {
        clearTimeout(this.tokenRefreshTimeout);
      }
  }

  adjustContentForKeyboard(keyboardHeight: number) {
    document.body.style.paddingBottom = `${keyboardHeight}px`;
  }

  resetContentPosition() {
    document.body.style.paddingBottom = '0px';
  }

}
