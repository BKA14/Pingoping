import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { __param } from 'tslib';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {
  id: any;
  annee_entreprise:any;
  nom_entreprise:any;
  responsable_entreprise:any;
  contact_entreprise: any;
 users: any = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
  public loadingController: LoadingController
  ) {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      console.log(this.id);
      this.getuser1(this.id);
    })
  }



  ngOnInit() {
  }

  refreshPage(e){
    setTimeout(() => {
      this.getuser1(this.id);

      console.log('rafraichissement de la page');
      e.target.complete();
    },500);
    }

  async getuser1(id){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getuser1(id).subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.users = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);
})
}


openUrl(){ window.open('https://www.google.es/maps?q=11.1497202,-4.2774270', '_system'); }
}
