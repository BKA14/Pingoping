import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { authService } from '../services/auth.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  grade: any;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    public  loadingController: LoadingController,
    private alertController: AlertController,
    private toastController : ToastController,
    private authService: authService,
    public _apiService: ApiService,
  ) { }

  ngOnInit() {
            // S'abonner aux changements de données utilisateur
            this.authService.userData$.subscribe(data => {
              this.userData = data;
            });

            this.grade = this.userData.grade;
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

  panier(){

    this.router.navigateByUrl('/panier');

  }

  commande(){

    this.router.navigateByUrl('/get-commande');

  }

  commande_user(){

    this.router.navigateByUrl('/get-commande-user');

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

  statistique(){

    this.router.navigateByUrl('/statistique');

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

    await  localStorage.removeItem('access_token');

    await localStorage.clear();
  const id = this.userData.iduser;
  this._apiService.deconnexion(id).subscribe((res:any)  => {
    loading.dismiss();

  },(error: any) => {
    loading.dismiss();
    alert('Erreur de connection avec le serveur veillez reessayer');
 })

    this.router.navigateByUrl('/login2');
    loading.dismiss();
  }

  }





