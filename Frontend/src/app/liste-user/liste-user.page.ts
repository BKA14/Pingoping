import { Component, OnInit, ViewChild } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { ApiService } from '../api.service';
import { AlertController, IonList, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { CustomFilterPipe } from './custom-filter.pipe';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.page.html',
  styleUrls: ['./liste-user.page.scss'],
})
export class ListeUserPage implements OnInit {
  term;
  handlerMessage = '';
  roleMessage = '';

  grade:any;
  nom:any;
   users: any = [];
    navCtrl: any;
    prenom1:any;
    rang: any = [];

    constructor(public _apiService: ApiService,
      private alertController: AlertController,
      private route: ActivatedRoute,
      private router: Router,
      private loadingCtrl: LoadingController,
      public loadingController: LoadingController,
      )
    {
      this.getuser();
      this.getgrade();
    }
    getsession(){
     this.grade= (localStorage.getItem('grade'));
     console.log(this.grade);
      }
      getsession1(){
        this.prenom1= (localStorage.getItem('prenom1'));
        console.log(this.prenom1);
         }

  getuser(){
    this._apiService.getuser().subscribe((res:any) => {

      console.log("SUCCESS ===",res);
      this.users = res;

     },(error: any) => {
     alert('Erreur de connection avec le serveur veillez reessayer');
     //this.navCtrl.setRoot('/welcome2');
     this.router.navigateByUrl('/welcome2');
     // console.log("ERREUR ===",error);
  })
  this.getsession();
  this.getsession1();

  }


  refreshPage(e){
  setTimeout(() => {
    this.getuser();
    console.log('rafraichissement de la page');
    e.target.complete();
  },500);
  }

    async deconnect(){

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

  localStorage.clear();
    this.router.navigateByUrl('/login2');
    loading.dismiss();
    }

    async supprimer(id){

      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
       spinner:'lines',
      // showBackdrop:false,
        cssClass: 'custom-loading',
      });

      loading.present();

    this._apiService.presentAlert2(id).subscribe((res:any)  => {
      loading.dismiss();
      this.getuser();

    },(error: any) => {
      loading.dismiss();
      alert('Erreur de connection avec le serveur veillez reessayer');
      //this.navCtrl.setRoot('/welcome2');
      // console.log("ERREUR ===",error);
   })

      }


   getgrade(){
    this._apiService.getgrade().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.rang = res;

     },(error: any) => {
      console.log("Erreur de connection",error);
  })
  }

  async presentAlert2(id) {
    const alert = await this.alertController.create({
      header: 'Etes-vous sur de vouloir supprimer cette entreprise ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {

            this.supprimer(id);

        },
        },
    ],
    });
  return alert.present();
  }


  async quitter(id) {
    const alert = await this.alertController.create({
      header: 'Etes-vous sur de vouloir quitter Lokalist ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            App.exitApp();
        },
        },
    ],
    });
  return alert.present();
  }



  ionViewWillEnter()
  {
    this.getuser();
  }

  ngOnInit()
  {
    this.getuser();
  }
  @ViewChild('maliste', {static: false}) list: IonList;

get userCount(){

  return  this.users.length;

}


transform(users: any, term: string, excludes: any = []): any {
  return CustomFilterPipe.filter(users, term, excludes);
}

  }




