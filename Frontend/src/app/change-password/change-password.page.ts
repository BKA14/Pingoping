import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { authService} from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  verifieForm: FormGroup;
  showPassword = false;
  password: any;
  password2:any;
  userData: any;

    constructor(
       private route: ActivatedRoute,
      private router: Router,
      private _apiService : ApiService,
      private loadingCtrl: LoadingController,
      public loadingController: LoadingController,
      private authService: authService,
    ) {

      }

       async reinitialise() {
        let data = {
            password: this.password,
            password2: this.password2,
            date_inscription: new Date().toISOString(),
        };

        const loading = await this.loadingCtrl.create({
            message: 'Rechargement...',
            spinner: 'lines',
            cssClass: 'custom-loading',
        });
        loading.present();

        this._apiService.reinitialise(data).subscribe((res: any) => {
            console.log("SUCCESS ===", res);

            alert('réinitialisation effectué avec succès.');
                this.router.navigateByUrl('/login2');

            loading.dismiss();
        },
        (error: any) => {
            loading.dismiss();
            alert('Erreur, veuillez réessayer.');
            console.log("ERROR ===", error);
        });
    }


    ngOnInit() {
  // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

      this.verifieForm = new FormGroup({

        password: new FormControl('', [
          Validators.minLength(4),  // Longueur minimale de 4 caractères
          Validators.maxLength(4),  // Longueur maximale de 4 caractères
          Validators.required,      // Champ obligatoire
          Validators.pattern('^[0-9]{4}$'),  // Doit être exactement 4 chiffres
        ]),


          password2: new FormControl('', [
            Validators.minLength(4),  // Longueur minimale de 4 caractères
            Validators.maxLength(4),  // Longueur maximale de 4 caractères
            Validators.required,      // Champ obligatoire
            Validators.pattern('^[0-9]{4}$'),  // Doit être exactement 4 chiffres
           //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*?&#]{8,40}$'),
           // validator en commentaire en haut pour Entrez un mot de passe de 8 caractères minimum avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@, $, !, %, *, ?, &, #).
              ]),

            }
            );
        }

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }

  }
