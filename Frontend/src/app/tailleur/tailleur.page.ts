import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-tailleur',
  templateUrl: './tailleur.page.html',
  styleUrls: ['./tailleur.page.scss'],
})
export class TailleurPage implements OnInit {


  whatsappNumberf: any;
  id: any;
  commentaire1: any;
  commentaire2: any;
  commentaire3: any;
  prix: any;
  lienphoto:any;
  tailleur: any = [];
  grade: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
  public loadingController: LoadingController,
  private call: CallNumber
  ) {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      console.log(this.id);
      this.gettailleur();
    })
  }

  ngOnInit() {
  }
  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }


  getwhatsap(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.gettailleur();

        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }


  async gettailleur(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.gettailleur().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.tailleur = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}


}

