import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pmu',
  templateUrl: './pmu.page.html',
  styleUrls: ['./pmu.page.scss'],
})
export class PmuPage implements OnInit {


  id: any;
  commentaire1:any;
  numdujour: any;
  num2:any;
  commentaire2:any;
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
      console.log(this.id);
      this.getpmu();
    })
  }



  ngOnInit() {
  }
  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }

     refreshPage(e){
      setTimeout(() => {
        this.getpmu();

        console.log('rafraichissement de la page');
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
    console.log("SUCCESS ===",res);
    this.pmu = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}


}
