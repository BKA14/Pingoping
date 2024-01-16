import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-vente-informatique',
  templateUrl: './vente-informatique.page.html',
  styleUrls: ['./vente-informatique.page.scss'],
})
export class VenteInformatiquePage implements OnInit {


  whatsappNumberf: any;
  id: any;
  commentaire1: any;
  commentaire2: any;
  commentaire3: any;
  prix: any;
  lienphoto:any;
  vente: any = [];
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
      this.getvente();
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
        this.getvente();

        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }


  async getvente(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getvente().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.vente = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}


}
