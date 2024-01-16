import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modif-depot-retrait',
  templateUrl: './modif-depot-retrait.page.html',
  styleUrls: ['./modif-depot-retrait.page.scss'],
})
export class ModifDepotRetraitPage implements OnInit {

  verifieForm: FormGroup;

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
    this.depot_retrait = res[0];

  this.commentaire1=this.depot_retrait.commentaire1;
  this.commentaire2=this.depot_retrait.commentaire2;
  this.commentaire3=this.depot_retrait.commentaire3;
  this.depotmin= this.depot_retrait.depotmin;
  this.retraitmin = this.depot_retrait.retraitmin;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}



async updatedepotretrait(){

  let data = {
    id: this.id,
    commentaire1:this.commentaire1,
  depotmin: this.depotmin,
  retraitmin: this.retraitmin,
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
this._apiService.updatedepotretrait(this.id,data).subscribe((res:any) => {
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
 this.updatedepotretrait();
 //this.router.navigateByUrl('/welcome')
 this.router.navigateByUrl('/welcome');
 //this.navCtrl.setRoot('/welcome');
}


ngOnInit() {
  this.getdepotretrait();


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

depotmin: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
retraitmin: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
          }


          );


  }

}

