import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  grade: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    public  loadingController: LoadingController,
    private alertController: AlertController,
    private toastController : ToastController
  ) { }

  ngOnInit() {
    this.getsession();
  }

  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }


  userinfo() {
    this.router.navigateByUrl('/information');
  }

  apropos(){
    this.router.navigateByUrl('/apropos');
  }

  signalement() {

    this.router.navigateByUrl('/signalement');

  }

  alerte() {

    this.router.navigateByUrl('/alerte');

  }

  alert_user(){

    this.router.navigateByUrl('/alert-user');

  }

  message(){

    this.router.navigateByUrl('/message-user');

  }

  message_admin(){

    this.router.navigateByUrl('/message-admin');

  }

  send_notification(){

    this.router.navigateByUrl('/send-notification');

  }

  utilisateur() {

    this.router.navigateByUrl('/liste-user');

  }

  async deconnect() {

    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // L'utilisateur a annulé la déconnexion, ne rien faire
          }
        }, {
          text: 'Déconnecter',
          handler: () => {
            // L'utilisateur a confirmé la déconnexion
            this.performLogout();
          }
        }
      ]
    });

    await alert.present();

  }

  async performLogout() {
    const loading = await this.loadingCtrl.create({
      message: 'Déconnexion en cours...',
      spinner: 'lines',
      cssClass: 'custom-loading'
    });
    loading.present();

    localStorage.clear();

    // Afficher un toast de confirmation
    const toast = await this.toastController.create({
      message: 'Vous êtes déconnecté avec succès.',
      duration: 2000,
      position: 'top'
    });
    toast.present();

    this.router.navigateByUrl('/login2');
    loading.dismiss();
  }

  }





