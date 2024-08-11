import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { __param } from 'tslib';
import { ApiService } from '../api.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-infoentreprise',
  templateUrl: './infoentreprise.page.html',
  styleUrls: ['./infoentreprise.page.scss'],
})
export class InfoentreprisePage implements OnInit {

  id: any;
  commentaire1:any;
  xbet: any;
  betwinner:any;
  commentaire2:any;
 coupon: any = [];
  grade: any;
  copied = false;


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
      this.getcoupon();
    })
  }
  // pour la copie des coupons
  copyText(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);


    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000); // Réinitialisez copied après 2 secondes
  }


  ngOnInit() {
  }

  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getcoupon();

        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }



  async getcoupon(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getcoupon().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.coupon = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}


}
