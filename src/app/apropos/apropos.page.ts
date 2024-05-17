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
      console.log(this.id);
      this.getapropos();
    })
  }



  ngOnInit() {
    this.getapropos();
  }

  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }


  getwhatsap(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

  async getapropos(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getapropos().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.a_propos = res[0];
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

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



}
