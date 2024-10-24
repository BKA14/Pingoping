import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-update-numero-livraison',
  templateUrl: './update-numero-livraison.page.html',
  styleUrls: ['./update-numero-livraison.page.scss'],
})
export class UpdateNumeroLivraisonPage implements OnInit {

  verifieForm: FormGroup;
  id: any;
  nom_entreprise:any;
  entreprises: any = [];
  navCtrl: any;
  nom_operateur : any;
  description: any;
  number: Object;
  numero: any;


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
      this.numero_id(this.id);
    })

  }


    numero_id (id){
    this._apiService.numero_id_livraison(id).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      let resultat = res[0];
      this.nom_operateur = resultat.nom_operateur;
      this.numero = resultat.numero;
     },(error: any) => {
      console.log("Erreur de connection",error);
  })
}



  async update_num_service(){

    let id = this.id;
  let data = {
    nom: this.nom_operateur,
    numero : this.numero,
}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.update_num_livraison(id,data).subscribe((res:any) => {
  console.log("SUCCESS ===",res);
  loading.dismiss();
  this.router.navigateByUrl('/livraison');
  alert('modification effectué avec succes')
 },(error: any) => {
  console.log("Erreur de connection",error);
  loading.dismiss();
})

}


refreshPage(e){
  setTimeout(() => {
    this.numero_id(this.id);
    console.log('rafraichissement de la page');
    e.target.complete();
  },500);
  }


ngOnInit() {

  this.verifieForm = new FormGroup({

name: new FormControl('', [
Validators.required,
Validators.minLength(2),
  ]),

  numero: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
      ]),



  });


}

}
