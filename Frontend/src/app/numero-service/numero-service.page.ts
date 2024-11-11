import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CustomFilterPipe } from './custom-filter.pipe';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-numero-service',
  templateUrl: './numero-service.page.html',
  styleUrls: ['./numero-service.page.scss'],
})
export class NumeroServicePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  infiniteScrollDisabled: boolean = false;
  number: any;
  grade: any;
  prenom1: string;
  iduser: string;
  numuser: string;
  idpub: string;
  term: any;
  oldnumber: any;
  page: number = 1;
  limit: number = 28;
  search: boolean = false;


  constructor(
    private http: HttpClient,
    private _apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private callNumber: CallNumber,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {


    }


  ngOnInit() {

     this.getsessionuser();

     this.numero() ;
     this.cdr.detectChanges(); // Détecter et appliquer les changements
  }


  getsessionuser(){

    this.grade= (localStorage.getItem('grade'));
    // console.log(this.grade);

     }


    async numero() {

      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        spinner: 'lines',
        cssClass: 'custom-loading',
        duration: 10000,
      });

      this.page = 1;
      this.oldnumber = this.number;

      try {
      const res : any = await this._apiService.numero_service(this.page, this.limit).toPromise();
      // console.log('SUCCESS ===', res);

      if (res && res.length < 1) {
        this.number = 'aucune_alerte';
      } else {
        this.number =  res;
      }

      loading.dismiss();

      } catch (error) {
     //  console.log('erreur de chargement', error);
      if (this.oldnumber && this.oldnumber.length > 0) {
        this.number = this.oldnumber;
      }
      else { this.number = 'erreur_chargement'; }
      // console.log('Erreur de chargement', error);
      loading.dismiss();
    }

      }



    async loadMore(event) {

      this.page++;
      this.oldnumber = this.number;

      try {
        const res : any  = await this._apiService.numero_service(this.page, this.limit).toPromise();
        // console.log('SUCCESS ===', res);

        this.number = this.number.concat(res);
        event.target.complete();

          // Désactiver l'infinite scroll si moins de données retournées que la limite
      if (res.length < this.limit) {
        this.infiniteScrollDisabled = true;
      }
      } catch (error) {
      //   console.log('Erreur de chargement', error);
        if (this.oldnumber && this.oldnumber.length > 0) {
          this.number = this.oldnumber;
        }
        else { this.number = 'erreur_chargement'; }
        event.target.complete();
      }
    }


    appeler(numero: string) {
      this.callNumber.callNumber(numero, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }


      refreshPage(e: any) {
        this.numero();
        // Log pour indiquer le rafraîchissement
        // console.log('Rafraîchissement de la page');
        // Terminer l'animation de rafraîchissement
        e.target.complete();
      }


      async presentAlert(id) {
        const alert = await this.alertController.create({
          header: 'Etes-vous sur de vouloir supprimer ce numero ?',
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
      this.cdr.detectChanges();
      }


      async supprimer(number){

        const loading = await this.loadingCtrl.create({
          message: 'Rechargement...',
         spinner:'lines',
        // showBackdrop:false,
          cssClass: 'custom-loading',
        });

        loading.present();

      this._apiService.supprimer_numero(number.id).subscribe((res:any)  => {

        loading.dismiss();

        this.numero() ;

      },(error: any) => {
        loading.dismiss();
        alert('Erreur de connection avec le serveur veillez reessayer');

     })
     this.cdr.detectChanges();

      }

        // filtre pour affichage par catégorie
  transform(number: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(number, term, excludes);
  }




  ////////////////fleche scroll haut ////////////////////////////

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
  // console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

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
////////////////////////////////



search_active(event) {
  const searchTerm = event.target.value; // Obtenez la valeur de l'entrée

  if (searchTerm.trim() !== '') {
    this.search = true;
    this.load_numero_search(event);
  }else {
    this.search = false;
    this.term = '';
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
    this.numero();
  }
}


getLoadFunction(event) {

 if (this.search){
    this.load_more_search(event);
  }
  else {
    this.loadMore(event);
  }
}



async load_numero_search(event) {
 this.page = 1;
  this.oldnumber = this.number;

  try {
    const res : any = await this._apiService.load_numero_search(this.term, this.page, this.limit).toPromise();
   //  console.log('SUCCESS ===', res);

    if (res && res.length < 1) {
      this.number = 'aucune_alerte';
    }
    else {
       this.number = res;
    }

    } catch (error) {
    if (this.oldnumber && this.oldnumber.length > 0) {
      this.number = this.oldnumber;
    }
    else { this.number = 'erreur_chargement'; }
   //  console.log('Erreur de chargement', error);
  }
}


async load_more_search(event) {
  this.page++;
  this.oldnumber = this.number;
  try {
    const res : any  = await this._apiService.load_numero_search(this.term, this.page, this.limit).toPromise();
   //  console.log('SUCCESS ===', res);

    this.number = this.number.concat(res);
    event.target.complete();

      // Désactiver l'infinite scroll si moins de données retournées que la limite
  if (res.length < this.limit) {
    this.infiniteScrollDisabled = true;
    this.search = false ;
  }
  } catch (error) {
   //  console.log('Erreur de chargement', error);
    if (this.oldnumber && this.oldnumber.length > 0) {
      this.number= this.oldnumber;
    }
    else { this.number = 'erreur_chargement'; }
    event.target.complete();
  }
}


}
