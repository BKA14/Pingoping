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
import { catchError, finalize, take, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

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

  ngOnInit() {
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
    await this.platform.ready();

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.statusBar.show();
    this.statusBar.backgroundColorByHexString('#80000000');
    this.backButtonService.init();

    try {
      if (Capacitor.getPlatform() !== 'web') {
        this.LoginServiceReadyService.isLoginPageReady$.pipe(
          take(1),
          timeout(10000),
          catchError((err) => {
            console.error('Erreur ou timeout pendant la préparation de la page de login:', err);
            return of(false);
          }),
          finalize(() => {
            loading.dismiss();
          })
        ).subscribe({
          next: (isReady) => {
            if (isReady) {
              setTimeout(() => this.hideSplashScreen(), 3000);
            } else {
              console.warn("La page de login n'a pas été prête dans le délai imparti.");
              setTimeout(() => this.hideSplashScreen(), 4500);
            }
          }
        });
      } else {
        await loading.dismiss();
        await this.hideSplashScreen();
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'application :', error);
      await loading.dismiss();
    }
  }

  async hideSplashScreen() {
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      try {
        await SplashScreen.hide();
      } catch (error) {
        console.error('Erreur lors du masquage du splash screen :', error);
      }
    }
  }

  lekeyboard() {
    if (Capacitor.isPluginAvailable('Keyboard')) {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (info: { keyboardHeight: number }) => {
        this.adjustContentForKeyboard(info.keyboardHeight);
      });

      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
        this.resetContentPosition();
      });
    }
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.keyboardWillShowListener) {
      this.keyboardWillShowListener.remove();
    }
    if (this.keyboardWillHideListener) {
      this.keyboardWillHideListener.remove();
    }

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
