import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ajouter-numero-livraison',
  templateUrl: './ajouter-numero-livraison.page.html',
  styleUrls: ['./ajouter-numero-livraison.page.scss'],
})
export class AjouterNumeroLivraisonPage implements OnInit {


  verifieForm: FormGroup;


 id:any;
 nom_entreprise:any;
 description : any;
 nom_operateur : any;
 numero: any;
 grade:any;
 entreprises: any = [];


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
     nom: this.nom_operateur,
     numero: this.numero,
    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.add_numero_livraison(data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);
      this.nom_operateur ='';

      loading.dismiss();
      this.router.navigateByUrl('/numero-service-livraison');
      this.presentToast('numero ajoute avec success', 'success');
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

      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
          ]),

  });

}

}
