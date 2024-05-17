import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
selector: 'app-modifalimentation',
templateUrl: './modifalimentation.page.html',
styleUrls: ['./modifalimentation.page.scss'],
})
export class ModifalimentationPage implements OnInit {

verifieForm: FormGroup;

id: any;
commentaire1:any;
commentaire2:any;
commentaire3:any;
alimentation: any = [];
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
    this.getalimentation();
  })
}


getsession(){
  this.grade= (localStorage.getItem('grade'));
  console.log(this.grade);
    }

    refreshPage(e){
    setTimeout(() => {
      this.getalimentation();

      console.log('rafraichissement de la page');
      e.target.complete();
    },500);
    }


    async getalimentation(){
      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
       spinner:'lines',
      // showBackdrop:false,
        cssClass: 'custom-loading',
      });
      loading.present();

      this._apiService.getalimentation().subscribe((res:any) => {
        loading.dismiss();
        console.log("SUCCESS ===",res);
        this.alimentation = res[0];

      this.commentaire1=this.alimentation.commentaire1;
      this.commentaire2=this.alimentation.commentaire2;
      this.commentaire3=this.alimentation.commentaire3;
      //this.livraison= this.alimentation.livraison;

       },(error: any) => {
        loading.dismiss();
        console.log("Erreur de connection ===",error);

    })
        this.getsession();
    }



async updatealimentation(){
let data = {
  id: this.id,
commentaire1:this.commentaire1,
//livraison: this.livraison,
commentaire2: this.commentaire2,
commentaire3: this.commentaire3,
}

const loading = await this.loadingCtrl.create({
message: 'Rechargement...',
spinner:'lines',
// showBackdrop:false,
cssClass: 'custom-loading',
});

loading.present();
this._apiService.updatealimentation(this.id,data).subscribe((res:any) => {
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
this.updatealimentation();
//this.router.navigateByUrl('/welcome')
this.router.navigateByUrl('/welcome');
//this.navCtrl.setRoot('/welcome');
}


ngOnInit() {
this.getalimentation();


this.verifieForm = new FormGroup({
  commentaire1: new FormControl('', [
    Validators.required,
    Validators.minLength(2),

]),

commentaire2: new FormControl('', [
Validators.required,
Validators.minLength(2),

]),

commentaire3: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

  ]),

        }

        );


}

}

