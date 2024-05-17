import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-depot-retrait',
  templateUrl: './depot-retrait.page.html',
  styleUrls: ['./depot-retrait.page.scss'],
})
export class DepotRetraitPage implements OnInit {



  id: any;
  commentaire1:any;
  commentaire2:any;
  depotmin: any;
  retraitmin:any;
  commentaire3:any;
  depot_retrait: any = [];
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
      this.getdepotretrait();
    })
  }



  ngOnInit() {
  }
  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getdepotretrait();

        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }



  async getdepotretrait(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getdepotretrait().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.depot_retrait = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}


}
