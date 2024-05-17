import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { __param } from 'tslib';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.page.html',
  styleUrls: ['./update-entreprise.page.scss'],
})
export class UpdateEntreprisePage implements OnInit {
  verifieForm: FormGroup;
  loaderToShow: any;
  id: any;
  nom_entreprise:any;
  entreprises: any = [];
  entreprisess: any = [];
  navCtrl: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController

  ) {
    this.getentreprises();
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      console.log(this.id);
      this.getentreprisee(this.id);
      this.getcategorie();
    })

  }

  getentreprisee (id){
    this._apiService.getentreprisee(id).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      let entreprise = res[0];
      this.nom_entreprise = entreprise.nom_entreprise;
     },(error: any) => {
      console.log("Erreur de connection",error);
  })
}

showLoader()
{
     this.loaderToShow = this.loadingCtrl.create({
       message: 'Loader will Not Hide'
     }).then((res) => {
       res.present();
       res.onDidDismiss().then((dis) => {
         console.log('Loading dismissed!');
       });
     });

   }



  async updateentreprise(){

  let data = {
    nom: this.nom_entreprise,
}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.updateentreprise(this.id,data).subscribe((res:any) => {
  console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);
  this.getentreprises();
  loading.dismiss();
  this.router.navigateByUrl('/welcome');
 },(error: any) => {
  console.log("Erreur de connection",error);
  loading.dismiss();
})
}
getentreprises(){
  this._apiService.getentreprises().subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    this.entreprises = res;
   },(error: any) => {
   // alert('Erreur de connection');
   this.router.navigateByUrl('/welcome2');

   // console.log("ERREUR ===",error);
})

}

getcategorie(){
  this._apiService.getcategorie().subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    this.entreprisess = res;
   },(error: any) => {
   // alert('Erreur de connection');
   //this.router.navigateByUrl('/welcome2');
   console.log("Erreur de connection");

   // console.log("ERREUR ===",error);
})

}


refreshPage(e){
  setTimeout(() => {
    this.getentreprisee(this.id);
    this.getcategorie();
    console.log('rafraichissement de la page');
    e.target.complete();
  },500);
  }

async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    duration: 1500,
    cssClass: 'custom-loading',
  });

  loading.present();
  this.updateentreprise();
  //this.router.navigateByUrl('/welcome');
  this.router.navigateByUrl('/welcome');
  //this.navCtrl.setRoot('/welcome');
  this.getentreprises();
}

ngOnInit() {

  this.verifieForm = new FormGroup({
  name: new FormControl('', [
Validators.required,
Validators.minLength(2),
  ]),

      //contact: new FormControl('', [
       // Validators.required,
       // Validators.min(10000000),
      //  Validators.max(99999999999999),

      //]),


    //  longitude: new FormControl('', [
       // Validators.pattern('/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/')
      //]),
      //latitude: new FormControl('', [
      //  Validators.pattern('/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/')
      //]),

  });



}

}
