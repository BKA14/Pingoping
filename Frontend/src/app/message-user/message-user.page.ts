import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { authService } from '../services/auth.service';

@Component({
  selector: 'app-message-user',
  templateUrl: './message-user.page.html',
  styleUrls: ['./message-user.page.scss'],
})
export class MessageUserPage implements OnInit {

  message : any;
  newComment: any;
  userData: any;


  constructor(
    private router: Router,
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
    private authService: authService
  )
  {


  }

  ngOnInit()
  {
  // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  }


  async sendMessage() {

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner:'lines',
      cssClass: 'custom-loading',
    });

    loading.present();

    // Vérifie si un commentaire a été saisi
    if (!this.message) {
      loading.dismiss();
      return;
    }

    const newComment = {

      iduser : this.userData.iduser,
      nom: this.userData.nom,
      contact: this.userData.numuser,
      prenom: this.userData.prenom1,
      message: this.message,

    };

    try {
      const res : any = await this._apiService.sendmessage(newComment).toPromise();
      console.log("SUCCESS ===", res);

           this.newComment = '';
           this.clearMessage();
           alert('Commentaire envoyé, merci');
          loading.dismiss();

        } catch (error) {
          console.error("ERROR ===", error);
          alert('Commentaire non envoyé reessayer plus tard');
          loading.dismiss();
        }
  }


  clearMessage() {
    this.message = '';  // Efface le contenu de la zone de texte
  }

}
