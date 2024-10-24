import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;
  private durerToast = 1000;
  private isNavigating = false;


  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
  }


  init() {
    this.platform.backButton.subscribeWithPriority(100, async () => {

       this.isNavigating = true;
       const currentUrl = this.router.url;

        // URLs qui déclenchent la fermeture de l'application
        const exitAppUrls = ["/login2", "/welcome", "/acceuil", "/apropos", "/notifications"];

        console.log("Current URL:", currentUrl);

        // Utilisation de `startsWith` pour gérer les URLs dynamiques
        if (exitAppUrls.some(url => currentUrl.startsWith(url))) {
            console.log("Exit app logic triggered");
            this.withDoublePress("Appuyez à nouveau pour quitter", () => {
                navigator['app'].exitApp();
            });
        } else {
            console.log("Navigate back triggered");
            this.location.back();
        }

         this.isNavigating = false;
    });
}


  async withDoublePress(message: string, action: () => void) {
    const currentTime = new Date().getTime();

    if (currentTime - this.lastTimeBackButtonWasPressed < this.timePeriodToAction) {
      action();
    } else {
      const toast = await this.toastController.create({
        message: message,
        duration: this.durerToast
      });

      await toast.present();

      this.lastTimeBackButtonWasPressed = currentTime;
    }
  }
}
