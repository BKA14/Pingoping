import { App } from '@capacitor/app';
import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Platform, AlertController, LoadingController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AcceuilPage } from './acceuil/acceuil.page';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { LoginServiceReadyService } from './login-service-ready.service';
import { FirebaseService } from './firebase-init.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { catchError, finalize, take, timeout } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild(IonRouterOutlet) outlet;

  rootPage: any = AcceuilPage;
  private keyboardWillShowListener: any;
  private keyboardWillHideListener: any;
  tokenRefreshTimeout: any;

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private network: Network,
    private LoginServiceReadyService: LoginServiceReadyService,
    private FirebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.initializeApp();
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({ color: '#1C1C1C' });
    this.setupKeyboardListeners();
  }


  ngOnInit() {
    this.FirebaseService.initFirebaseMessaging();
    this.notificationService.initializePushNotifications();
    this.setupNetworkListeners();
    this.backbutton();
  }


  private isBackAlertPresented = false;

  backbutton() {
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      if (this.isBackAlertPresented) return;

      const currentUrl = this.router.url;
      const needsConfirmation = ['/acceuil', '/welcome', '/notifications', '/login2'].some(page => currentUrl.includes(page));

      // Si la page nécessite une confirmation
      if (needsConfirmation) {
        this.isBackAlertPresented = true;

        const alert = await this.alertController.create({
          header: 'Confirmer',
          message: '😢 Voulez-vous vraiment quitter l\'application ?',  // Ajout de l'emoji triste
          buttons: [
            {
              text: 'Non',
              role: 'cancel',
              handler: () => {
                this.isBackAlertPresented = false; // Permet de réafficher l'alerte plus tard
              }
            },
            {
              text: 'Oui',
              handler: () => {
                this.isBackAlertPresented = false;
                App.exitApp();
              }
            }
          ]
        });


        await alert.present();
        return; // Arrête ici pour éviter le retour arrière
      }

      // Si la page ne nécessite pas de confirmation, faire un retour en arrière normal
      if (this.outlet?.canGoBack()) {
        this.outlet.pop();
      }
    });
  }


  async ngAfterViewInit() {
    // Code supplémentaire après le chargement de la vue
  }


  private isNetworkAlertPresented = false;

  async openAlert() {
    if (this.isNetworkAlertPresented) return;

    this.isNetworkAlertPresented = true;

    const alert = await this.alertController.create({
      header: 'Erreur réseau',
      message: 'Il semble que vous ne soyez pas connecté à internet, vérifiez votre connexion !',
      buttons: [{
        text: "OK",
        role: 'confirm',
        handler: () => {
          this.isNetworkAlertPresented = false; // Réinitialiser après fermeture
        }
      }]
    });

    await alert.present();
  }


  async openAlert1() {
    // Implémentation si nécessaire
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
              setTimeout(() => {
                // Délai de 2 secondes avant de masquer le splash screen
                if (isReady) {
                  this.hideSplashScreen();
                } else {
                  console.warn("La page de login n'a pas été prête dans le délai imparti.");
                  this.hideSplashScreen();  // On masque le splash malgré tout
                }
              }, 2000); // Délai de 2 secondes
            }
          });
        } else {
          // Masquer le loading si l'on est sur le web
          await loading.dismiss();
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'application :', error);
        await loading.dismiss();  // Assurez-vous que le loading est masqué en cas d'erreur
      }
    });
  }

  async hideSplashScreen() {
    try {
      await SplashScreen.hide();
    } catch (error) {
      console.error('Erreur lors du masquage du splash screen :', error);
    }
  }






  setupNetworkListeners() {
    this.network.onDisconnect().subscribe(() => {
      this.openAlert();
    });

    this.network.onConnect().subscribe(() => {
      this.openAlert1();
    });
  }

  setupKeyboardListeners() {
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
