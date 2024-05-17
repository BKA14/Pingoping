import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modif-coiffeur',
  templateUrl: './modif-coiffeur.page.html',
  styleUrls: ['./modif-coiffeur.page.scss'],
})
export class ModifCoiffeurPage implements OnInit {


  verifieForm: FormGroup;

  id: any;
  commentaire1:any;
  prix: any;
  lienphoto:any;
  commentaire2:any;
  commentaire3:any;
  coiffeur: any = [];
  grade: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
  public loadingController: LoadingController,
  private call: CallNumber
  ) {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      console.log(this.id);
      this.getcoiffeur();
    })
  }


  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getcoiffeur();

        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }



  async getcoiffeur(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getcoiffeur().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.coiffeur = res[0];

    this.commentaire1 = this.coiffeur.commentaire1;
    this.commentaire2 = this.coiffeur.commentaire2;
    this.prix = this.coiffeur.prix;
    this.lienphoto = this.coiffeur.lienphoto;
    this.commentaire3 = this.coiffeur.commentaire3;
    console.log("Test ===",this.coiffeur.commentaire2);
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}



async updatecoiffeur(){

  let data = {
  id: this.id,
  commentaire1:this.commentaire1,
  commentaire2:this.commentaire2,
  commentaire3:this.commentaire3,
  prix: this.prix,
  lienphoto:this.lienphoto,
}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.updatecoiffeur(this.id,data).subscribe((res:any) => {
  loading.dismiss();
  console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);
  this.router.navigateByUrl('/welcome');
 },(error: any) => {
  loading.dismiss();
  console.log("Erreur de connection",error);
})
}


ngOnInit() {

  this.getcoiffeur();

  this.verifieForm = new FormGroup({
    prix: new FormControl('', [
      Validators.required,
      Validators.minLength(2),

  ]),

lienphoto: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
commentaire1: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
commentaire2: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),

commentaire3: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),



          }


          );


  }


}
