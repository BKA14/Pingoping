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
  selector: 'app-get-commande',
  templateUrl: './get-commande.page.html',
  styleUrls: ['./get-commande.page.scss'],
})
export class GetCommandePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  infiniteScrollDisabled: boolean = false;
  commande: any = [];
  nbr_attente: number = 0;
  nbr_en_cours: number = 0;
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

    this.getsessionuser();
    this.get_commande()  ;

    }

    ngOnInit() {
      this.updateSubscription = interval(18000).subscribe(async () => {
        await this.openUrl(); // Si tu as besoin de faire quelque chose avant l'appel réseau
        this.get_commande_2(); // Récupérer les nouvelles données depuis l'API
        this.cdr.detectChanges(); // Appliquer les changements
      });

      // S'abonner aux changements de données utilisateur
      this.authService.userData$.subscribe(data => {
        this.userData = data;
      });

      this.timeService.getServerTime().subscribe((response) => {
        this.serverTime = response.serverTime;
        console.log('serveur time', this.serverTime);
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
        position: 'middle',
        color: color,
      });
      toast.present();
      }


    getsessionuser(){

      this.grade= (localStorage.getItem('grade'));
      console.log(this.grade);

      }



      ngOnDestroy() {
        if (this.websocketSubscription) {
          this.websocketSubscription.unsubscribe();
        }
        if (this.updateSubscription) {
          this.updateSubscription.unsubscribe();
        }
      }

  async get_commande() {

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
      duration: 7000,
    });

    loading.present();

    this.page = 1;
    this.oldcommande = this.commande;

    try {
    const res : any = await this._apiService.get_commande(this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

      // Filtrer les commandes avec statut 'en attente'
      this.nbr_attente = res.nbr_attente; // Nombre de commandes "en attente"
      this.nbr_en_cours = res.nbr_en_cours; // Nombre de commandes "en cours de livraison"

    if (res && res.length < 1) {
      this.commande = 'aucune_alerte';
    } else {
      this.commande =  res.orders;
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


    async get_commande_2() {

      this.page = 1; // Assure-toi que la pagination est correcte
      this.oldcommande = this.commande; // Sauvegarde de l'ancienne liste de commandes

      try {
        const res: any = await this._apiService.get_commande(this.page, this.limit).toPromise();
        console.log('SUCCESS ===', res);

        // Filtrer les commandes avec statut 'en attente'
        this.nbr_attente = res.nbr_attente; // Nombre de commandes "en attente"
        this.nbr_en_cours = res.nbr_en_cours; // Nombre de commandes "en cours de livraison"

        if (res && res.length < 1) {
          this.commande = 'aucune_alerte';
        } else {
          // Synchroniser les commandes avec la nouvelle liste reçue
          this.syncCommandes(res.orders);
        }

      } catch (error) {
        console.log('erreur de chargement', error);
        this.presentToast("Erreur de chargement");
        this.commande = this.oldcommande && this.oldcommande.length > 0 ? this.oldcommande : 'erreur_chargement';
      }
    }

    syncCommandes(nouvellesCommandes: any[]) {
      // Gérer l'ajout, la mise à jour et la suppression des commandes
      const updatedCommandes = [...this.commande]; // Copie de l'ancienne liste pour comparaison

      // 1. Gérer les ajouts et les mises à jour
      nouvellesCommandes.forEach(nouvelleCommande => {
        const index = updatedCommandes.findIndex(c => c.commande_id === nouvelleCommande.commande_id);

        if (index === -1) {
          // Ajout en tête si c'est une nouvelle commande
          updatedCommandes.unshift(nouvelleCommande);
        } else {
          // Mise à jour de la commande existante
          updatedCommandes[index] = nouvelleCommande;
        }
      });

      // 2. Gérer les suppressions
      this.commande = updatedCommandes.filter(commande =>
        nouvellesCommandes.some(nouvelleCommande => nouvelleCommande.commande_id === commande.commande_id)
      );

      // 3. Mettre à jour la liste des commandes
      if (this.commande.length === 0) {
        this.commande = 'aucune_alerte'; // Aucun élément dans la liste
      }
    }


    async loadMore(event) {

      this.page++;
      this.oldcommande = this.commande;

      try {
        const res : any  = await this._apiService.get_commande(this.page, this.limit).toPromise();

        this.commande = this.commande.concat(res.orders);
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


      async presentAlert(id) {
        const alert = await this.alertController.create({
          header: 'Etes-vous sur de vouloir supprimer ce plat  ?',
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

      this._apiService.supprimer_plat(resto.id).subscribe((res:any)  => {

        loading.dismiss();

        this.get_commande() ;

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

getLoadFunction(event) {

if (this.search){
    this.load_more_search(event);
  }
  else {
    this.loadMore(event);
  }
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
   this.oldcommande = this.commande;

   const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
    duration: 7000,
  });

  loading.present();

   try {
     const res : any = await this._apiService.load_search_commande(this.term, this.page, this.limit).toPromise();
     console.log('SUCCESS ===', res);

     if (res && res.length < 1) {
       this.commande = 'aucune_alerte';
     }
     else {
        this.commande = res.orders;
        await this.openUrl();

     }
     loading.dismiss();
     } catch (error) {
     if (this.oldcommande && this.oldcommande.length > 0) {
       this.commande = this.oldcommande;
     }
     else { this.commande = 'erreur_chargement'; }
     console.log('Erreur de chargement', error);
   }

   loading.dismiss();

 }


 async load_more_search(event) {

  this.page++;
  this.oldcommande = this.commande;
  try {
    const res : any  = await this._apiService.load_search_commande(this.term, this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    this.commande = this.commande.concat(res.orders);
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
    this.presentToast('statut mis a jour avec succés', 'success');


  } catch (error) {
    console.log('Erreur de chargement', error);
    this.presentToast('Erreur lors de la mise a jour du statut. Veuillez réessayer.', 'danger');
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
  const userLocationData = await this.getUserLocation();

  if (userLocationData) {
    const { userLatitude, userLongitude } = userLocationData;

    this.commande.forEach((publi) => {
      // Vérifiez si les coordonnées ne sont pas 'non'
      if (publi.latitude !== 'non' && publi.longitude !== 'non') {
        const distance = this.distanceCalculatorService.haversineDistance(
          userLatitude,
          userLongitude,
          parseFloat(publi.latitude), // Assurez-vous de convertir en nombre si nécessaire
          parseFloat(publi.longitude)
        );

        console.log(`Distance entre l'utilisateur et l'alerte : ${distance} mètres`);

        if (!isNaN(distance)) {
          publi.distanceToUser = distance;
          console.log(`Distance entre l'utilisateur et l'alerte : ${publi.distanceToUser} mètres`);
        } else {
          publi.distanceToUser = 'Coordonnées invalides';
          console.error('Coordonnées invalides pour l\'alerte:', publi);
        }
      } else {
        publi.distanceToUser = 'Coordonnées non disponibles';
        console.log('Coordonnées non disponibles pour cette commande');
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
