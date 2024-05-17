import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-ajouter-entreprise',
  templateUrl: './ajouter-entreprise.page.html',
  styleUrls: ['./ajouter-entreprise.page.scss'],
})
export class AjouterEntreprisePage implements OnInit {
  verifieForm: FormGroup;




  id:any;
 nom_entreprise:any;
 entreprises: any = [];


 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private _apiService : ApiService,
  private loadingCtrl: LoadingController,
  public loadingController: LoadingController
) {
  this.getcategorie();
  }

  async addEntreprise(){
    let data = {
     nom: this.nom_entreprise,
    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.addentreprise(data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);
      this.nom_entreprise ='';
      //window.location.reload();
      loading.dismiss();
      this.router.navigateByUrl('/welcome');
      alert('Entreprise ajoute avec success');
    },(error: any) => {
      loading.dismiss();
     alert('Erreur de connection entreprise non enregistre');
     console.log("ERROR ===",error);
    })
   }

   getentreprises(){
    this._apiService.getentreprises().subscribe((res:any) => {

      console.log("SUCCESS ===",res);


     },(error: any) => {
     alert('Erreur de connection avec le serveur veillez reessayer');
     //this.navCtrl.setRoot('/welcome2');
     this.router.navigateByUrl('/welcome2');
     // console.log("ERREUR ===",error);
  })
  }

getcategorie(){
  this._apiService.getcategorie().subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    this.entreprises = res;
   },(error: any) => {
    console.log("Erreur de connection ",error);
})
}


async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    duration: 1500,
    cssClass: 'custom-loading',
  });

  loading.present();
  this.addEntreprise();
  //this.router.navigateByUrl('/welcome')
  this.router.navigateByUrl('/welcome');
  //this.navCtrl.setRoot('/welcome');
}

ngOnInit() {

  this.verifieForm = new FormGroup({
  name: new FormControl('', [
Validators.required,
Validators.minLength(2),
  ]),

  });



}

}
