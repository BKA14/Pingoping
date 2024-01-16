import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modif-menuisier',
  templateUrl: './modif-menuisier.page.html',
  styleUrls: ['./modif-menuisier.page.scss'],
})
export class ModifMenuisierPage implements OnInit {


  verifieForm: FormGroup;

  id: any;
  commentaire1:any;
  prix: any;
  lienphoto: any;
  commentaire2:any;
  commentaire3:any;
  menuisier: any = [];
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
      this.getmenuisier();
    })
  }


  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getmenuisier();
        console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }


  async getmenuisier(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getmenuisier().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.menuisier = res[0];

    this.commentaire1 = this.menuisier.commentaire1;
    this.commentaire2 = this.menuisier.commentaire2;
    this.prix = this.menuisier.prix;
    this.lienphoto = this.menuisier.lienphoto;
    this.commentaire3 = this.menuisier.commentaire3;
    console.log("Test ===",this.menuisier.commentaire2);
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);
})
    this.getsession();
}


async updatemenuisier(){

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
this._apiService.updatemenuisier(this.id,data).subscribe((res:any) => {
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

  this.getmenuisier();

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
