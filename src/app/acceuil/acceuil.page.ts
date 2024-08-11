import { CommentaireService } from './CommentaireService';
import { Component, ElementRef, EventEmitter, HostListener, NgZone, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController, IonContent, IonInfiniteScroll, IonList, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { DistanceCalculatorService } from './distance-calculator.service';
import { ChangeDetectorRef } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { Subscription, fromEvent, interval } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { authService } from '../services/auth.service';


import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import { WebSocketService } from '../websocket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})

export class AcceuilPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  oldpub: any;


@HostListener('click', ['$event'])
onClick(event: MouseEvent) {
const link = this.el.nativeElement.href;
if (link) {
window.open(link, '_blank');
event.preventDefault();
}
}



  tokens: any;
  term;
  handlerMessage = '';
  roleMessage = '';
  distanceToUser?: number;
  couleurbouton?: any;
  userlatitude : any;
  userlongitude : any;
  localisation? : any;
  mapsUrl: any;

  likes: any;
  latitude:any;
  longitude:any;
  rangpub: any;
  categorie: any = [];
   pub: any = [];
   pubs: any = [];
   etats: any = [];
   etat : any = [];
   etats1: any = [];
   etatpub: any = [];
   pubvideo: any = [];
   page: number = 1;
   limit: number = 10;

   infiniteScrollDisabled: boolean = false; // Variable pour gérer l'état de l'infinite scroll

   showScrollButton: boolean = false;
   hideScrollTimeout: any;
   public videoError: boolean = false; // Variable pour suivre l'état d'erreur vidéo


    etatid: any;
    pubid:any;
    idpub: any;
    userData: any = null;


    isLiked = false;
    public countdown: string;

    private updateSubscription: Subscription;
    private websocketSubscription: Subscription;


    public progress = 0;
    etatService: any;

    constructor(
      public _apiService: ApiService,
      private alertController: AlertController,
      private route: ActivatedRoute,
      private router: Router,
      private loadingCtrl: LoadingController,
      public loadingController: LoadingController,
      private distanceCalculatorService: DistanceCalculatorService,
      private cdr: ChangeDetectorRef,
      private zone: NgZone,
      private appRef: ApplicationRef,
      private routerOutlet: IonRouterOutlet,
      private commentaireService: CommentaireService,
      private el: ElementRef,
      private ngZone: NgZone,
      private navCtrl: NavController,
      private wsService: WebSocketService,
      private renderer: Renderer2,
      private userService: UserService,
      private authService: authService,
    )
    {
      this.manualPause = false;
      this.getUserLocation();
      this.getpub();
    }


    async ngOnInit() {

      this.updateSubscription = interval(12000).subscribe(async () => {
      this.setupIntersectionObserver();
      await this.openUrl();
      this.cdr.detectChanges(); // Détecter et appliquer les changements
      });

      this.updateSubscription = interval(100).subscribe(async () => {
      this.setupIntersectionObserver();
      this.cdr.detectChanges(); // Détecter et appliquer les changements
      });

          // S'abonner aux changements de données utilisateur
      this.authService.userData$.subscribe(data => {
        this.userData = data;
      });

      this.loadInitialPub();
      this.loadLike() ;
      this.setupIntersectionObserver(); // pour lecture automatic de la video
      this.cdr.detectChanges(); // Détecter et appliquer les changements

       // Pour les pushs notifications
      console.log('Initializing HomePage');
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          console.log('pas de permission ');
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
         // alert('Push registration success, token: ' + token.value);
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          alert('Pingoping: ' + JSON.stringify(notification));
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        }
      );
      }

      ngOnDestroy() {
        if (this.websocketSubscription) {
          this.websocketSubscription.unsubscribe();
        }
      }

// Function to get the initial pubs from the API
async getpub() {
  this.page = 1;
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
  });

  loading.present();
  this.oldpub = this.pub;

  this._apiService.getpub(this.page, this.limit).subscribe((res: any) => {
    console.log("SUCCESS == pub", res);

    if (res && res.length < 1) {
      this.pub = 'aucune_alerte';
    }
    else {
      this.pub = res;
      this.openUrl();
    }
    loading.dismiss();

  }, (error: any) => {
    if (this.oldpub && this.oldpub.length > 0) {
      this.pub = this.oldpub;
    }
    else { this.pub = 'erreur_chargement'; }
    alert('Erreur de connexion avec le serveur, veuillez réessayer.');
  //  this.router.navigateByUrl('/welcome2');
    loading.dismiss();
  });

  this.cdr.detectChanges();
}

async loadMore(event) {
  this.page++;
 this.oldpub = this.pub;
  try {
    const res: any = await this._apiService.getpub(this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    this.pub = this.pub.concat(res);
    this.openUrl();

    // Désactiver l'infinite scroll si moins de données retournées que la limite
    if (res.length < this.limit) {
      this.infiniteScrollDisabled = true;
    }
    event.target.complete();
  } catch (error) {
    console.log('Erreur de chargement', error);
    if (this.oldpub && this.oldpub.length > 0) {
      this.pub = this.oldpub;
    }
    else { this.pub = 'erreur_chargement'; }
    alert('Erreur de connexion avec le serveur, veuillez réessayer.');
    event.target.complete();
  }
}


 // Vérification d'appartenance avec Set
 hasLiked(pub: any): boolean {
  return pub.user_ids?.includes(this.userData.iduser.toString());
}


loadLike() {
  this.websocketSubscription = this.wsService.listenForLikesUpdates().subscribe(
    (message) => {
      if (Array.isArray(message)) {
        // Chargement initial des alertes
        console.log('Ne fais rien car géré au niveau des Pub:');
        // Vous pouvez éventuellement traiter les données initiales ici si nécessaire
      } else {
        // Traitement des actions individuelles
        switch (message.action) {
          case 'insert':
            console.log('Ne fais rien pour insert car géré au niveau des Pub:');
            // Vous pouvez ajouter un traitement spécifique si nécessaire
            break;
          case 'update':
            console.log('Il y a une mise à jour:');
            const updatedIndex = this.pub.findIndex(pub => pub.id === message.idpub);
            if (updatedIndex !== -1) {
              this.pub[updatedIndex].likes_count = message.likes_count;
              this.pub[updatedIndex].user_ids = message.user_ids;
              console.log('Likes_count du pub mis à jour:', message.likes_count);
              console.log('User_ids du pub mis à jour:', message.user_ids);
            }
            break;
          case 'delete':
            console.log('Ne fais rien pour delete car géré au niveau des Pub:');
            // Vous pouvez ajouter un traitement spécifique si nécessaire
            break;
          default:
            console.log('Action inconnue:', message);
        }
      }
    },
    (err) => console.error('Erreur WebSocket:', err)
  );
}


    loadInitialPub() {
      console.log('Nouveau countdown:');
    this.websocketSubscription = this.wsService.listenForPubUpdates().subscribe(
      (message) => {
        if (Array.isArray(message)) {
          // Chargement initial des alertes
          this.pub = message;
          console.log('Initial alerts loaded:', this.pub);
          } else {
          // Traitement des actions individuelles
          switch (message.action) {
            case 'date':
              const updatedPubs = Array.isArray(message) ? message: [message];
              updatedPubs.forEach(updatedPub => {
                const index = this.pub.findIndex(pub => pub.id === updatedPub.id);
                if (index !== -1) {
                  this.pub[index].countdown = updatedPub.countdown;
                  console.log(`Nouveau countdown pour pub ${updatedPub.id}:`, updatedPub.countdown);
                }
              });
              break;
            case 'insert':
              message.likes_count = 0;
              message.user_ids = [];
              this.pub.unshift(message);
              console.log('New alert inserted:', message);
              break;
            case 'update':
              const updatedIndex = this.pub.findIndex(pub => pub.id === message.old_pub_id);
              if (updatedIndex !== -1) {
                // Copier les valeurs actuelles avant la mise à jour
                const currentLikesCount = this.pub[updatedIndex].likes_count;
                const currentUserIds = [...this.pub[updatedIndex].user_ids];

                // Mettre à jour le message avec les nouvelles valeurs
                message.likes_count = currentLikesCount;
                message.user_ids = currentUserIds;

                // Remplacer l'élément dans le tableau this.pub
                this.pub[updatedIndex] = message;

                console.log('pub updated:', message);
                console.log('pub updated:', message.old_pub_id);
              }
              break;
            case 'delete':
              this.pub = this.pub.filter(pub => pub.id !== message.pub_id);
              console.log('pub deleted:', message);
              break;
            default:
              console.log('Unknown action:', message);
          }
        }
      },
      (err) => console.error('WebSocket Error:', err)
    );

    }

    shouldBlink(countdown: string): boolean {
      // Ajoutez la logique pour déterminer si le texte doit clignoter
      return countdown.trim() === 'Événement en cours!';
    }


    @ViewChildren('videoElement') videoElements: QueryList<ElementRef<HTMLVideoElement>>;
    private manualPause: boolean = false; // Contrôle de la pause manuelle
    private currentPlayingVideo: HTMLVideoElement = null; // Vidéo actuellement en lecture

    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (!this.manualPause) {
              this.playVideo(video);
            }
          } else {
            this.pauseVideo(video);
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);

      this.videoElements.forEach((videoElement) => {
        const video = videoElement.nativeElement;
        observer.observe(video);
      });
    }

    handleVideoClick(videoElement: HTMLVideoElement) {
      console.log('Video clicked', videoElement);
      if (this.currentPlayingVideo && this.currentPlayingVideo !== videoElement) {
        // Pause la vidéo actuellement en cours si elle existe et n'est pas la même que celle cliquée
        this.pauseVideo(this.currentPlayingVideo);
      }
      this.currentPlayingVideo = videoElement;

      if (document.fullscreenElement === videoElement) {
        document.exitFullscreen().catch(err => console.log(`Error exiting full screen: ${err.message}`));
      } else {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen().catch(err => console.log(`Error requesting full screen: ${err.message}`));
        }
      }
    }

    // Méthode pour gérer la pause manuelle
    toggleManualPause(videoElement: HTMLVideoElement) {
      console.log('Entre dans toggle:');
      this.manualPause = !this.manualPause;
      if (this.manualPause) {
        console.log('Entre dans toggle 1:', this.manualPause);
        this.pauseVideo(videoElement);
        console.log('Entre dans toggle 2:', this.manualPause);
      } else {
        console.log('Entre dans toggle 3:', this.manualPause);
        this.playVideo(videoElement);
      }
    }

    // Méthode pour couper ou réactiver le son
toggleMute(videoElement: HTMLVideoElement) {
  videoElement.muted = !videoElement.muted;
}

// Méthode pour ajuster le volume
setVolume(event: Event, videoElement: HTMLVideoElement) {
  const volume = (event.target as HTMLInputElement).value;
  videoElement.volume = parseFloat(volume);
}


    @HostListener('document:fullscreenchange', ['$event'])
    onFullScreenChange(event: Event) {
      const videoElement = event.target as HTMLVideoElement;
      console.log('Fullscreen change event', videoElement);
      if (!document.fullscreenElement) {
        // Le document n'est pas en mode plein écran
        console.log('Exited fullscreen mode');
      }
    }

    playVideo(video: HTMLVideoElement) {
      // Pause toutes les autres vidéos avant de jouer la nouvelle
      this.videoElements.forEach((videoElement) => {
        const videoEl = videoElement.nativeElement;
        if (videoEl !== video) {
          this.pauseVideo(videoEl);
        }
      });

      // Jouer la nouvelle vidéo
      if (video) {
        this.currentPlayingVideo = video; // Met à jour la vidéo actuellement en lecture
        this.manualPause = false; // Réinitialise la pause manuelle
        video.play().catch(err => console.log(`Error playing video: ${err.message}`));
      }
    }

    pauseVideo(video: HTMLVideoElement) {
      if (video) {
        video.pause();
        if (this.currentPlayingVideo === video) {
          this.currentPlayingVideo = null; // Réinitialise la vidéo actuellement en lecture
        }
      }
    }

    togglePlayPause(video: HTMLVideoElement) {
      if (video.paused) {
        video.play().catch(err => console.log(`Error playing video: ${err.message}`));
      } else {
        video.pause();
      }
    }

    seekVideo(event: Event, video: HTMLVideoElement) {
      const input = event.target as HTMLInputElement;
      video.currentTime = parseFloat(input.value);
    }

    toggleFullScreen(video: HTMLVideoElement) {
      if (document.fullscreenElement === video) {
        document.exitFullscreen().catch(err => console.log(`Error exiting full screen: ${err.message}`));
      } else {
        if (video.requestFullscreen) {
          video.requestFullscreen().catch(err => console.log(`Error requesting full screen: ${err.message}`));
        }
      }
    }

   ionViewWillEnter() {
     // this.getpub();
      this.getUserLocation();
                   }


    reloadPage() {
      this.getpub();
    }

    likepub(pub: any) {
      let data = {
        iduser: this.userData.iduser,
        contactuser: this.userData.numuser,
        pubid: pub.id,
       }

       this._apiService.getetat2(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);

        console.log('resultat',res.result)

        if(res.result === 'oui'){

        if(res.data.etat === 'oui') {

        this.disLike(pub);
        pub.likes_count = pub.likes_count - 1;
        pub.user_ids = pub.user_ids.filter(userId => userId !== this.userData.iduser);
        console.log("dislike",pub.likes_count);
        console.log("dislike",pub.user_ids);
        }
        else if (res.data.etat === 'non')
        {
          this.Likes(pub);
          pub.likes_count = pub.likes_count + 1;
          pub.user_ids.push(this.userData.iduser);
          console.log("like",pub.likes_count);
          console.log("like",pub.user_ids);
        }
        else {
       console.log('Erreur de connection')
          return;
        }

        }

        else if (res.result === 'non')
           {

           this.Likepremier(pub);
           pub.likes_count = pub.likes_count + 1;
           pub.user_ids.push(this.userData.iduser);
           console.log("premier like",pub.user_ids);
           }

         // Forcer la détection des changements manuelle
         this.cdr.detectChanges();
        },(error: any) => {

        console.log('Erreur de connection  nouveau etat non enregistre');
        console.log("ERROR ===",error);
       })

         }


    async Likepremier(pub): Promise<void> {

      let data = {

        iduser: this.userData.iduser,
        contactuser: this.userData.numuser,
        etat: 'oui',
        pubid: pub.id,

       }

       this._apiService.addetatlikes(data).subscribe((res:any) => {

       },(error: any) => {

        console.log('Erreur de connection  nouveau etat non enregistre');
        console.log("ERROR ===",error);
       })

       this.cdr.detectChanges();

          }

         async Likes(pubs): Promise<void> {

          let data = {

            iduser: this.userData.iduser,
            contactuser: this.userData.numuser,
            etat: 'oui',
            pubid: pubs.id,

           }

           this._apiService.disLike(pubs.id,data).subscribe((res:any) => {
            console.log("SUCCESS ===",res);
             //window.location.reload();

             //alert('Nouveau etat ajoute avec success');
           },(error: any) => {

            console.log('Erreur de connection  nouveau etat non enregistre');
            console.log("ERROR ===",error);
           })

           this.cdr.detectChanges();

              }

         async disLike(pub): Promise<void> {

          let data = {

            iduser: this.userData.iduser,
            contactuser: this.userData.numuser,
            etat: 'non',
            pubid: pub.id,

           }

           this._apiService.disLike(pub.id,data).subscribe((res:any) => {
            console.log("SUCCESS ===",res);

             //window.location.reload();
             //alert('Nouveau etat ajoute avec success');
           },(error: any) => {

            console.log('Erreur de connection  nouveau etat non enregistre');
            console.log("ERROR ===",error);
           })

           this.cdr.detectChanges();

              }



  getWhatsAppLink(contact: string): string {
    const encodedContact = encodeURIComponent(contact);
    return `whatsapp://send?phone=${encodedContact}`;
  }


  async refreshPage(e: any) {

    // Réinitialiser les données de la page et du tableau pub
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

    // Rafraîchir les pubs
    await this.getpub();

    // Rafraîchir la localisation de l'utilisateur
    this.getUserLocation();

    // Déclencher la détection des changements
    this.cdr.detectChanges();

    // Appeler à nouveau la localisation de l'utilisateur (si nécessaire)
    this.getUserLocation();

    // Log pour indiquer le rafraîchissement
    console.log('Rafraîchissement de la page');

    // Terminer l'animation de rafraîchissement
    e.target.complete();
  }


    async deconnect() {

      const alert = await this.alertController.create({
        header: 'Déconnexion',
        message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              // L'utilisateur a annulé la déconnexion, ne rien faire
            }
          }, {
            text: 'Déconnecter',
            handler: () => {
              // L'utilisateur a confirmé la déconnexion
              this.performLogout();
            }
          }
        ]
      });

      await alert.present();

    }

    async performLogout() {

      const loading = await this.loadingCtrl.create({
        message: 'Déconnexion en cours...',
        spinner: 'lines',
        cssClass: 'custom-loading'
      });
      loading.present();

      localStorage.clear();
      this.router.navigateByUrl('/login2');
      loading.dismiss();

    }


    getcategorie(){

      this._apiService.getcategorie().subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        this.categorie = res;
       },(error: any) => {

        console.log("Erreur de connection ",error);
        this.cdr.detectChanges();
    })

    }


    async supprimer(id){
      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
       spinner:'lines',
      // showBackdrop:false,
        cssClass: 'custom-loading',
      });

      loading.present();

      this._apiService.presentAlertpub(id).subscribe((res:any)  => {

      loading.dismiss();

      this.getpub();

    },(error: any) => {
      loading.dismiss();
      alert('Erreur de connection avec le serveur veillez reessayer');
      //this.navCtrl.setRoot('/welcome2');
      // console.log("ERREUR ===",error);
   })
   this.cdr.detectChanges();
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
  this.cdr.detectChanges();
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


  @ViewChild('maliste', {static: false}) list: IonList;

  get entrepriseCount(){

    return  this.pub.length;

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


async getUserLocation() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    const userLatitude = coordinates.coords.latitude;
    const userLongitude = coordinates.coords.longitude;
    // Utilisez les coordonnées de l'utilisateur comme nécessaire
    console.log('Latitude:', userLatitude);
    console.log('Longitude:', userLongitude);

    this.userlongitude = userLongitude ;
    this.userlatitude = userLatitude;

    console.error('Coordonnées entreprise:', this.latitude, this.longitude);
    return { userLatitude, userLongitude };
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées:', error);
    return null;
  }

}



async getUserLocationAndCompanyId(id) {
try {
  const coordinates = await Geolocation.getCurrentPosition();
  const userLatitude = coordinates.coords.latitude;
  const userLongitude = coordinates.coords.longitude;

  return { userLatitude, userLongitude, companyId: id };
} catch (error) {
  console.error('Erreur lors de la récupération des coordonnées:', error);
  return null;

}

}


CommentPub(pubs) {

  try {
    this.navCtrl.navigateForward('/commentaire', { queryParams: { pubId: pubs.id } });
  } catch {
    this.getpub();
  }
}


async openUrl() {

  //const userLocationData = await this.getUserLocationAndCompanyId(id);

  const userLocationData = await this.getUserLocation();

  if (userLocationData) {

    const { userLatitude, userLongitude } = userLocationData;

    this.pub.forEach(async (publi) => {
      const distance = this.distanceCalculatorService.haversineDistance(
        userLatitude,
        userLongitude,
        publi.latitude,
        publi.longitude,
      );

      console.log(`Distance entre l'utilisateur et l'entreprise : ${distance} mètres`);

      if (!isNaN(distance)) {
        publi.distanceToUser = distance;
        console.log(`Distance entre l'utilisateur et l'entreprise : ${publi.distanceToUser} mètres`);
      } else {
        console.error('La distance calculée est NaN. Veuillez vérifier les coordonnées.');
      }

    });

  } else {
    console.error('Impossible de récupérer les coordonnées de l\'utilisateur.');
  }

  }


  convertMetersToKilometers(meters: number): string {
    // Si la distance en mètres est inférieure à 4000 (4 km), renvoyer en mètres
    if (meters < 4000) {
      const formattedmettre = Math.floor(meters).toString();
        return `${formattedmettre} m`;
    } else {
        // Sinon, convertir les mètres en kilomètres
        const kilometers = meters / 1000;
        // Formattage du résultat sans point ni virgule
        const formattedDistance = Math.floor(kilometers).toString();
        return `${formattedDistance} km`;
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

  // Méthode pour gérer les erreurs vidéo
handleVideoError(videoElement: HTMLVideoElement) {
  console.log('Video error', videoElement);
  this.videoError = true; // Mettre à jour l'état d'erreur vidéo
}

}
