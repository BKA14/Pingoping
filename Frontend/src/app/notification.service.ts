import { Injectable } from '@angular/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { AlertController } from '@ionic/angular';
import { authService } from './services/auth.service';
import { ApiService } from './api.service';

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
    this.initializePushNotifications();
  }

  ngOnInit() {
    // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });
  }

  initializePushNotifications() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
       alert('Les notifications push ne sont pas autorisées.');
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
      this.sendTokenToServer(token.value); // Appel de la méthode pour envoyer le token
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      ('Notification reçue: ' + JSON.stringify(notification));

      // Affichage d'une alerte dans l'application
      const alert = await this.alertController.create({
        header: notification.title,
        subHeader: notification.body,
        message: 'Vous avez reçu une nouvelle notification',
        buttons: ['OK']
      });

      await alert.present();
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Action de notification effectuée: ' + JSON.stringify(notification));
      // Logique pour gérer les actions effectuées sur la notification
    });
  }

  sendTokenToServer(token: string) {

    let data = {
      token: token,
      role: this.userData.grade,
     }

    // Vérifier si userData est défini avant d'accéder à grade
    if (this.userData) {
      this._apiService.sendtoken(data).subscribe((res: any) => {
        alert('token envoyé'+ res );
      }, (error: any) => {
        alert("Erreur envoie token" + error);
      });
    }
  }


}
