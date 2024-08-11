import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { ApiService } from '../api.service';
import { AlertController, IonContent, IonInfiniteScroll, IonList, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { CustomFilterPipe } from './custom-filter.pipe';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.page.html',
  styleUrls: ['./liste-user.page.scss'],
})
export class ListeUserPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


term;
handlerMessage = '';
roleMessage = '';

grade:any;
nom:any;
users: any = [];
navCtrl: any;
prenom1:any;
rang: any = [];
list_user: any;
page: number = 1;
limit : number = 30;
infiniteScrollDisabled: boolean = false;


constructor(public _apiService: ApiService,
private alertController: AlertController,
private route: ActivatedRoute,
private router: Router,
private loadingCtrl: LoadingController,
public loadingController: LoadingController,
private renderer: Renderer2,

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
  this.page = 1;
this.list_user = this.users;
this._apiService.getuser(this.page, this.limit).subscribe((res:any) => {

console.log("SUCCESS ===",res);
if (res && res.length < 1) {
this.users = 'aucune_alerte';
}
else {
this.users = res;
}

},(error: any) => {

if (this.list_user && this.list_user.length > 0) {
this.users = this.list_user;
}
else { this.users = 'erreur_chargement'; }
alert('Erreur de connection avec le serveur veillez reessayer');

// this.router.navigateByUrl('/welcome2');

})
this.getsession();
this.getsession1();
}

  async loadMore(event) {
    this.page++;
    try {
      const res : any  = await this._apiService.getuser(this.page, this.limit).toPromise();
      console.log('SUCCESS ===', res);

      this.users = this.users.concat(res);
      event.target.complete();

        // Désactiver l'infinite scroll si moins de données retournées que la limite
    if (res.length < this.limit) {
      this.infiniteScrollDisabled = true;
    }
    } catch (error) {
      console.log('Erreur de chargement', error);
      if (this.list_user && this.list_user.length > 0) {
        this.users = this.list_user;
      }
      else { this.users = 'erreur_chargement'; }
      event.target.complete();
    }
  }


  async refreshPage(e: any) {

    // Réinitialiser les données de la page et du tableau pub
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

    // Rafraîchir les pubs
    await this.getuser();

    // Terminer l'animation de rafraîchissement
    e.target.complete();
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


private hideButtonTimeout: any;
@ViewChild('scrollButton', { static: false }) scrollButton: ElementRef;
@ViewChild(IonContent, { static: false }) content: IonContent;


ngAfterViewInit() {
  this.addScrollListener();
  this.resetHideButtonTimer() ;
}

scrollToTop() {
  this.content.scrollToTop(500); // Utiliser la méthode scrollToTop d'Ionic
}

addScrollListener() {
  this.content.getScrollElement().then(scrollElement => {
    this.renderer.listen(scrollElement, 'scroll', () => {
      this.handleScroll(scrollElement);
      this.resetHideButtonTimer();
    });
  });
}


handleScroll(scrollElement) {
  const scrollButton = this.scrollButton.nativeElement;

  if (!scrollElement || !scrollButton) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollElement;
  console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

  if (scrollTop >= 7000 ) {
    this.renderer.setStyle(scrollButton, 'display', 'block');
  } else {
    this.renderer.setStyle(scrollButton, 'display', 'none');
  }
}

resetHideButtonTimer() {
  if (this.hideButtonTimeout) {
    clearTimeout(this.hideButtonTimeout);
  }
  this.hideButtonTimeout = setTimeout(() => {
    this.renderer.setStyle(this.scrollButton.nativeElement, 'display', 'none');
  }, 2000);
}


  }




