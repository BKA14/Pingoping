import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ajouter-numero',
  templateUrl: './ajouter-numero.page.html',
  styleUrls: ['./ajouter-numero.page.scss'],
})
export class AjouterNumeroPage implements OnInit {

  verifieForm: FormGroup;


  id:any;
 nom_entreprise:any;
 description : any;
 numero: any;
 grade:any;
 entreprises: any = [];
  vip: any;
  rang : any;

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private _apiService : ApiService,
  private loadingCtrl: LoadingController,
  public loadingController: LoadingController,
  private toastCtrl: ToastController  // Injecter le ToastController

) {

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


  async addNumero(){
    let data = {
     nom: this.nom_entreprise,
     numero: this.numero,
     description: this.description,
     vip: this.vip,
     rang: this.rang,
    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.add_numero(data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);
      this.nom_entreprise ='';
      //window.location.reload();
      loading.dismiss();
     // this.router.navigateByUrl('/numero-service');
      this.presentToast('Entreprise et numero ajoute avec success', 'success');
    },(error: any) => {
      loading.dismiss();
     this.presentToast("Erreur de connexion avec le serveur, veuillez réessayer.");
     console.log("ERROR ===",error);
    })
   }


ngOnInit() {

  this.verifieForm = new FormGroup({
  name: new FormControl('', [
Validators.required,
Validators.minLength(1),
  ]),

  description: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
      ]),

      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
          ]),

  });

}

}
