import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-modif-plomberie',
  templateUrl: './modif-plomberie.page.html',
  styleUrls: ['./modif-plomberie.page.scss'],
})
export class ModifPlomberiePage implements OnInit {


  verifieForm: FormGroup;

  id: any;
  commentaire1:any;
  prix: any;
  lienphoto: any;
  commentaire2:any;
  commentaire3:any;
  plomberie: any = [];
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
      this.getplomberie();
    })
  }


  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getplomberie();
        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }


  async getplomberie(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getplomberie().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.plomberie = res[0];

    this.commentaire1 = this.plomberie.commentaire1;
    this.commentaire2 = this.plomberie.commentaire2;
    this.prix = this.plomberie.prix;
    this.lienphoto = this.plomberie.lienphoto;
    this.commentaire3 = this.plomberie.commentaire3;
    console.log("Test ===",this.plomberie.commentaire2);
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);
})
    this.getsession();
}


async updateplomberie(){

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
this._apiService.updateplomberie(this.id,data).subscribe((res:any) => {
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

  this.updateplomberie();

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
