import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.page.html',
  styleUrls: ['./send-notification.page.scss'],
})
export class SendNotificationPage implements OnInit {

  body: any;
  title: any;
  topic: any;

  constructor(
    private apiService: ApiService,
    private loadingCtrl: LoadingController,)
   {


   }


  ngOnInit(): void {

  }

  async sendNotification() {
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    await loading.present(); // Attendre que le loading soit présenté

    const notificationData = {
      title: this.title, // Inclure le titre
      body: this.body,
      topic: this.topic,
    };

    try {
      const response = await this.apiService.sendNotification(notificationData).toPromise(); // Utiliser toPromise pour gérer le retour avec async/await
      console.log('Notification envoyée avec succès', response);
      alert('Notification envoyée avec succès');
      // Réinitialiser le formulaire ou afficher un message de succès si nécessaire
      this.title = ''; // Réinitialiser le titre
      this.body = '';
      this.topic = 'admin'; // Réinitialiser à la valeur par défaut
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification', error);
      alert('erreur : Notification non, envoyée...');
      // Afficher un message d'erreur si nécessaire
    } finally {
      loading.dismiss(); // Fermer le loading dans tous les cas
    }
  }

}
