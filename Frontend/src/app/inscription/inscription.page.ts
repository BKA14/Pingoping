import { Alert } from 'selenium-webdriver';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { authService } from '../services/auth.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

// Fonction de validation personnalisée pour vérifier si les deux mots de passe correspondent
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const password2 = control.get('password2');

    if (password && password2 && password.value !== password2.value) {
      return { 'passwordsMismatch': true };
    }
    return null;
  };
}

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
grade1:any;
genre:any;
rang: any = [];
userData: any;
grade: any;

  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private authService: authService,

  ) {
    this.grade_user();
    }


  login2() {

    this.router.navigateByUrl('/welcome2');

  }

  getsession(){
    this.grade1= (localStorage.getItem('grade'));
    console.log(this.grade1);
     }


     async inscription() {
      let data = {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          contact: this.contact,
          password: this.password,
          password2: this.password2,
          date_inscription: new Date().toISOString(),
          grade: this.grade,
          genre: this.genre,
      };

      const loading = await this.loadingCtrl.create({
          message: 'Rechargement...',
          spinner: 'lines',
          cssClass: 'custom-loading',
      });
      loading.present();

      this._apiService.inscription(data).subscribe((res: any) => {
          console.log("SUCCESS ===", res);

          // Vérification des conditions et sortie de la fonction si une condition est remplie
          if (res === "email_exist") {
              alert('L\'email que vous avez utilisée existe déjà.');
              loading.dismiss(); // Assurez-vous de dissiper le chargement avant de quitter
              return; // Quitte la fonction
          } else if (res === "contact_exist") {
              alert('Le numéro que vous avez utilisé existe déjà.');
              loading.dismiss();
              return; // Quitte la fonction
          }

          // Si l'utilisateur a été enregistré avec succès
          if (this.userData.grade === "superadmin") {
             // alert('Utilisateur enregistré avec succès.');
              this.router.navigateByUrl('/verifie-code');
          } else {
              //alert('Utilisateur enregistré avec succès.');
              localStorage.clear();
              this.router.navigateByUrl('/verifie-code');
          }

          loading.dismiss();
          this.getsession();
      },
      (error: any) => {
          loading.dismiss();
          alert('Erreur de connexion, veuillez réessayer.');
          console.log("ERROR ===", error);
          this.router.navigateByUrl('/inscription');
      });
  }


  ngOnInit() {
      // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  this.verifieForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.maxLength(65),
    ]),
    select: new FormControl('', [
      Validators.required,
    ]),
    nom: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(25),
      Validators.required,
    ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.min(10000000),
      Validators.max(99999999999999),
      Validators.maxLength(12),
    ]),
    prenom: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
      Validators.maxLength(60),
    ]),
    password: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]{4}$'),  // Exactement 4 chiffres
    ]),
    password2: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]{4}$'),  // Exactement 4 chiffres
    ]),
  }, { validators: passwordsMatchValidator() });


    }



  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;
  }

  async grade_user() {
    try{
      const res: any = await this._apiService.getgrade().toPromise();
      console.log('grade', res);
      this.rang = res;

    } catch (error) {
      alert('Erreur de connexion avec le serveur, veuillez réessayer ou contactez-nous !');
      console.log("ERROR ===", error);
    }
  }

}
