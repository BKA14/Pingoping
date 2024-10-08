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
        message: 'Rechargement',
        spinner: 'lines',
        cssClass: 'custom-loading',
      });

      await loading.present();


      // Appliquer le style de la barre de statut noire translucide
      this.statusBar.show();
      this.backButtonService.init();

      try {
        // Vérification de la plateforme pour éviter les problèmes sur le web
        if (Capacitor.getPlatform() !== 'web') {
          this.LoginServiceReadyService.isLoginPageReady$.pipe(
            take(1),  // Prendre la première valeur
            timeout(10000),  // Timeout après 10 secondes
            catchError((err) => {
              console.error('Erreur ou timeout pendant la préparation de la page de login:', err);
              return of(false);  // Retourne 'false' en cas de problème
            }),
            finalize(() => {
              loading.dismiss();  // Masquer le loading dans tous les cas
            })
          ).subscribe({
            next: (isReady) => {
              // Délai de 2 secondes avant de masquer le splash screen
              if (isReady) {
                setTimeout(() => this.hideSplashScreen(), 3000); // Délai avant masquage
              } else {
                console.warn("La page de login n'a pas été prête dans le délai imparti.");
                setTimeout(() => this.hideSplashScreen(), 4500);  // On masque le splash malgré tout
              }
            }
          });
        } else {
          // Masquer le loading si l'on est sur le web
          await loading.dismiss();
          await this.hideSplashScreen(); // Masquer le splash screen pour le web
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'application :', error);
        await loading.dismiss();  // Assurez-vous que le loading est masqué en cas d'erreur
      }
    });
  }


  // Masquer le splash screen avec gestion des erreurs
  async hideSplashScreen() {
    try {
      await SplashScreen.hide();
    } catch (error) {
      console.error('Erreur lors du masquage du splash screen :', error);
    }
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
