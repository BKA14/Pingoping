import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlertController, IonList, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { CustomFilterPipe } from './custom-filter.pipe';
import { NotificationService } from '../notification.service';


@Component({

  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  activities = [
    { title: 'Signalisation', icon: 'alert-circle-outline', description: 'Envoyer des alertes aux différentes entreprises de votre ville.', link: '/signalisation'  },
    { title: 'Évènements à venir', icon: 'calendar-outline', description: 'Consultez les prochains événements.' , link: '/evenement'  },
    { title: 'Restaurant', icon: 'restaurant-outline', description: 'Dégusté les fabuleux mets de vos restaurants préférés.', link: '/restaurant'  },
    { title: 'Market', icon: 'bag-outline', description: 'Découvrez nos différents produits.', link: '/market' },
    { title: 'Professionnels à proximité', icon: 'call-outline', description: 'Besoin d\'un service ?.', link: '/numero-service'  },
    { title: 'PMU', icon: 'analytics-outline', description: 'Pronostic PMU.', link: '/pmu'  },
    { title: 'Service de livraison Bobo-Dioulasso', icon: 'bicycle-outline', description: 'Contactez-nous pour organiser une livraison rapide et efficace.', link: '/livraison'  },
    { title: 'Pièces de moto', icon: 'cog-outline', description: 'Achetez ou commandez des pièces de moto de qualité.', link: '/piece-moto'  }
  ];


term;
term2
handlerMessage = '';
roleMessage = '';


grade:any;
nom:any;
prenom1:any;

 entreprises: any = [];
 lien: any;
  navCtrl: any;
  pageUrl: any;

  public progress = 0;

  constructor(public _apiService: ApiService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private notificationService: NotificationService
    )
  {

  }


    ngOnInit()
  {
  // pour initialiser les notiications push
  this.notificationService.initializePushNotifications();
  }


  reloadPage() {
    window.location.reload();
  }

  getsession(){
   this.grade= (localStorage.getItem('grade'));
   // console.log(this.grade);
    }

  getsession1(){
    this.prenom1= (localStorage.getItem('prenom1'));
    // console.log(this.prenom1);
    }


  async getentreprises(){

  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });
  loading.present();

  this._apiService.getentreprisess().subscribe((res:any) => {

    this.entreprises = res; // Pour afficher les services sur l'app
   //  console.log("SUCCESS ===",res);
    this.pageUrl= '/'+ this.lien ; // Initialisez cette variable avec l'URL souhaité depuis la base de données
    loading.dismiss();
   },(error: any) => {
   alert('Erreur de connection avec le serveur veillez reessayer');
   //this.navCtrl.setRoot('/welcome2');
   //this.router.navigateByUrl('/welcome2');
   loading.dismiss();
})
this.getsession();
this.getsession1();
}



refreshPage(e){
setTimeout(() => {
  // console.log('rafraichissement de la page');
  e.target.complete();
},500);
}


  async supprimer(id){

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });

    loading.present();

  this._apiService.presentAlert(id).subscribe((res:any)  => {
    loading.dismiss();


  },(error: any) => {
    loading.dismiss();
    alert('Erreur de connection avec le serveur veillez reessayer');
    //this.navCtrl.setRoot('/welcome2');
    // console.log("ERREUR ===",error);
 })

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

          this.supprimer(id);

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
}

ionViewWillEnter()
{
}


@ViewChild('maliste', {static: false}) list: IonList;

get entrepriseCount(){

  return  this.entreprises.length;

}

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



transform(entreprises: any, term: string, excludes: any = []): any {
  return CustomFilterPipe.filter(entreprises, term, excludes);
}

}



