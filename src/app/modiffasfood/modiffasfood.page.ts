import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-modiffasfood',
  templateUrl: './modiffasfood.page.html',
  styleUrls: ['./modiffasfood.page.scss'],
})
export class ModiffasfoodPage implements OnInit {

  id: any;
  nomplat:any;
  prix: any;
  lienphoto:any;
 fastfood: any = [];
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
      this.getfastfood();
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
        this.getfastfood();

        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }



  async getfastfood(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getfastfood().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.fastfood = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}



async updatefastfood(){

  let data = {
      id: this.id,
      nomplat: this.nomplat,
      prix: this.prix,
      lienphoto: this.lienphoto,

}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.updatefastfood(this.id,data).subscribe((res:any) => {
  console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);

  loading.dismiss();
  this.router.navigateByUrl('/welcome');
 },(error: any) => {
  console.log("Erreur de connection",error);
  loading.dismiss();
})
}


async showLoading() {
 const loading = await this.loadingCtrl.create({
   message: 'Rechargement...',
   duration: 1500,
   cssClass: 'custom-loading',
 });

 loading.present();
 this.updatefastfood();
 //this.router.navigateByUrl('/welcome')
 this.router.navigateByUrl('/welcome');
 //this.navCtrl.setRoot('/welcome');
}

}
