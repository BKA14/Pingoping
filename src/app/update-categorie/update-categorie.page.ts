import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { __param } from 'tslib';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.page.html',
  styleUrls: ['./update-categorie.page.scss'],
})
export class UpdateCategoriePage implements OnInit {

  verifieForm: FormGroup;
  loaderToShow: any; 
  id: any;
  nomcategorie:any;
  categorie: any = [];
  categorie1: any = [];
  navCtrl: any;

  
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
      this.getcategorie(this.id);

    })
  
  }
   

  async updatecategorie(){

  let data = {
    nomcategorie: this.nomcategorie,
  
}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.updatecategorie(this.id,data).subscribe((res:any) => {
  console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);
  loading.dismiss();
  this.router.navigateByUrl('/categorie');
 },(error: any) => {
  console.log("Erreur de connection",error);
  loading.dismiss();
})
}


getcategorie (id){
  this._apiService.getcategorie3(id).subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    let categorie = res[0];
    this.nomcategorie = categorie.nom_categorie;
   },(error: any) => {
    console.log("Erreur de connection",error);
})
}


refreshPage(e){
  setTimeout(() => {
    this.getcategorie(this.id);
    console.log('rafraichissement de la page');
    e.target.complete();
  },500);
  }


ngOnInit() {
  
  this.verifieForm = new FormGroup({
  nom: new FormControl('', [
Validators.required,
Validators.minLength(2),
  ]),

    
  });
  


}
}