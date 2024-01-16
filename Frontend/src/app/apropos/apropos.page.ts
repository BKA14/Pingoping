import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.page.html',
  styleUrls: ['./apropos.page.scss'],
})
export class AproposPage implements OnInit {

  whatsappNumberf: any;
  id: any;
  contact: any;
  commentaire: any;
  email: any;
  lienphoto:any;
  a_propos: any = [];
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
      this.getapropos();
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

  async getapropos(){
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getapropos().subscribe((res:any) => {
    loading.dismiss();
    console.log("SUCCESS ===",res);
    this.a_propos = res;
   },(error: any) => {
    loading.dismiss();
    console.log("Erreur de connection ===",error);

})
    this.getsession();
}


  openUrl(){ window.open('https://www.cci.bf'); }

  acceuil() {

    this.router.navigateByUrl('/acceuil');

  }

  service() {

    this.router.navigateByUrl('/welcome');

  }

  apropos() {

    this.router.navigateByUrl('/apropos');

  }

  ping() {

    this.router.navigateByUrl('/ping');

  }

}
