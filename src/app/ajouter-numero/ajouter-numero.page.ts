import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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


 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private _apiService : ApiService,
  private loadingCtrl: LoadingController,
  public loadingController: LoadingController
) {

  }

  async addNumero(){
    let data = {
     nom: this.nom_entreprise,
     numero: this.numero,
     description: this.description,
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
      this.router.navigateByUrl('/welcome');
      alert('Entreprise et numero ajoute avec success');
    },(error: any) => {
      loading.dismiss();
     alert('Erreur de connection entreprise non enregistre');
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
