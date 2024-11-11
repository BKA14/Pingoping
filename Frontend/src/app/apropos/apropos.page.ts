import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.page.html',
  styleUrls: ['./apropos.page.scss'],
})
export class AproposPage implements OnInit {

  whatsappNumberf: any;
  id: any;
  contact: any;
  commentaire: any;
  email: any;
  facebook:any;
  instagram:any;
  tiktok:any;
  youtube:any;
  whatsapp:any;
  telegram:any;
  logo:any;
  version:any;
  a_propos: any = [];
  grade: any;
  old_apropos: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private alertController: AlertController,
  ) {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
     //  console.log(this.id);
      this.getapropos();
    })
  }



  ngOnInit() {
    this.getapropos();
  }

  getsession(){
    this.grade= (localStorage.getItem('grade'));
    // console.log(this.grade);
     }

  getwhatsap(){
    this.grade= (localStorage.getItem('grade'));
    // console.log(this.grade);
     }

  async getapropos(){

  this.old_apropos = this.a_propos;

  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
    duration: 10000,
  });
  loading.present();

  this._apiService.getapropos().subscribe((res:any) => {


    if (res && res.length < 1) {
      this.a_propos = 'aucune_alerte';
    }
    else {
      // console.log("SUCCESS ===",res);
      this.a_propos = res[0];
     }

    loading.dismiss();

   },(error: any) => {
    if (this.old_apropos && this.old_apropos.length > 0) {
      this.a_propos = this.old_apropos;
    }
    else { this.a_propos = 'erreur_chargement'; }
    loading.dismiss();
    // console.log("Erreur de connection ===",error);

})
    this.getsession();
}


openFacebook(link: string) {
  window.open(link, '_blank');
}

openWhatsApp(link: string) {
  window.open(link, '_blank');
}

openInstagram(link: string) {
  window.open(link, '_blank');
}

openYoutube(link: string) {
  window.open(link, '_blank');
}

openTiktok(link: string) {
  window.open(link, '_blank');
}
openTelegram(link: string) {
  window.open(link, '_blank');
}


  openUrl(){ window.open('https://www.cci.bf'); }

  acceuil() {

    this.router.navigateByUrl('/acceuil');

  }

  service() {

    this.router.navigateByUrl('/welcome');

  }

  apropos() {

    this.router.navigateByUrl('/apropos');

  }

  ping() {

    this.router.navigateByUrl('/ping');

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
    this.router.navigateByUrl('/login2');
    loading.dismiss();
  }


  async refreshPage(e: any) {


     await this.getapropos();
     // Log pour indiquer le rafraîchissement
    //  console.log('Rafraîchissement de la page');
     // Terminer l'animation de rafraîchissement
     e.target.complete();
   }


}
