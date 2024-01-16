import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ajouterpub',
  templateUrl: './ajouterpub.page.html',
  styleUrls: ['./ajouterpub.page.scss'],
})
export class AjouterpubPage implements OnInit {
  verifieForm: FormGroup;


 id:any;
 annee_entreprise:any;
 titre:any;
 commentaire:any;
 rangpub: any;
 photo:any;
 bouton: any;
 contact: any;
 longitude: any;
 latitude: any;
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

  async addpub(){
    let data = {

     titre: this.titre,
     commentaire: this.commentaire,
     photo: this.photo,
     bouton:this.bouton,
     rangpub: this.rangpub,
     contact: this.contact,
     longitude: this.longitude,
     latitude: this.latitude,

    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.addpub(data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);

      this.rangpub='';
      this.titre ='';
      this.commentaire ='';
      this.photo ='';
      this.bouton ='';
      this.contact ='';
      this.longitude ='';
      this.latitude ='';
      //window.location.reload();
      loading.dismiss();
      this.router.navigateByUrl('/acceuil');
      alert('pub ajoute avec success');
    },(error: any) => {
      loading.dismiss();
     alert('Erreur de connection pub non enregistre');
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
  this.addpub();
  //this.router.navigateByUrl('/welcome')
  this.router.navigateByUrl('/welcome');
  //this.navCtrl.setRoot('/welcome');
}

ngOnInit() {

  this.verifieForm = new FormGroup({


  titre: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]),

      commentaire: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),

      photo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),

      bouton: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),

      contact: new FormControl('', [

      ]),


      rangpub: new FormControl('', [

      ]),


      longitude: new FormControl('', [

      ]),

      latitude: new FormControl('', [

      ]),


  });



}

}

