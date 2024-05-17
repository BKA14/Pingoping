import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modif-gateau',
  templateUrl: './modif-gateau.page.html',
  styleUrls: ['./modif-gateau.page.scss'],
})
export class ModifGateauPage implements OnInit {


  verifieForm: FormGroup;

  id: any;
  commentaire1:any;
  prix: any;
  lienphoto:any;
  commentaire2:any;
  commentaire3:any;
 gateau: any = [];
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
      this.getgateau();
    })
  }


  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getgateau();

        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }



  async getgateau(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getgateau().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.gateau = res[0];

    this.commentaire1 = this.gateau.commentaire1;
    this.commentaire2 = this.gateau.commentaire2;
    this.prix = this.gateau.prix;
    this.lienphoto = this.gateau.lienphoto;
    this.commentaire3 = this.gateau.commentaire3;
    console.log("Test ===",this.gateau.commentaire2);
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}



async updategateau(){

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
this._apiService.updategateau(this.id,data).subscribe((res:any) => {
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

  this.getgateau();

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
