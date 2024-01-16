import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { CustomFilterPipe } from './custom-filter.pipe';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {

  term;
  handlerMessage = '';
  roleMessage = '';

  grade:any;
  nom:any;
   categorie1: any = [];
    navCtrl: any;
    prenom1:any;

    constructor(public _apiService: ApiService,
      private alertController: AlertController,
      private route: ActivatedRoute,
      private router: Router,
      private loadingCtrl: LoadingController,
      public loadingController: LoadingController
      )
    {
      this.getcategorie();
    }
    getsession(){
     this.grade= (localStorage.getItem('grade'));
     console.log(this.grade);
      }
      getsession1(){
        this.prenom1= (localStorage.getItem('prenom1'));
        console.log(this.prenom1);
         }

  getcategorie(){
    this._apiService.getcategorie1().subscribe((res:any) => {

      console.log("SUCCESS ===",res);
      this.categorie1 = res;

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
    this. getcategorie();
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

    this._apiService.presentAlert3(id).subscribe((res:any)  => {
      loading.dismiss();
      this. getcategorie();

    },(error: any) => {
      loading.dismiss();
      alert('Erreur de connection avec le serveur veillez reessayer');
      //this.navCtrl.setRoot('/welcome2');
      // console.log("ERREUR ===",error);
   })

      }

  async presentAlert3(id) {
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
    this. getcategorie();
  }

  ngOnInit()
  {
    this. getcategorie();
  }

  transform(categorie1: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(categorie1, term, excludes);
  }

  }
