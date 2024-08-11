import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { __param } from 'tslib';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  verifieForm: FormGroup;
  loaderToShow: any;

  id: any;
  nom2:any;
  prenom2:any;
  email2:any;
  grade:any;
  password1: any;
  password2: any;
  access_app : any;
  genre:any;
  contact:any;
  entreprises: any = [];

  navCtrl: any;
  rang: any = [];

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
    this.getgrade();
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

   refreshPage(e){
    setTimeout(() => {
      this.getuser1(this.id);
      this.getgrade();
      console.log('rafraichissement de la page');
      e.target.complete();
    },500);
    }


  async updateuser(){

  let data = {
    nom: this.nom2,
    prenom: this.prenom2,
    email: this.email2,
    grade: this.grade,
    contact: this.contact,
    password: this.password1,
    genre: this.genre,
    access_app: this.access_app,


}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.updateuser(this.id,data).subscribe((res:any) => {
  loading.dismiss();
  console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);

  this.router.navigateByUrl('/liste-user');
 },(error: any) => {
  loading.dismiss();
  console.log("Erreur de connection",error);
})
}

getuser1 (id){
  this._apiService.getuser1(id).subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    let entreprise = res[0];
    this.nom2 = entreprise.nom;
    this.prenom2 = entreprise.prenom;
    this.email2 = entreprise.email;
    this.password1 = entreprise.password;
    this.password2 = entreprise.password;
    this.grade = entreprise.grade;
    this.access_app = entreprise.access_app;
    this.genre = entreprise.genre;
    this.contact = entreprise.contact;
   },(error: any) => {
    console.log("Erreur de connection",error);
})
}

getgrade(){
  this._apiService.getgrade().subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    this.rang = res;
   },(error: any) => {
    console.log("Erreur de connection",error);
})
}


ngOnInit() {

  this.verifieForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
     Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
  ]),
  select: new FormControl('', [
    Validators.required,
  ]),
  select1: new FormControl('', [
    Validators.required,
  ]),
  nom: new FormControl('', [
    Validators.minLength(2),
  Validators.required,

      ]),

      access_app: new FormControl('', [
      Validators.required,

          ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.min(10000000),
        Validators.max(99999999999999),

      ]),
      prenom: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
          ]),

          password: new FormControl('', [
            Validators.minLength(8),
            Validators.required,
            Validators.maxLength(100),
        ]),
          }
          );

  }
}

