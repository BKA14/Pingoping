import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../websocket.service';
import { authService } from '../services/auth.service';
import { timeService } from './../timeservice.service';

@Component({
  selector: 'app-alert-user',
  templateUrl: './alert-user.page.html',
  styleUrls: ['./alert-user.page.scss'],
})
export class AlertUserPage implements OnInit {


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  alert: any = [];
  recherche_date: any;
  page: number = 1;
  limit: number = 10;
  infiniteScrollDisabled: boolean = false; // Variable pour gérer l'état de l'infinite scroll
  private websocketSubscription: Subscription;
  serverTime: string | number | Date;


  private refreshTimeout;
  public showArrow: boolean = false;
  private intervalId: any;
  oldalert: any;
  selectedStatus: string ;
  service_choisi: string ;
  startDate: string;
  endDate: string;
  search2: boolean = false;
  service: any;
  userData: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private wsService: WebSocketService,
    private authService: authService,
    private timeService: timeService,
  ) {

    }

  ngOnInit() {
    this.loadalert_id();
    this.getservice();
    this.loadInitialAlerts();

    // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });

    this.timeService.getServerTime().subscribe((response) => {
      this.serverTime = response.serverTime;
      // console.log('serveur time', this.serverTime );
    });
  }


async loadalert_id() {

  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
    duration: 10000,
  });

  loading.present();

  localStorage.setItem('oldalert', JSON.stringify(this.alert));
  this.oldalert = JSON.parse(localStorage.getItem('oldalert'));


  let id =  await this.userData.iduser;
  try {
  const res = await this._apiService.loadalert_id(id,this.page, this.limit).toPromise();
  // console.log('SUCCESS ===', res);

  if (res && res.length < 1) {
    this.alert = 'aucune_alerte';
  }
  else
   this.alert = res;

   loading.dismiss();

  } catch (error) {
    if (this.oldalert && this.oldalert.length > 0) {
      this.alert = this.oldalert;
    }
    else { this.alert = 'erreur_chargement'; }
   //  console.log('erreur de chargement', error);
  // Gérez les erreurs de chargement de manière appropriée
  loading.dismiss();

  }

  }


  async loadMore(event) {

    this.page++;

    localStorage.setItem('oldalert', JSON.stringify(this.alert));
    this.oldalert = JSON.parse(localStorage.getItem('oldalert'));


    this._apiService.loadalert_id(this.userData.iduser, this.page, this.limit).subscribe((res: any) => {
         //console.log('SUCCESS ===', res);

      this.alert = this.alert.concat(res);

      // Désactiver l'infinite scroll si moins de données retournées que la limite
      if (res.length < this.limit) {
        this.infiniteScrollDisabled = true;
      }
      event.target.complete();
    } , (error: any) => {
      // console.log('Erreur de connexion avec le serveur, veuillez réessayer.');
      if (this.oldalert && this.oldalert.length > 0) {
        this.alert = this.oldalert;
      }
      else { this.alert = 'erreur_chargement'; }
    });
  }

  loadInitialAlerts() {
    this.websocketSubscription = this.wsService.listenForSignalisationUpdates().subscribe(
      (message) => {
        if (Array.isArray(message)) {
          // Chargement initial des alertes
          this.alert = message;
           //console.log('Initial alerts loaded:', this.alert);
        } else {
          // Traitement des actions individuelles
          switch (message.action) {
            case 'insert':
              if (message.iduser === this.userData.iduser) { // Vérifiez si l'iduser correspond
                this.alert.unshift(message);
                // console.log('New alert inserted:', message);
              } else {
                // console.log('Insert ignored: iduser does not match.');
              }
              break;
            case 'update':
              const updatedIndex = this.alert.findIndex(alert => alert.id === message.old_signalisation_id);
              if (updatedIndex !== -1) {
                this.alert[updatedIndex] = message;
               //  console.log('Alert updated:', message);
               //  console.log('Alert updated:', message.old_signalisation_id);
              }
              break;
            case 'delete':
              this.alert = this.alert.filter(alert => alert.id !== message.signalisation_id);
             //  console.log('Alert deleted:', message);
              break;
            default:
              // console.log('Unknown action:', message);
          }
        }
      },
      (err) => console.error('WebSocket Error:', err)
    );
  }


  ngOnDestroy() {
    // Nettoyez le timeout et l'intervalle lors de la destruction du composant
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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


  getLoadFunction(event) {
    if (this.search2) {
      this.More_filterAlerts(event);
    }
    else {
      this.loadMore(event);
    }
  }


  filterAlerts() {

    if (this.selectedStatus !== '' || this.service_choisi !== '' || (this.startDate !== '' && this.endDate !== '') ) {
      this.search2= true;
      this.infiniteScrollDisabled = false;
      this.filterAlerts2();
    }

  }

  async filterAlerts2() {

    this.page= 1;

    localStorage.setItem('oldalert', this.alert);

    this.oldalert =  localStorage.getItem('oldalert');

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
      duration: 8500,
    });

    await loading.present();

    try {
      const res: any = await this._apiService.loadalert_search_all_user(
        this.startDate || '',
        this.endDate || '',
        this.selectedStatus || '',
        this.service_choisi || '',
        this.page,
        this.limit,
        this.userData.iduser
      ).toPromise();

      // console.log('SUCCESS ===',  this.selectedStatus );

      if (res && res.length > 0) {
        this.alert = res;
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

    localStorage.setItem('oldalert', JSON.stringify(this.alert));
    this.oldalert = JSON.parse(localStorage.getItem('oldalert'));


    try {
      const res: any = await this._apiService.loadalert_search_all_user(
        this.startDate || '',
        this.endDate || '',
        this.selectedStatus || '',
        this.service_choisi || '',
        this.page,
        this.limit,
        this.userData.iduser
      ).toPromise();

     //  console.log('SUCCESS ===', res);

      this.alert = this.alert.concat(res);
      event.target.complete();

        // Désactiver l'infinite scroll si moins de données retournées que la limite
    if (res.length < this.limit) {
      this.infiniteScrollDisabled = true;
      this.search2 = false;
    }
    } catch (error) {
    //   console.log('Erreur de chargement', error);
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

  annuler_date(){
    this.recherche_date = false;
  }

  async getservice(){

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
      duration: 8500,
    });
    loading.present();

    this._apiService.getservice().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      this.service = res;
      loading.dismiss();
     },(error: any) => {
      // console.log("Erreur de connection ",error);
      loading.dismiss();
  })
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

  async refreshPage(e: any) {

    this.startDate = '',
    this.endDate = '',
    this.selectedStatus = '',
    this.service_choisi = '',


    this.search2= false;

    // Réinitialiser les données de la page et du tableau pub
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

    await this.loadalert_id();

    // Log pour indiquer le rafraîchissement
    // console.log('Rafraîchissement de la page');

    // Terminer l'animation de rafraîchissement
    e.target.complete();

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
