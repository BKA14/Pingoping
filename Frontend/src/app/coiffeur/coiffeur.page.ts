import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-coiffeur',
  templateUrl: './coiffeur.page.html',
  styleUrls: ['./coiffeur.page.scss'],
})
export class CoiffeurPage implements OnInit {



  whatsappNumberf: any;
  id: any;
  commentaire1: any;
  commentaire2: any;
  commentaire3: any;
  prix: any;
  lienphoto:any;
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



  ngOnInit() {
  }
  getsession(){
    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);
     }


  getwhatsap(){
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
    this.coiffeur = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}

}
