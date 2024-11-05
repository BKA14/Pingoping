import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { CustomFilterPipe } from './custom-filter.pipe';
import { interval, Subscription } from 'rxjs';
import { authService } from '../services/auth.service';
import { WebSocketService } from '../websocket.service';
import { CartService } from '../services/cart.service'; // service panier
import { DistanceCalculatorService } from './distance-calculator.service';
import { timeService } from '../timeservice.service';
@Component({
  selector: 'app-get-commande-user',
  templateUrl: './get-commande-user.page.html',
  styleUrls: ['./get-commande-user.page.scss'],
})
export class GetCommandeUserPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  infiniteScrollDisabled: boolean = false;
  commande: any = [];
  grade: any;
  term: any;
  oldcommande: any;
  page: number = 1;
  limit: number = 35;
  duration = 2000;
  limit_comment: number = 180; // Limite des caractères avant le tronquage
  search: boolean = false;
  userlongitude: any;
  userlatitude: any;
  serverTime: string | number | Date;
  filteredCommandes: any[] = []; // Liste filtrée
  statutFilter: string = 'toutes'; // Statut actuel sélectionné

  private updateSubscription: Subscription;
  showFullCommentaire: boolean = false;
  userData: any;
  private websocketSubscription: Subscription;
  id: any;
  contact_admin: any;
  nom_resto: any;
  cart = [];


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
    private toastCtrl: ToastController,  // Injecter le ToastController
    private authService: authService,
    private wsService: WebSocketService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private distanceCalculatorService: DistanceCalculatorService,
    private timeService: timeService
  ) {

    this.get_commande()  ;

    }


  ngOnInit() {

  this.updateSubscription = interval(15000).subscribe(async () => {
    await this.openUrl();
    this.cdr.detectChanges(); // Détecter et appliquer les changements
    });

    // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });

    this.timeService.getServerTime().subscribe((response) => {
      this.serverTime = response.serverTime;
      console.log('serveur time', this.serverTime );
    });
  }


  reloadPage() {

    this.term = '';
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

    this.get_commande()  ;
  }


    // Méthode pour afficher un toast
    async presentToast(message: string, color: string = 'danger') {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: this.duration, // Durée d'affichage du toast
        position: 'bottom',
        color: color,
      });
      toast.present();
      }


    getsessionuser(){

      this.grade= (localStorage.getItem('grade'));
      console.log(this.grade);

      }


  async get_commande() {

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
      duration: 10000,
    });

    loading.present();

    this.page = 1;

    localStorage.setItem('oldcommande', JSON.stringify(this.commande));
    this.oldcommande = JSON.parse(localStorage.getItem('oldcommande'));

    try {
    const res : any = await this._apiService.get_commande_user(this.userData.iduser, this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    if (res && res.length < 1) {
      this.commande = 'aucune_alerte';
    } else {
      this.commande =  res;
      await this.openUrl();
    }

    loading.dismiss();

    } catch (error) {
    console.log('erreur de chargement', error);
    this.presentToast("Erreur de chargement");
    if (this.oldcommande && this.oldcommande.length > 0) {
      this.commande = this.oldcommande;
    }
    else { this.commande = 'erreur_chargement'; }
    console.log('Erreur de chargement', error);
    this.presentToast("Erreur de chargement");

    loading.dismiss();
  }

    }


    async loadMore(event) {

      this.page++;

      localStorage.setItem('oldcommande', JSON.stringify(this.commande));
      this.oldcommande = JSON.parse(localStorage.getItem('oldcommande'));

      try {
        const res : any  = await this._apiService.get_commande_user(this.userData.iduser, this.page, this.limit).toPromise();

        this.commande = this.commande.concat(res);
        this.openUrl();
        event.target.complete();

          // Désactiver l'infinite scroll si moins de données retournées que la limite
      if (res.length < this.limit) {
        this.infiniteScrollDisabled = true;
      }
      } catch (error) {
        this.presentToast('Rafraîchissement de la page','success');
        if (this.oldcommande && this.oldcommande.length > 0) {
          this.commande = this.oldcommande;
        }
        else { this.commande = 'erreur_chargement'; }
        event.target.complete();
      }
    }


    appeler(numero: string) {
      this.callNumber.callNumber(numero, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }


      refreshPage(e: any) {

        this.term = '';
        this.page = 1;
        this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

        this.get_commande();

        // Log pour indiquer le rafraîchissement
         this.presentToast('Rafraîchissement de la page','success');

        // Terminer l'animation de rafraîchissement
        e.target.complete();
      }



        // filtre pour affichage par catégorie
  transform(number: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(number, term, excludes);
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


getPlainText(commentaire: string): string {
  const div = document.createElement('div');
  div.innerHTML = commentaire;
  return div.textContent || div.innerText || '';
}


onSearch(event: any) {
  const term = event.target.value;

  // Vérifier si l'utilisateur a tapé quelque chose
  if (term && term.trim() !== '') {
    this.search = true;
    this.term = term;
    this.load_search(); // Charger les commandes filtrées
  } else {
    // Réinitialiser la recherche si le champ est vide
    this.search = false;
    this.term = '';
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
    this.get_commande(); // Recharger toutes les commandes
  }
}


async load_search() {

  this.page = 1;

  localStorage.setItem('oldcommande', JSON.stringify(this.commande));
  this.oldcommande = JSON.parse(localStorage.getItem('oldcommande'));

   try {
     const res : any = await this._apiService.load_search_commande(this.term, this.page, this.limit).toPromise();
     console.log('SUCCESS ===', res);

     if (res && res.length < 1) {
       this.commande = 'aucune_alerte';
     }
     else {
        this.commande = res;
        await this.openUrl();

     }

     } catch (error) {
     if (this.oldcommande && this.oldcommande.length > 0) {
       this.commande = this.oldcommande;
     }
     else { this.commande = 'erreur_chargement'; }
     console.log('Erreur de chargement', error);
   }

 }


 async load_more_search(event) {

  this.page++;

  localStorage.setItem('oldcommande', JSON.stringify(this.commande));
  this.oldcommande = JSON.parse(localStorage.getItem('oldcommande'));

  try {
    const res : any  = await this._apiService.load_search_commande(this.term, this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    this.commande = this.commande.concat(res);
    await this.openUrl();

    event.target.complete();

      // Désactiver l'infinite scroll si moins de données retournées que la limite
  if (res.length < this.limit) {
    this.infiniteScrollDisabled = true;
    this.search = false ;
  }
  } catch (error) {
    console.log('Erreur de chargement', error);
    if (this.oldcommande && this.oldcommande.length > 0) {
      this.commande = this.oldcommande;
    }
    else { this.commande = 'erreur_chargement'; }
    event.target.complete();
  }
}


async update(commandeId: number, nouveauStatut: string) {
  const alert = await this.alertController.create({
    header: 'Etes-vous sûr de vouloir mettre en ' + nouveauStatut + ' cette commande ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // Code si annulé (facultatif)
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.updateStatus(commandeId, nouveauStatut); // Appel correct de la fonction
        },
      },
    ],
  });

  await alert.present(); // Attend que l'alerte soit affichée
  this.cdr.detectChanges(); // Déclenche un changement de détection pour l'interface
}

async updateStatus(commandeId: number, nouveauStatut: string) {
  try {
    const formData = {
      statut: nouveauStatut,
      id: commandeId,
    }; // Créez un objet à envoyer avec le statut

    const res: any = await this._apiService.update_commande(commandeId, formData).toPromise();
    this.reloadPage(); // Recharger les commandes après la mise à jour
  } catch (error) {
    console.log('Erreur de chargement', error);
  }
}


filterByStatus(statut: string) {
  this.statutFilter = statut;

  // Si le statut est "toutes", réinitialiser la recherche et charger toutes les commandes
  if (this.statutFilter === 'toutes') {
    this.term = ''; // Réinitialiser le terme de recherche
    this.search = false;
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
    this.get_commande(); // Recharger toutes les commandes
  } else {
    this.term = this.statutFilter; // Mettre à jour le terme de recherche avec le statut sélectionné
    this.search = true;
    this.load_search(); // Appliquer la recherche sur le statut sélectionné
  }
}


filterCommandes() {
  // Si aucun filtre de statut n'est sélectionné, afficher toutes les commandes
  if (this.statutFilter === 'toutes') {
    this.term = ''; // Réinitialiser le terme de recherche
    this.search = false;
    this.get_commande(); // Charger toutes les commandes
  } else {
    this.term = this.statutFilter; // Appliquer le statut sélectionné comme terme de recherche
    this.search = true;
    this.load_search(); // Charger les commandes filtrées par statut
  }
}

////////////// pour les geolocalisation///////////


async getUserLocation(): Promise<{ userLatitude: number, userLongitude: number } | null> {

  try {
    const coordinates = await Geolocation.getCurrentPosition();
    const userLatitude = coordinates.coords.latitude;
    const userLongitude = coordinates.coords.longitude;

    this.userlongitude = userLongitude;
    this.userlatitude = userLatitude;

    return { userLatitude, userLongitude };
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées:', error);
    return null;
  }
}


async openUrl() {

  //const userLocationData = await this.getUserLocationAndCompanyId(id);

  const userLocationData = await this.getUserLocation();

  if (userLocationData) {

    const { userLatitude, userLongitude } = userLocationData;

    this.commande.forEach(async (publi) => {
      console.log('coordonné', publi.latitude, publi.longitude);
      const distance = this.distanceCalculatorService.haversineDistance(
        userLatitude,
        userLongitude,
        publi.latitude,
        publi.longitude,
      );

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



}
