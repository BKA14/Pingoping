import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CustomFilterPipe } from './custom-filter.pipe';
import { Geolocation } from '@capacitor/geolocation';
import { DistanceCalculatorService } from './distance-calculator.service';


@Component({
  selector: 'app-restorant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  infiniteScrollDisabled: boolean = false;
  resto: any;
  grade: any;
  term: any;
  oldresto: any;
  page: number = 1;
  limit: number = 2;
  userlongitude: any;
  userlatitude: any;
  duration = 2000;
  private distanceCalculatorService: DistanceCalculatorService


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
    private toastCtrl: ToastController  // Injecter le ToastController
  ) {


    }

  ngOnInit() {

     this.restorant()  ;
     this.getsessionuser();
  }


    // Méthode pour afficher un toast
    async presentToast(message: string, color: string = 'danger') {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: this.duration, // Durée d'affichage du toast
        position: 'top',
        color: color,
      });
      toast.present();
      }


            getsessionuser(){

              this.grade= (localStorage.getItem('grade'));
              console.log(this.grade);

              }


  async restaurant() {

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
      duration: 8500,
    });


    this.page = 1;
    this.oldresto = this.resto;

    try {
    const res : any = await this._apiService.restorant(this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);


    if (res && res.length > 0) {
      this.resto = await res;
      this.openUrl();
    }
    else {
      this.resto = 'aucune_alerte';
    }

    loading.dismiss();

    } catch (error) {
    console.log('erreur de chargement', error);
    if (this.oldresto && this.oldresto.length > 0) {
      this.resto = this.oldresto;
    }
    else { this.resto = 'erreur_chargement'; }
    console.log('Erreur de chargement', error);
    loading.dismiss();
  }
    }


    async loadMore(event) {

      this.page++;
      this.oldresto = this.resto;

      try {
        const res : any  = await this._apiService.restaurant(this.page, this.limit).toPromise();
        console.log('SUCCESS ===', res);

        this.resto = this.resto.concat(res);
        event.target.complete();

          // Désactiver l'infinite scroll si moins de données retournées que la limite
      if (res.length < this.limit) {
        this.infiniteScrollDisabled = true;
      }
      } catch (error) {
        console.log('Erreur de chargement', error);
        if (this.oldresto && this.oldresto.length > 0) {
          this.resto = this.oldresto;
        }
        else { this.resto = 'erreur_chargement'; }
        event.target.complete();
      }
    }


    getWhatsAppLink(contact: string): string {
      const encodedContact = encodeURIComponent(contact);
      return `whatsapp://send?phone=${encodedContact}`;
    }


    appeler(numero: string) {
      this.callNumber.callNumber(numero, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }


    isImage(photo: string): boolean {
      if (!photo) {
        return false;
      }
      const trimmedPhoto = photo.trim().toLowerCase();
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
      return imageExtensions.some(ext => trimmedPhoto.endsWith(ext)) && trimmedPhoto !== 'non';
    }

      refreshPage(e: any) {

        this.term = '';
        this.page = 1;
        this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

        this.restaurant();
        this.getUserLocation();

        // Log pour indiquer le rafraîchissement
        console.log('Rafraîchissement de la page');

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


      async supprimer(resto){

        const loading = await this.loadingCtrl.create({
          message: 'Rechargement...',
         spinner:'lines',
        // showBackdrop:false,
          cssClass: 'custom-loading',
        });

        loading.present();

      this._apiService.supprimer_resto(resto.id).subscribe((res:any)  => {

        loading.dismiss();

        this.restaurant() ;

      },async (error: any) => {
        loading.dismiss();
        await this.presentToast("Erreur de connexion avec le serveur, veuillez réessayer.");

     })
     this.cdr.detectChanges();

      }

        // filtre pour affichage par catégorie
  transform(number: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(number, term, excludes);
  }


  async getUserLocation(): Promise<{ userLatitude: number, userLongitude: number } | null> {

    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const userLatitude = coordinates.coords.latitude;
      const userLongitude = coordinates.coords.longitude;
      console.log('Latitude:', userLatitude);
      console.log('Longitude:', userLongitude);

      this.userlongitude = userLongitude;
      this.userlatitude = userLatitude;

      return { userLatitude, userLongitude };
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
      return null;
    }
  }

  async openUrl() {
    const userLocationData = await this.getUserLocation();

    if (userLocationData) {
      const { userLatitude, userLongitude } = userLocationData;

      this.resto.forEach((restorant) => {
        const distance = this.distanceCalculatorService.haversineDistance(
          userLatitude,
          userLongitude,
          restorant?.latitude,
          restorant?.longitude
        );

        console.log(`Distance entre l'utilisateur et l'alerte : ${distance} mètres`);

        if (!isNaN(distance)) {
          restorant.distanceToUser = distance;
          console.log(`Distance entre l'utilisateur et l'alerte : ${restorant.distanceToUser} mètres`);
        } else {
          restorant.distanceToUser = 'Coordonnées invalides';
          console.error('Coordonnées invalides pour le restorant:', restorant);
        }
      });
    } else {
      console.error('Impossible de récupérer les coordonnées de l\'utilisateur.');
    }
  }


  convertMetersToKilometers(meters: number | string): string {
    if (typeof meters === 'string') {
      return meters;
    }

    if (meters < 4000) {
      return `${Math.floor(meters)} m`;
    } else {
      return `${Math.floor(meters / 1000)} km`;
    }
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
