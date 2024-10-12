import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;
  private exitUrls = ["/login2", "/welcome", "/acceuil", "/apropos", "/menu", "/notifications"];

  constructor(
    private platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.init();
  }

  async init() {
    await this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;

      if (this.exitUrls.includes(currentUrl)) {
        this.withDoublePress("Appuyez à nouveau pour quitter", () => {
          navigator['app'].exitApp();
        });
      } else {
        // Vérifier si l'historique de navigation contient une entrée
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state && navigation.extras.state.previousUrl) {
          this.router.navigateByUrl(navigation.extras.state.previousUrl);
        } else {
          // Aucun historique, donc demander à quitter l'application
          this.withDoublePress("Appuyez à nouveau pour quitter l'application", () => {
            navigator['app'].exitApp();
          });
        }
      }
    });
  }

  async withDoublePress(message: string, action: () => void) {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTimeBackButtonWasPressed < this.timePeriodToAction) {
      action();
    } else {
      const toast = await this.toastController.create({
        message: message,
        duration: this.timePeriodToAction
      });

      await toast.present();
      this.lastTimeBackButtonWasPressed = currentTime;
    }
  }

  async withAlert(message: string, action: () => void) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "OK",
          handler: action
        }
      ]
    });
    await alert.present();
  }
}
