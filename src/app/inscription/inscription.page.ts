import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  verifieForm: FormGroup;
showPassword = false;
nom: any;
prenom:any;
email:any;
contact: any;
password: any;
password2:any;
grade:any;
grade1:any;
genre:any;
rang: any = [];

  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController
  ) {
    this.getgrade();
    this.getsession();
  this.grade='utilisateur';
   }


  login2() {

    this.router.navigateByUrl('/welcome2');

  }

  getsession(){
    this.grade1= (localStorage.getItem('grade'));
    console.log(this.grade1);
     }


  async inscription(){
    let data = {
      nom:this.nom,
      prenom:this.prenom,
      email: this.email,
      contact: this.contact,
      password: this.password,
      password2: this.password2,

      grade:this.grade,
      genre:this.genre,
    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.inscription(data).subscribe((res:any) => {
      loading.dismiss();
        console.log("SUCCESS ===",res);

         alert('Utilisateur enregistre avec  avec success');

         if (this.grade1==="superadmin")
         {
          this.router.navigateByUrl('/liste-user');
         }
         else{this.router.navigateByUrl('/login2');}
  }
    ,(error: any) => {
      loading.dismiss();
     alert('Erreur de connexion, veuillez réessayer ');
     console.log("ERROR ===",error);
     this.router.navigateByUrl('/inscription');
    })
    this.getsession()
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


  nom: new FormControl('', [
    Validators.minLength(2),
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
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[a-zA-Z0-9@$!%*?&#]+$'),
    Validators.minLength(8)
        ]),
        password2: new FormControl('', [
          Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[a-zA-Z0-9@$!%*?&#]+$'),

            ]),


          }


          );



  }

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;
  }

}
