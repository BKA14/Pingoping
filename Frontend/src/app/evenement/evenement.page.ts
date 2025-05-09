import { CommentaireService } from './CommentaireService';
import { Component, ElementRef, EventEmitter, HostListener, NgZone, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController, IonContent, IonInfiniteScroll, IonList, LoadingController, ToastController } from '@ionic/angular';
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
import { NotificationService } from '../notification.service';
import { WebSocketService } from '../websocket.service';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.page.html',
  styleUrls: ['./evenement.page.scss'],
})
export class EvenementPage implements OnInit {

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
   event: any = [];
   pubs: any = [];
   etats: any = [];
   etat : any = [];
   etats1: any = [];
   etatpub: any = [];
   pubvideo: any = [];
   page: number = 1;
   limit: number = 10;
   toastDuration: number = 2000; // Durée du toast

   infiniteScrollDisabled: boolean = false; // Variable pour gérer l'état de l'infinite scroll

   showScrollButton: boolean = false;
   hideScrollTimeout: any;
   public videoError: boolean = false; // Variable pour suivre l'état d'erreur vidéo


    etatid: any;
    pubid:any;
    idpub: any;
    userData: any = null;
    limit_comment: number = 180; // Limite des caractères avant le tronquage
    showFullCommentaire: boolean = false;

    isLiked = false;
    public countdown: string;

    private updateSubscription: Subscription;
    private websocketSubscription: Subscription;
    private unsubscribe$ = new Subject<void>();


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
      public commentaireService: CommentaireService,
      private el: ElementRef,
      private navCtrl: NavController,
      private wsService: WebSocketService,
      private renderer: Renderer2,
      private authService: authService,
      private notificationService: NotificationService,
      private toastCtrl: ToastController  // Injecter le ToastController
    )
    {
      this.manualPause = false;
      this.getpub();
    }


    async ngOnInit() {

      this.updateSubscription = interval(12000).subscribe(async () => {
      await this.openUrl_evenement();
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

      // pour initialiser les notiications push
      this.notificationService.initializePushNotifications();
      }


          // Méthode pour afficher un toast
      async presentToast(message: string, color: string = 'danger') {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2000, // Durée d'affichage du toast
        position: 'top',
        color: color,
      });
      toast.present();
      }


      ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();

        if (this.websocketSubscription) {
          this.websocketSubscription.unsubscribe();
        }
        if (this.updateSubscription) {
          this.updateSubscription.unsubscribe();
        }
        if (this.websocketSubscription) {
          this.websocketSubscription.unsubscribe();
        }
      }

      async getpub() {
        this.page = 1;
        let loading: HTMLIonLoadingElement;

        try {
          loading = await this.loadingCtrl.create({
            message: 'Actualisation...',
            spinner: 'lines',
            cssClass: 'custom-loading',
            duration: 10000,
          });

          await loading.present();

          localStorage.setItem('oldpub', JSON.stringify(this.event));
          this.oldpub = JSON.parse(localStorage.getItem('oldpub'));

          // Appel API pour récupérer les pubs
          this._apiService.getpub_evenement(this.page, this.limit)
            .pipe(takeUntil(this.unsubscribe$)) // Ajout de takeUntil pour arrêter l'abonnement lorsque la page est détruite
            .subscribe(
              async (res: any) => {
                if (res && Array.isArray(res) && res.length > 0) {
                  this.event = res;
                  try {
                    await this.openUrl_evenement();
                  } catch (error) {
                    console.error("Erreur critique lors de l'appel à openUrl:", error);
                  }
                } else {
                  this.event = 'aucune_alerte';
                }

                await loading.dismiss();
              },
              async (error: any) => {
                console.error("ERROR == pub", error);
                if (this.oldpub && this.oldpub.length > 0) {
                  this.event = this.oldpub;
                } else {
                  this.event = 'erreur_chargement';
                }

                await this.presentToast("Erreur de connexion avec le serveur, veuillez réessayer.");
                await loading.dismiss();
              }
            );
        } catch (e) {
          console.error("Erreur inattendue dans getpub:", e);
          await this.presentToast("Erreur de connexion avec le serveur, veuillez réessayer.");
          if (loading) {
            await loading.dismiss();
          }
          await this.presentToast("Une erreur inattendue s'est produite, veuillez réessayer.");
        } finally {
          this.cdr.detectChanges();
        }
      }


async loadMore(event) {
  this.page++;

  localStorage.setItem('oldpub', JSON.stringify(this.event));
  this.oldpub = JSON.parse(localStorage.getItem('oldpub'));

  try {
    const res: any = await this._apiService.getpub_evenement(this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    this.event = this.event.concat(res);
    await this.openUrl_evenement();

    // Désactiver l'infinite scroll si moins de données retournées que la limite
    if (res.length < this.limit) {
      this.infiniteScrollDisabled = true;
    }
    event.target.complete();
  } catch (error) {
    console.log('Erreur de chargement', error);
    if (this.oldpub && this.oldpub.length > 0) {
      this.event = this.oldpub;
    }
    else { this.event = 'erreur_chargement'; }
    this.presentToast("Erreur de connexion avec le serveur, veuillez réessayer.");
    event.target.complete();
  }
}


toggleCommentaire() {
  this.showFullCommentaire = !this.showFullCommentaire;
}

getDisplayedCommentaire(pub): string {
  if (this.showFullCommentaire || pub.commentaire.length <= this.limit_comment) {
    return pub.commentaire;
  } else {
    return this.commentaireService.truncate(pub.commentaire, this.limit_comment);
  }
}

getPlainText(commentaire: string): string {
  const div = document.createElement('div');
  div.innerHTML = commentaire;
  return div.textContent || div.innerText || '';
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
            const updatedIndex = this.event.findIndex(pub => pub.id === message.idpub);
            if (updatedIndex !== -1) {
              this.event[updatedIndex].likes_count = message.likes_count;
              this.event[updatedIndex].user_ids = message.user_ids;
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
          message.forEach(item => {
            if (item.admin === 'evenement') {
              this.event = item;
              console.log('Initial alerts loaded:', this.event);
            }
          });
        }
        else {
          // Traitement des actions individuelles
          switch (message.action) {
            case 'date':
              const updatedPubs = Array.isArray(message) ? message: [message];
              updatedPubs.forEach(updatedPub => {
                const index = this.event.findIndex(pub => pub.id === updatedPub.id);
                if (index !== -1) {
                  this.event[index].countdown = updatedPub.countdown;
                  console.log(`Nouveau countdown pour pub ${updatedPub.id}:`, updatedPub.countdown);
                }
              });
              break;
            case 'insert':

              if(message.admin =='evenement'){
                message.likes_count = 0;
                message.user_ids = [];
                this.event.unshift(message);
                console.log('New pub inserted:', message);
              }
              break;

            case 'update':
              const updatedIndex = this.event.findIndex(pub => pub.id === message.old_pub_id);
              if (updatedIndex !== -1) {
                // Copier les valeurs actuelles avant la mise à jour
                const currentLikesCount = this.event[updatedIndex].likes_count;
                const currentUserIds = [...this.event[updatedIndex].user_ids];

                // Mettre à jour le message avec les nouvelles valeurs
                message.likes_count = currentLikesCount;
                message.user_ids = currentUserIds;

                // Remplacer l'élément dans le tableau this.pub
                this.event[updatedIndex] = message;

                console.log('pub updated:', message);
                console.log('pub updated:', message.old_pub_id);
              }
              break;
            case 'delete':
              this.event = this.event.filter(pub => pub.id !== message.pub_id);
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


    reloadPage() {
      this.getpub();
    }

    likepub(pub: any) {
      if (pub.isLoading) return; // Évite les clics multiples

      pub.isLoading = true;

      let data = {
        iduser: this.userData.iduser,
        contactuser: this.userData.numuser,
        pubid: pub.id,
      };

      this._apiService.getetat2(data).subscribe(async (res:any) => {
        console.log("SUCCESS ===",res);

        if(res.result === 'oui') {
          if(res.data.etat === 'oui') {
            pub.likes_count--;
            pub.user_ids = pub.user_ids.filter(userId => userId !== this.userData.iduser);
            this.cdr.detectChanges();
            await  this.disLike(pub);

          } else if (res.data.etat === 'non') {
            pub.likes_count++;
            pub.user_ids.push(this.userData.iduser);
            this.cdr.detectChanges();
            await  this.Likes(pub);
          }
        } else if (res.result === 'non') {
          pub.likes_count++;
          pub.user_ids.push(this.userData.iduser);
          this.cdr.detectChanges();
          await this.Likepremier(pub);
        }

        pub.isLoading = false;
        this.cdr.detectChanges();
      }, (error: any) => {
        pub.isLoading = false;
        console.log('Erreur de connection  nouveau etat non enregistre');
        console.log("ERROR ===",error);
      });
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
           //  console.log("SUCCESS ===",res);
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
           //  console.log("SUCCESS ===",res);

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


    // Log pour indiquer le rafraîchissement
    // console.log('Rafraîchissement de la page');

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
      //   console.log("SUCCESS ===",res);
        this.categorie = res;
       },(error: any) => {

       //  console.log("Erreur de connection ",error);
        this.cdr.detectChanges();
    })

    }


    async supprimer(id){
      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        spinner:'lines',
      // showBackdrop:false,
        cssClass: 'custom-loading',
        duration: 8500,
      });

      loading.present();

      this._apiService.presentAlertpub(id).subscribe((res:any)  => {

      loading.dismiss();

      this.getpub();

    },(error: any) => {
      loading.dismiss();

      this.presentToast('Erreur de connection avec le serveur veillez reessayer');

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

    return  this.event.length;

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

  async getUserLocation(): Promise<{ userLatitude: number; userLongitude: number } | null> {
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout: Unable to get location')), 6000)
      );

      const geolocationPromise = Geolocation.getCurrentPosition();

      const coordinates = await Promise.race([geolocationPromise, timeoutPromise]) as GeolocationPosition; // Assertion de type ici

      const userLatitude = coordinates.coords.latitude;
      const userLongitude = coordinates.coords.longitude;

      // console.log('Latitude:', userLatitude);
      // console.log('Longitude:', userLongitude);

      this.userlongitude = userLongitude;
      this.userlatitude = userLatitude;

      return {  userLatitude, userLongitude };
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
      return null;
    }
  }

async openUrl_evenement() {
  // console.log('Début de openUrl');
  const userLocationData = await this.getUserLocation();

  if (userLocationData) {
    const { userLatitude, userLongitude } = userLocationData;
   //  console.log(`Coordonnées utilisateur : ${userLatitude}, ${userLongitude}`);

    if (Array.isArray(this.event)) {
      for (const publi of this.event) {
        const distance = this.distanceCalculatorService.haversineDistance(
          userLatitude,
          userLongitude,
          publi.latitude,
          publi.longitude
        );

       //  console.log(`Distance : ${distance} mètres`);

        if (!isNaN(distance)) {
          publi.distanceToUser = distance;
         //  console.log(`Distance entre l'utilisateur et l'entreprise : ${publi.distanceToUser} mètres`);
        } else {
         //  console.error('La distance est NaN.');
        }
      }
    } else {
      console.error('this.pub n\'est pas un tableau :', this.event);
    }
  } else {
    this.userlongitude = null;
    this.userlatitude = null;
    console.error('Impossible de récupérer les coordonnées de l\'utilisateur.');
    throw new Error('Erreur: Impossible de récupérer les coordonnées de l\'utilisateur.');
  }
}


CommentPub(pubs) {

  try {
    this.navCtrl.navigateForward('/commentaire', { queryParams: { pubId: pubs.id } });
  } catch {
    this.getpub();
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

  // Méthode pour gérer les erreurs vidéo
handleVideoError(videoElement: HTMLVideoElement) {
 //  console.log('Video error', videoElement);
  this.videoError = true; // Mettre à jour l'état d'erreur vidéo
}

}
