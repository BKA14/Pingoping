import { timeService } from './../timeservice.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, NgZone, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonInfiniteScroll, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CustomFilterPipe } from './custom-filter.pipe';
import { DistanceCalculatorService } from './distance-calculator.service';
import { Geolocation } from '@capacitor/geolocation';
import { WebSocketService } from '../websocket.service';
import { interval, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { authService } from '../services/auth.service';

@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.page.html',
  styleUrls: ['./alerte.page.scss'],
})
export class AlertePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  oldalert: any[];
  search: boolean = false;
  alertLoaded: boolean = false;
  alertLoaded2: boolean = false;
  ville: any;
  service: any;
  ville_choisi : string ;
  service_choisi :  string ;
  search2: boolean = false;
  userData: any;
  serverTime: string | number | Date;


  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
  const link = this.el.nativeElement.href;
  if (link) {
  window.open(link, '_blank');
  event.preventDefault();
  }
  }


  alert: any;
  page: number = 1;
  limit: number = 10;
  rapport: any;
  isEditingRapport = false;
  recherche_date = false;
  editingRapportId: number | null = null;
  modif_rapport : any;
  oui_terminer =  'oui';
  non_terminer = 'non';
  term : any;
  term2: any;
  startDate: string = '';  // Date de début
  endDate: string = '';  // Date de fin

  filteredAlerts: any[] = [];  // Les alertes filtrées
  selectedStatus: string ;  // Statut sélectionné
  userlatitude: any;
  userlongitude: any;
  private refreshTimeout;
  public showArrow: boolean = false;
  private intervalId: any;
  public receivedMessage: any;
  private websocketSubscription: Subscription;
  infiniteScrollDisabled: boolean = false;
  updateSubscription: any;
  searchForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private distanceCalculatorService: DistanceCalculatorService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private renderer: Renderer2,
    private navCtrl: NavController,
    private wsService: WebSocketService,
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: authService,
    private timeService: timeService,
  ) {
    this.loadalert();
    this.loadInitialAlerts();
    this.searchForm = this.fb.group({
      query: ['']
    });
   }

   ngOnInit() {
    this.getservice();
    this.getville();
    this.updateSubscription = interval(30000).subscribe(async () => {
      await this.openUrl();
      this.cdr.detectChanges(); // Détecter et appliquer les changements
      });

    this.loadInitialAlerts();

      this.authService.userData$.subscribe(data => {
        this.userData = data;
      });

      ////l'heure/////
      this.timeService.getServerTime().subscribe((response) => {
        this.serverTime = response.serverTime;
        console.log('serveur time', this.serverTime );
      });
  }


  async getservice(){

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
      duration: 10000,
    });
    loading.present();

    this._apiService.getservice().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.service = res;
      loading.dismiss();
     },(error: any) => {
      console.log("Erreur de connection ",error);
      loading.dismiss();
  })
  }

  async getville(){
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
      duration: 8500,
    });
    loading.present();

    this._apiService.getville().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.ville = res;
      loading.dismiss();
     },(error: any) => {
      console.log("Erreur de connection ",error);
      loading.dismiss();
  })
  }


  ngOnDestroy() {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }

  loadInitialAlerts() {
    this.websocketSubscription = this.wsService.listenForSignalisationUpdates().subscribe(
      (message) => {
        if (Array.isArray(message)) {
          // Chargement initial des alertes
          this.alert = message;
          console.log('Initial alerts loaded:', this.alert);
        } else {
          // Traitement des actions individuelles
          switch (message.action) {
            case 'insert':
              this.alert.unshift(message);
              console.log('New alert inserted:', message);
              break;
            case 'update':
              const updatedIndex = this.alert.findIndex(alert => alert.id === message.old_signalisation_id);
              if (updatedIndex !== -1) {
                this.alert[updatedIndex] = message;
                console.log('Alert updated:', message);
                console.log('Alert updated:', message.old_signalisation_id);
              }
              break;
            case 'delete':
              this.alert = this.alert.filter(alert => alert.id !== message.signalisation_id);
              console.log('Alert deleted:', message);
              break;
            default:
              console.log('Unknown action:', message);
          }
        }
      },
      (err) => console.error('WebSocket Error:', err)
    );
  }


    async loadalert() {

      this.page = 1;
      this.oldalert = this.alert;

      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        spinner: 'lines',
        cssClass: 'custom-loading',
        duration: 8500,
      });

      await loading.present();

      try {
        const res : any = await this._apiService.loadalert(this.page, this.limit).toPromise();
        console.log('SUCCESS ===', res);

        if (res && res.length > 0) {
          this.alert = res;
          await this.openUrl();
        }
        else {
          this.alert = 'aucune_alerte';
        }

        loading.dismiss();
        } catch (error) {
        if (this.oldalert && this.oldalert.length > 0) {
          this.alert = this.oldalert;
        }
        else { this.alert = 'erreur_chargement'; }
        console.log('Erreur de chargement', error);
        loading.dismiss();
      }
    }

    async loadMore(event) {

      this.page++;
      this.oldalert = this.alert;

      try {
        const res : any  = await this._apiService.loadalert(this.page, this.limit).toPromise();
        console.log('SUCCESS ===', res);

        this.alert = this.alert.concat(res);
        event.target.complete();

          // Désactiver l'infinite scroll si moins de données retournées que la limite
      if (res.length < this.limit) {
        this.infiniteScrollDisabled = true;
      }
      } catch (error) {
        console.log('Erreur de chargement', error);
        if (this.oldalert && this.oldalert.length > 0) {
          this.alert = this.oldalert;
        }
        else { this.alert = 'erreur_chargement'; }
        event.target.complete();
      }
    }


    search_active(event: any) {
      const searchTerm = event.target.value; // Obtenez la valeur de l'entrée

      if (searchTerm.trim() !== '') {
        this.search = true;
        this.loadalert_search(); // Déclencher la fonction de recherche
      } else {
        this.search = false; // Réinitialiser la recherche si le champ est vide
        this.term = '';
        this.page = 1;
        this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
        this.loadalert();
      }
    }


    getLoadFunction(event) {
      if (this.search2) {
        this.More_filterAlerts(event);
      } else if (this.search){
        this.load_more_search(event);
      }
      else {
        this.loadMore(event);
      }
    }



    async loadalert_search() {
     this.page = 1;
      this.oldalert = this.alert;

      try {
        const res : any = await this._apiService.loadalert_search(this.term, this.page, this.limit).toPromise();
        console.log('SUCCESS ===', res);

        if (res && res.length < 1) {
          this.alert = 'aucune_alerte';
        }
        else {
           this.alert = res;
          await  this.openUrl();
        }

        } catch (error) {
        if (this.oldalert && this.oldalert.length > 0) {
          this.alert = this.oldalert;
        }
        else { this.alert = 'erreur_chargement'; }
        console.log('Erreur de chargement', error);
      }
    }


    async load_more_search(event) {
      this.page++;
      this.oldalert = this.alert;
      try {
        const res : any  = await this._apiService.loadalert_search(this.term, this.page, this.limit).toPromise();
        console.log('SUCCESS ===', res);

        this.alert = this.alert.concat(res);
        event.target.complete();

          // Désactiver l'infinite scroll si moins de données retournées que la limite
      if (res.length < this.limit) {
        this.infiniteScrollDisabled = true;
        this.search = false ;
      }
      } catch (error) {
        console.log('Erreur de chargement', error);
        if (this.oldalert && this.oldalert.length > 0) {
          this.alert = this.oldalert;
        }
        else { this.alert = 'erreur_chargement'; }
        event.target.complete();
      }
    }


  isImage(photo: string): boolean {
    if (!photo) {
      return false;
    }
    const trimmedPhoto = photo.trim().toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
    return imageExtensions.some(ext => trimmedPhoto.endsWith(ext)) && trimmedPhoto !== 'non';
  }

  isVideo(photo: string): boolean {
    if (!photo) {
      return false;
    }
    const trimmedPhoto = photo.trim().toLowerCase();
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => trimmedPhoto.endsWith(ext)) && trimmedPhoto !== 'non';
  }


  startAlertChecking() {
         // Afficher la flèche rouge
         this.showArrow = true;

         // Masquer la flèche après 10 secondes
         if (this.refreshTimeout) {
           clearTimeout(this.refreshTimeout);
         }
         this.refreshTimeout = setTimeout(() => {
           this.showArrow = false;
         }, 10000);

  }



//////////// recuperer la date /////////////////////

formatCommentTime(time: string): string {
  const commentDate = new Date(time);
  const now = new Date(this.serverTime); // Utiliser l'heure du serveur
  const diffInSeconds = Math.round((now.getTime() - commentDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Il y a quelques instants';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.round(diffInSeconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.round(diffInSeconds / 3600);
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    return commentDate.toLocaleDateString('fr-FR');
  }
}


  openInMaps(latitude: number, longitude: number): void {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  }


  async refreshPage(e: any) {
   // Réinitialiser les données de la page et du tableau pub
   this.term = '';

  this.startDate = '',
  this.endDate = '',
  this.selectedStatus = '',
  this.service_choisi = '',
  this.ville_choisi = '',

  this.search = false;
  this.search2= false;
  this.page = 1;
  this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

    await this.loadalert();

    // Log pour indiquer le rafraîchissement
    console.log('Rafraîchissement de la page');

    // Terminer l'animation de rafraîchissement
    e.target.complete();
  }

  async terminer(alert) {
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
      duration: 8500,
    });

    try {
      await loading.present();

      alert.statut = 'oui';
      let data = {
        statut: 'oui',
        nom_admin: this.userData.nom,
        prenom_admin: this.userData.prenom1,
        numuser_admin: this.userData.numuser,
        iduser_admin: this.userData.iduser,
      };

      this._apiService.terminer_alerte(alert.id, data).subscribe(
        (res: any) => {
          console.log("SUCCESS ===", res);
          loading.dismiss(); // Success case
        },
        (error: any) => {
          alert("Erreur de connection, réessayer");
          loading.dismiss(); // Error case
        }
      );
    } catch (err) {
      console.error("Erreur inattendue : ", err);
      alert("Une erreur inattendue est survenue.");
      loading.dismiss(); // Ensure dismiss is called on error
    }
  }


  async soumettre_rapport(alert){

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
      duration: 8500,
    });

    loading.present();
    alert.statut_rapport='oui';

    let data = {
      rapport: alert.rapport, // Récupérer le contenu du textarea
      statut_rapport : 'oui'
    };

  this._apiService.soumettre_rapport(alert.id,data).subscribe((res:any) => {
    console.log("SUCCESS ===",res);

    loading.dismiss();
   },(error: any) => {
    alert("Erreur de connection, reesayer");
    loading.dismiss();
  })

  }


  editField(alertId: number) {
    this.isEditingRapport = true;
    this.editingRapportId = alertId;
    this.modif_rapport = this.alert.find(alert => alert.id === alertId).rapport;
  }


  resetEditing() {
    this.isEditingRapport = false;
  }


  annuler() {
    this.isEditingRapport = false;
  }

  annuler_date(){
    this.recherche_date = false;
  }


  async modifier(alert) {

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });

    loading.present();
    alert.statut_rapport='oui';
    alert.rapport = this.modif_rapport;

    let data = {
      rapport: this.modif_rapport, // Récupérer le contenu du textarea
      statut_rapport : 'oui'
    };

  this._apiService.soumettre_rapport(alert.id,data).subscribe((res:any) => {
    console.log("SUCCESS ===",res);

    loading.dismiss();
   },(error: any) => {
    alert("Erreur de connection, reesayer");
    loading.dismiss();
  })
  this.resetEditing();
}

updateDateFin(event: CustomEvent) {
  this.endDate = event.detail.value;
  // Vérifier que la date de fin est supérieure à la date de début
  if (this.startDate && this.endDate < this.startDate) {
    // Afficher une alerte ou gérer l'erreur comme vous le souhaitez
    alert('La date de fin doit être supérieure à la date de début');
    this.endDate = this.startDate;
  }
}

choisir_date(){
  this.recherche_date = !this.recherche_date;
  this.filterAlerts();
}


filterAlerts() {

  if (this.selectedStatus !== '' || this.service_choisi !== '' || this.ville_choisi !== '' || (this.startDate !== '' && this.endDate !== '') ) {
    this.search2= true;
    this.infiniteScrollDisabled = false;
    this.filterAlerts2();
  }

}

async filterAlerts2() {

  this.page = 1;
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
    duration: 8500,
  });

  await loading.present();

  try {
    const res: any = await this._apiService.loadalert_search_all(
      this.startDate || '',
      this.endDate || '',
      this.selectedStatus || '',
      this.service_choisi || '',
      this.ville_choisi || '',
      this.page,
      this.limit
    ).toPromise();

    console.log('SUCCESS ===',  this.selectedStatus );

    if (res && res.length > 0) {
      this.alert = res;
      this.openUrl();
    } else {
      this.alert = 'aucune_alerte';
    }
  } catch (error) {
    console.error('Erreur de chargement', error);

    if (this.oldalert && this.oldalert.length > 0) {
      this.alert = this.oldalert;
    } else {
      this.alert = 'erreur_chargement';
    }
  } finally {
    loading.dismiss();
  }
}


async More_filterAlerts(event) {

  this.page++;
  this.oldalert = this.alert;
  try {
    const res: any = await this._apiService.loadalert_search_all(
      this.startDate || '',
      this.endDate || '',
      this.selectedStatus || '',
      this.service_choisi || '',
      this.ville_choisi || '',
      this.page,
      this.limit
    ).toPromise();

    console.log('SUCCESS ===', res);

    this.alert = this.alert.concat(res);
    event.target.complete();

      // Désactiver l'infinite scroll si moins de données retournées que la limite
  if (res.length < this.limit) {
    this.infiniteScrollDisabled = true;
    this.search2 = false ;
  }
  } catch (error) {
    console.log('Erreur de chargement', error);
    if (this.oldalert && this.oldalert.length > 0) {
      this.alert = this.oldalert;
    }
    else { this.alert = 'erreur_chargement'; }
    event.target.complete();
  }
}



date() {
  this.recherche_date = !this.recherche_date;
}


date_normal() {
  this.filteredAlerts = this.alert;
}


 // filtre pour affichage par catégorie
  transform(alert: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(alert, term, excludes);
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

      this.alert.forEach((publi) => {
        const distance = this.distanceCalculatorService.haversineDistance(
          userLatitude,
          userLongitude,
          publi?.latitude,
          publi?.longitude
        );

        console.log(`Distance entre l'utilisateur et l'alerte : ${distance} mètres`);

        if (!isNaN(distance)) {
          publi.distanceToUser = distance;
          console.log(`Distance entre l'utilisateur et l'alerte : ${publi.distanceToUser} mètres`);
        } else {
          publi.distanceToUser = 'Coordonnées invalides';
          console.error('Coordonnées invalides pour l\'alerte:', publi);
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


  scrollToTop() {
    // Utilisez scrollTo() ou scrollIntoView() pour faire défiler la page

    const content = document.querySelector('ion-content'); // Sélectionnez votre élément de contenu principal
    if (content) {
      content.scrollToTop(500); // Faites défiler jusqu'au haut avec une animation de 500ms
    }

  }


  private hideButtonTimeout: any;
@ViewChild('scrollButton', { static: false }) scrollButton: ElementRef;
@ViewChild(IonContent, { static: false }) content: IonContent;


ngAfterViewInit() {
  this.addScrollListener();
  this.resetHideButtonTimer() ;
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

@ViewChildren('videoElement') videoElements: QueryList<ElementRef<HTMLVideoElement>>;

// Méthode pour gérer la pause manuelle
toggleManualPause(videoElement: HTMLVideoElement) {
  if (videoElement.paused) {
    this.playVideo(videoElement);
  } else {
    this.pauseVideo(videoElement);
  }
}

seekVideo(event: Event, video: HTMLVideoElement) {
  const input = event.target as HTMLInputElement;
  video.currentTime = parseFloat(input.value);
}

private playVideo(videoElement: HTMLVideoElement) {
  videoElement.play();
}

private pauseVideo(videoElement: HTMLVideoElement) {
  videoElement.pause();
}


}
