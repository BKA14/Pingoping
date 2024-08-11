import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlertController, IonList, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { CustomFilterPipe } from './custom-filter.pipe';




@Component({

  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  activities = [
    { title: 'Signalisation', icon: 'alert-circle-outline', description: 'Envoyer des alertes aux différentes entreprises de votre ville.', link: '/signalisation'  },
    { title: 'Évènements à venir/Achat de ticket', icon: 'calendar-outline', description: 'Consultez les prochains événements.' , link: '/signalisation'  },
    { title: 'Restaurant', icon: 'restaurant', description: 'Découvrez nos fabuleux mets.', link: '/signalisation'  },
    { title: 'Lien utile', icon: 'link-outline', description: 'Accédez à des liens utiles.', link: '/numero-service' },
    { title: 'Numéros de service', icon: 'call-outline', description: 'Trouvez des numéros utiles.', link: '/numero-service'  },
    { title: 'Market', icon: 'cart-outline', description: 'Explorez notre marché.', link: '/signalisation'  }
  ];

term;
term2
handlerMessage = '';
roleMessage = '';


grade:any;
nom:any;
prenom1:any;
categorie: any = [];
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
    public loadingController: LoadingController
    )
  {

    this.getcategorie();
  }

  reloadPage() {
    window.location.reload();
  }

  getsession(){
   this.grade= (localStorage.getItem('grade'));
   console.log(this.grade);
    }
    getsession1(){
      this.prenom1= (localStorage.getItem('prenom1'));
      console.log(this.prenom1);
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
    console.log("SUCCESS ===",res);
    this.pageUrl= '/'+ this.lien ; // Initialisez cette variable avec l'URL souhaité depuis la base de données
    loading.dismiss();
   },(error: any) => {
   alert('Erreur de connection avec le serveur veillez reessayer');
   //this.navCtrl.setRoot('/welcome2');
   //this.router.navigateByUrl('/welcome2');
   loading.dismiss();
   // console.log("ERREUR ===",error);
})
this.getsession();
this.getsession1();
}



refreshPage(e){
setTimeout(() => {
  this.getentreprises();
  console.log('rafraichissement de la page');
  e.target.complete();
},500);
}


async getcategorie() {
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
  });
  await loading.present();

  try {
    this._apiService.getcategorie().subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
        this.categorie = res;
        loading.dismiss();
      },
      (error: any) => {
        console.log("Erreur de connection ", error);
        loading.dismiss();
      }
    );
  } catch (error) {
    console.error('Erreur inattendue :', error);
    loading.dismiss();
  }
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
  this.getentreprises();
}

ngOnInit()
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



