import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { BackButtonService } from './services/back-button.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AcceuilPage } from './acceuil/acceuil.page';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { LoginServiceReadyService } from './login-service-ready.service';
import { FirebaseService } from './firebase-init.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  rootPage: any = AcceuilPage;
  private keyboardWillShowListener: any;
  private keyboardWillHideListener: any;
  tokenRefreshTimeout: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private backButtonService: BackButtonService,
    private network: Network,
    public alertController: AlertController,
    private router: Router,
    private LoginServiceReadyService: LoginServiceReadyService,
    private loadingCtrl: LoadingController,
    private FirebaseService: FirebaseService

  )
  {
    this.initializeApp();

    window.addEventListener('online', () => {
      this.openAlert1();
    });
    window.addEventListener('offline', () => {
      this.openAlert();
    });

    this.lekeyboard();
  }

  ngOnInit()  {
     this.FirebaseService.initFirebaseMessaging();
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
      // Présenter le loading dès que la plateforme est prête
      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        spinner: 'lines',
        cssClass: 'custom-loading',
      });

      await loading.present();

      this.statusBar.styleDefault();
      this.backButtonService.init();

      if (Capacitor.isNativePlatform()) {
      this.LoginServiceReadyService.isLoginPageReady$.subscribe(isReady => {
        if (isReady) {
          this.hideSplashScreen();
          loading.dismiss(); // Masquer le loading lorsque la page de login est prête
        }
      });
    } else {
      loading.dismiss();
    }
    });

  }


  async hideSplashScreen() {

    await SplashScreen.hide();
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

  }

  ngOnDestroy() {
    if (this.keyboardWillShowListener) {
      this.keyboardWillShowListener.remove();
    }
    if (this.keyboardWillHideListener) {
      this.keyboardWillHideListener.remove();
    }

    // Clean up the timeout when leaving the component
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
