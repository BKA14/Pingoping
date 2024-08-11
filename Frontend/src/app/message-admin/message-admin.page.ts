import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-message-admin',
  templateUrl: './message-admin.page.html',
  styleUrls: ['./message-admin.page.scss'],
})
export class MessageAdminPage implements OnInit {

  message : any;
  page: number = 1;
  limit: number = 6;

  infiniteScrollDisabled: boolean = false; // Variable pour gérer l'état de l'infinite scroll

  constructor(
    private router: Router,
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
  ) {

    }

  ngOnInit() {
    this.getmessage()
  }



  async refreshPage(e: any) {

    // Réinitialiser les données de la page et du tableau pub
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

    // Rafraîchir les pubs
    await this.getmessage();

    // Terminer l'animation de rafraîchissement
    e.target.complete();
  }



  async getmessage(){

    this.page = 1;
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });

    loading.present();

    this._apiService.getmessage(this.page, this.limit).subscribe((res:any) => {

      loading.dismiss();
      console.log("SUCCESS ===",res);
      this.message = res;

     },(error: any) => {
      loading.dismiss();
      console.log("Erreur de connection ===",error);
  })
  }



async loadMore(event) {
  this.page++;

  try {
    const res: any = await this._apiService.getmessage(this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    this.message = this.message.concat(res);

    // Désactiver l'infinite scroll si moins de données retournées que la limite
    if (res.length < this.limit) {
      this.infiniteScrollDisabled = true;
    }
    event.target.complete();
  } catch (error) {
    console.log('Erreur de chargement', error);
    alert('Erreur de connexion avec le serveur, veuillez réessayer.');
    event.target.complete();
  }
}


}
