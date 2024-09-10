import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { authService } from '../services/auth.service';
import { LoginServiceReadyService } from '../login-service-ready.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})

export class Login2Page implements OnInit {
  verifieForm: FormGroup;
  showPassword = false;
  email_entreprise: any;
  password_entreprise: any;
  errorMessage: string;
  userData: any;

  constructor(
    private router: Router,
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: authService,
    private LoginServiceReadyService: LoginServiceReadyService,
    private toastCtrl: ToastController
  )
  {
    this.verifieForm = this.formBuilder.group({
      email: ['', [Validators.required,  Validators.minLength(4)]],
      password: ['', [Validators.required,
         Validators.minLength(4),
         Validators.maxLength(4),
         Validators.pattern('^[0-9]{4}$'),
      ]]
    });
  }

  ionViewDidEnter() {
    // Informer que la page de login est prête
    this.LoginServiceReadyService.setLoginPageReady(true);
  }

  // Méthode pour afficher un toast
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000, // Durée d'affichage du toast
      position: 'top',
      color: color,
    });
    toast.present();
    }



  isTokenExpired(token: string): boolean {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiry = tokenPayload.exp;
    const now = Math.floor(new Date().getTime() / 1000);
    return now > expiry;
  }

  async login() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.router.navigateByUrl('/acceuil');
    } else {
      this.router.navigateByUrl('/login2');
    }
  }


  async login4() {
    let data = {
      email: this.verifieForm.value.email,
      password: this.verifieForm.value.password,
    };

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });
    await loading.present();

    try {
      const res: any = await this._apiService.login(data).toPromise();
      console.log('res', res.message);

      if (res.access_token) {
        const userData = {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          grade: res.user.grade,
          access_app: res.user.access_app,
          iduser: res.user.id,
          contact: res.user.contact,
          prenom1: res.user.prenom,
          genre: res.user.genre,
          nom: res.user.nom,
          datefinblocage: res.user.datefinblocage,
          date_inscription: res.user.date_inscription,
          email: res.user.email,
        };

        this.authService.setUserData(userData);
        this.router.navigateByUrl('/acceuil');
      } else if (res.message === 'incorrect') {
        this.presentToast('Erreur email ou mot de passe incorrect','warning');
      }
      else if (res.message === 'inconnu') {
        this.presentToast('Aucun utilisateur correspondant','warning');
      }
    } catch (error) {
      this.presentToast("Erreur de connexion avec le serveur, veuillez réessayer ou contactez-nous !");
      console.log("ERROR ===", error);
    } finally {
      loading.dismiss();
    }
  }



  ionViewWillEnter() {
    this.login();
  }

  async ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
