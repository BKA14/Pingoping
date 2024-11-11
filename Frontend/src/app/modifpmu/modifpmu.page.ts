import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifpmu',
  templateUrl: './modifpmu.page.html',
  styleUrls: ['./modifpmu.page.scss'],
})
export class ModifpmuPage implements OnInit {
  verifieForm: FormGroup;

  id: any;
  commentaire1:any;
  numdujour: any;
  num2:any;
  commentaire2: any;
  nbrpartant:any;
  typecourse:any;
 pmu: any = [];
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
      // console.log(this.id);
      this.getpmu();
    })
  }

  getsession(){
    this.grade= (localStorage.getItem('grade'));
   //  console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getpmu();

       //  console.log('rafraichissement de la page');
        e.target.complete();
      },500);
      }



  async getpmu(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getpmu().subscribe((res:any) => {
    loading.dismiss();
   //  console.log("SUCCESS ===",res);
    this.pmu = res[0];


    this.commentaire1 = this.pmu.commentaire1;
    this.numdujour = this.pmu.numdujour;
    this.typecourse = this.pmu.typecourse;
    this.num2 = this.pmu.num2;
    this.nbrpartant = this.pmu.nbrpartant;
    this.commentaire2 = this.pmu.commentaire2;

   },(error: any) => {
    loading.dismiss();
   //  console.log("Erreur de connection ===",error);

})
    this.getsession();
}




async updatepmu(){

  let data = {
    id: this.id,
    commentaire1:this.commentaire1,
  numdujour: this.numdujour,
  num2: this.num2,
  commentaire2: this.commentaire2,
  nbrpartant: this.nbrpartant,
  typecourse: this.typecourse,

}

const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
 spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

loading.present();
this._apiService.updatepmu(this.id,data).subscribe((res:any) => {
  // console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);

  loading.dismiss();
  this.router.navigateByUrl('/welcome');
 },(error: any) => {
   //console.log("Erreur de connection",error);
  loading.dismiss();
})
}


async showLoading() {
 const loading = await this.loadingCtrl.create({
   message: 'Rechargement...',
   duration: 1500,
   cssClass: 'custom-loading',
 });

 loading.present();
 this.updatepmu();
 //this.router.navigateByUrl('/welcome')
 this.router.navigateByUrl('/welcome');
 //this.navCtrl.setRoot('/welcome');
}





ngOnInit() {

  this.getpmu();


  this.verifieForm = new FormGroup({
    commentaire1: new FormControl('', [
      Validators.required,
      Validators.minLength(2),

  ]),

nbrpartant: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),

numdujour: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),

num2: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
typecourse: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),
commentaire2: new FormControl('', [
  Validators.required,
  Validators.minLength(2),

]),



          }


          );


  }


}

