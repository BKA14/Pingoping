import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';




@Component({

  selector: 'app-welcome3',
  templateUrl: './welcome3.page.html',
  styleUrls: ['./welcome3.page.scss'],
})
export class Welcome3Page implements OnInit {
term;
handlerMessage = '';
roleMessage = '';

nom:any;
 entreprises: any = [];
  navCtrl: any;
  loadingCtrl: any;
 

  constructor(public _apiService: ApiService,private alertController: AlertController, 
    private route: ActivatedRoute,
    private router: Router) 
  { 
    this.getentreprises();
  }
  
 
 
getentreprises(){
  this._apiService.getentreprisess().subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    this.entreprises = res;
    
   },(error: any) => {
   // alert('Erreur de connection');
   this.navCtrl.setRoot('/welcome2');
   //this.router.navigateByUrl('/welcome2');
   // console.log("ERREUR ===",error);
})

}
refreshPage(e){
setTimeout(() => {
  this.getentreprises();
  console.log('rafraichissement de la page');
  e.target.complete();
},500);
}


async presentAlert(id) {
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
          this._apiService.presentAlert(id).subscribe((res:any)  => {
            this.getentreprises();
           
          });
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

async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    duration: 4000,
    cssClass: 'custom-loading',
  });

  loading.present();
  this.router.navigateByUrl('/welcome')
  //this.navCtrl.setRoot('/welcome');
  this.getentreprises();
}

ngOnInit()
{}

}



