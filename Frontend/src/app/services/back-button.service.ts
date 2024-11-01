import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;
  private durerToast = 1000;

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private statusBar: StatusBar,
    private navControlelr: NavController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
  }

  init() {
    this.platform.backButton.subscribeWithPriority(-3, async () => {

      const currentUrl = this.router.url;
      const exitAppUrls = ["/login2", "/welcome", "/acceuil", "/apropos", "/notifications"];

      if (exitAppUrls.some(url => currentUrl.startsWith(url))) {
        this.withDoublePress("Appuyez à nouveau pour quitter", () => {
          navigator['app'].exitApp();
        });
      } else {
        this.navControlelr.back();
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
        duration: this.durerToast
      });

      await toast.present();
      this.lastTimeBackButtonWasPressed = currentTime;
    }
  }
}
