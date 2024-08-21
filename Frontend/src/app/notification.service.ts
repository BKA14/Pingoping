import { Injectable } from '@angular/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { AlertController } from '@ionic/angular';
import { authService } from './services/auth.service';
import { ApiService } from './api.service';
import { getMessaging, onMessage } from "firebase/messaging";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  userData: any;

  constructor(
    private alertController: AlertController,
    private authService: authService,
    private _apiService: ApiService
  ) {

      // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });

    this.initializePushNotifications();

  }


  initializePushNotifications() {

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('Les notifications push ne sont pas autorisées.');
      }
    });

    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Push registration success, token: ', token.value);
      await this.sendTokenToServer(token.value); // Appel de la méthode pour envoyer le token
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ', JSON.stringify(error));
    });

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      console.log('Notification reçue: ' + JSON.stringify(notification));

      // Affichage d'une alerte dans l'application avec une icône
      const alert = await this.alertController.create({
        header: 'Notification',
        subHeader: notification.title,
        message: `
          <div class="custom-alert-content">
            <img src="../assets/notif_icon.png" />
            <p>${notification.body}</p>
          </div>
        `,
        buttons: [
          {
            text: 'Voir',
            cssClass: 'custom-alert-button',
            handler: () => {
              console.log('Voir notification');
            }
          },
          {
            text: 'OK',
            role: 'cancel',
            cssClass: 'custom-alert-button-ok'
          }
        ],
        cssClass: 'custom-alert'
      });

      await alert.present();
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Action de notification effectuée: ' + JSON.stringify(notification));
      // Logique pour gérer les actions effectuées sur la notification
    });
  }


async sendTokenToServer(token: string) {

  console.log('Token received:', token);

  if (this.userData) {
    console.log('User data:', this.userData);

    let data = {
      token: await token,
      role: await this.userData.grade,
    };

  //  alert('Token received:' + token);

    this._apiService.sendtoken(data).subscribe((res: any) => {
      console.log('Token sent successfully:', res);
    }, (error: any) => {
      console.log('Error sending token:', error);
    });
  } else {
    console.error('User data not defined.');
  }
}



}
