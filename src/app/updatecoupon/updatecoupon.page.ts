import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatecoupon',
  templateUrl: './updatecoupon.page.html',
  styleUrls: ['./updatecoupon.page.scss'],
})
export class UpdatecouponPage implements OnInit {
  verifieForm: FormGroup;

  id: any;
  commentaire1:any;
  xbet: any;
  betwinner:any;
  commentaire2:any;
 coupon: any = [];
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
      this.getcoupon();
    })
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
    this.coupon = res[0];

    this.commentaire1 = this.coupon.commentaire1;
    this.xbet = this.coupon.xbet;
    this.betwinner = this.coupon.betwinner;
    this.commentaire2 = this.coupon.commentaire2;
    console.log("Test ===",this.coupon.commentaire2);
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}



async updatecoupon(){

  let data = {
    id: this.id,
  commentaire1:this.commentaire1,
  xbet: this.xbet,
  betwinner:this.betwinner,
  commentaire2:this.commentaire2,
}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.updatecoupon(this.id,data).subscribe((res:any) => {
  loading.dismiss();
  console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);
  this.router.navigateByUrl('/welcome');
 },(error: any) => {
  loading.dismiss();
  console.log("Erreur de connection",error);
})
}


ngOnInit() {

  this.getcoupon();

  this.verifieForm = new FormGroup({
    xbet: new FormControl('', [
      Validators.required,
      Validators.minLength(2),

  ]),

betwinner: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
commentaire1: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
commentaire2: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),



          }


          );


  }


}

