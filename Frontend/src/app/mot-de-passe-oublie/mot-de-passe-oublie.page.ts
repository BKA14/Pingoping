import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { authService } from '../services/auth.service';

@Component({
  selector: 'app-mot-de-passe-oublie',
  templateUrl: './mot-de-passe-oublie.page.html',
  styleUrls: ['./mot-de-passe-oublie.page.scss'],
})
export class MotDePasseOubliePage implements OnInit {

  contact: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: authService,
    private router: Router,
    public _apiService: ApiService,
    private loadingCtrl: LoadingController,
  ) {}

    ngOnInit() {

  }

  async onSubmit() {

  const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    await loading.present(); // Attendre que le loading soit présenté

    let data = {
      contact: this.contact,
    };

    try {
      const response : any = await this._apiService.verifie_code_password(data).toPromise();
     if (response.status == 'Success')
      {
       this.successMessage = 'success';
     //  console.log('succes numero present ', response);
      this.router.navigateByUrl('/verifie-password');
      // Réinitialiser le formulaire ou afficher un message de succès si nécessaire
      this.contact = ''; // Réinitialiser le titre
     }
     else
     {
      alert('contact non trouvé');
     }
    } catch (error) {
      this.errorMessage =  'erreur... réessayez';
      alert('Erreur veuillez réessayer');
      alert('erreur : non, envoyée...');
    } finally {
      loading.dismiss(); // Fermer le loading dans tous les cas
    }
  }


}

