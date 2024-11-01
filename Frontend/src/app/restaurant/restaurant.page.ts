import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { CustomFilterPipe } from './custom-filter.pipe';
import { Geolocation } from '@capacitor/geolocation';
import { interval, Subscription } from 'rxjs';
import { CommentaireService } from './CommentaireService';
import { DistanceCalculatorService } from './distance-calculator.service';
import { authService } from '../services/auth.service';
import { WebSocketService } from '../websocket.service';
import { CartService } from '../services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  infiniteScrollDisabled: boolean = false;
  resto: any = [];
  grade: any;
  term: any;
  oldresto: any;
  page: number = 1;
  limit: number = 14;
  userlongitude: any;
  userlatitude: any;
  duration = 2000;
  limit_comment: number = 180; // Limite des caractères avant le tronquage
  search: boolean = false;

  private unsubscribe$ = new Subject<void>();
  private updateSubscription: Subscription;
  showFullCommentaire: boolean = false;
  userData: any;
  private websocketSubscription: Subscription;
  cart = [];


  constructor(
    private _apiService: ApiService,
    private callNumber: CallNumber,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastCtrl: ToastController,  // Injecter le ToastController
    public commentaireService: CommentaireService,
    private distanceCalculatorService: DistanceCalculatorService,
    private authService: authService,
    private wsService: WebSocketService,
    private cartService: CartService

  ) {

    this.restaurant()  ;

    }

  ngOnInit() {

  this.updateSubscription = interval(15000).subscribe(async () => {
    await this.openUrl_resto();
    this.cdr.detectChanges(); // Détecter et appliquer les changements
    });

  // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  // S'abonner aux changements du panier
  this.cartService.cart$.subscribe(cart => {
    this.cart = cart;
  });

    this.loadLike() ;
    this.getsessionuser();

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

      this.grade= this.userData.grade;
      console.log(this.grade);

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

      async restaurant() {
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

          this.oldresto = this.resto;

          // Appel API pour récupérer les pubs
          this._apiService.restaurant(this.page, this.limit)
            .pipe(takeUntil(this.unsubscribe$)) // Ajout de takeUntil pour arrêter l'abonnement lorsque la page est détruite
            .subscribe(
              async (res: any) => {
                if (res && Array.isArray(res) && res.length > 0) {
                  this.resto = res;
                  try {
                    await this.openUrl_resto();
                  } catch (error) {
                    console.error("Erreur critique lors de l'appel à openUrl:", error);
                  }
                } else {
                  this.resto = 'aucune_alerte';
                }

                await loading.dismiss();
              },
              async (error: any) => {
                console.error("ERROR == pub", error);
                if (this.oldresto && this.oldresto.length > 0) {
                  this.resto = this.oldresto;
                } else {
                  this.resto = 'erreur_chargement';
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


    async restaurant_2() {

      this.page = 1;
      this.oldresto = this.resto;

      try {
      const res : any = await this._apiService.restaurant(this.page, this.limit).toPromise();

      if (res && res.length < 1) {
        this.resto = 'aucune_alerte';
      } else {
        this.resto =  res;
        this.syncCommandes(res);
       await  this.openUrl_resto();
      }

      } catch (error) {
      console.log('erreur de chargement', error);
      if (this.oldresto && this.oldresto.length > 0) {
        this.resto = this.oldresto;

      }
      else { this.resto = 'erreur_chargement'; }
      console.log('Erreur de chargement', error);
    }
      }


      syncCommandes(nouveauResto: any[]) {
        // Gérer l'ajout, la mise à jour et la suppression des commandes
        const updatedResto = [...this.resto]; // Copie de l'ancienne liste pour comparaison

        // 1. Gérer les ajouts et les mises à jour
        nouveauResto.forEach(nouveauResto => {
          const index = updatedResto.findIndex(c => c.id === nouveauResto.id);

          if (index === -1) {
            // Ajout en tête si c'est une nouvelle commande
            updatedResto.unshift(nouveauResto);
          } else {
            // Mise à jour de la commande existante
            updatedResto[index] = nouveauResto;
          }
        });

        // 2. Gérer les suppressions
        this.resto = updatedResto.filter(resto =>
          nouveauResto.some(nouveauResto => nouveauResto.id === resto.id)
        );

        // 3. Mettre à jour la liste des commandes
        if (this.resto.length === 0) {
          this.resto = 'aucune_alerte'; // Aucun élément dans la liste
        }
      }


    async loadMore(event) {

      this.page++;
      this.oldresto = this.resto;

      try {
        const res : any  = await this._apiService.restaurant(this.page, this.limit).toPromise();

        this.resto = this.resto.concat(res);
        this.openUrl_resto();
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

        // Log pour indiquer le rafraîchissement
        console.log('Rafraîchissement de la page');

        // Terminer l'animation de rafraîchissement
        e.target.complete();
      }


      async presentAlert(id) {
        const alert = await this.alertController.create({
          header: 'Etes-vous sur de vouloir supprimer ce restaurant ? ?',
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

        this.restaurant_2() ;
        loading.dismiss();



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


  async getUserLocation(): Promise<{ userLatitude: number; userLongitude: number } | null> {
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout: Unable to get location')), 6000)
      );

      const geolocationPromise = Geolocation.getCurrentPosition();

      const coordinates = await Promise.race([geolocationPromise, timeoutPromise]) as GeolocationPosition; // Assertion de type ici

      const userLatitude = coordinates.coords.latitude;
      const userLongitude = coordinates.coords.longitude;

      console.log('Latitude:', userLatitude);
      console.log('Longitude:', userLongitude);

      this.userlongitude = userLongitude;
      this.userlatitude = userLatitude;

      return {  userLatitude, userLongitude };
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error);
      return null;
    }
  }

async openUrl_resto() {
  console.log('Début de openUrl');
  const userLocationData = await this.getUserLocation();

  if (userLocationData) {
    const { userLatitude, userLongitude } = userLocationData;
    console.log(`Coordonnées utilisateur : ${userLatitude}, ${userLongitude}`);

    if (Array.isArray(this.resto)) {
      for (const publi of this.resto) {
        const distance = this.distanceCalculatorService.haversineDistance(
          userLatitude,
          userLongitude,
          publi.latitude,
          publi.longitude
        );

        console.log(`Distance : ${distance} mètres`);

        if (!isNaN(distance)) {
          publi.distanceToUser = distance;
          console.log(`Distance entre l'utilisateur et l'entreprise : ${publi.distanceToUser} mètres`);
        } else {
          console.error('La distance est NaN.');
        }
      }
    } else {
      console.error('this.pub n\'est pas un tableau :', this.resto);
    }
  } else {
    this.userlongitude = null;
    this.userlatitude = null;
    console.error('Impossible de récupérer les coordonnées de l\'utilisateur.');
    throw new Error('Erreur: Impossible de récupérer les coordonnées de l\'utilisateur.');
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



toggleCommentaire() {
  this.showFullCommentaire = !this.showFullCommentaire;
}

getDisplayedCommentaire(resto): string {
  if (this.showFullCommentaire || resto.commentaire.length <= this.limit_comment) {
    return resto.commentaire;
  } else {
    return this.commentaireService.truncate(resto.commentaire, this.limit_comment);
  }
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
  // La valeur actuelle du champ de recherche
  const term = event.target.value;

  // Vérifier si l'utilisateur a tapé quelque chose
  if (term && term.trim() !== '') {
    this.search = true;
    this.term = term;
    this.loadalert_search(); // Appeler la fonction de recherche
  } else
  {
       this.search = false; // Réinitialiser la recherche si le champ est vide
       this.term = '';
       this.page = 1;
       this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
       this.restaurant();

  }
}


async loadalert_search() {

  this.page = 1;
   this.oldresto = this.resto;

   try {
     const res : any = await this._apiService.load_search_resto(this.term, this.page, this.limit).toPromise();


     if (res && res.length < 1) {
       this.resto = 'aucune_alerte';
     }
     else {
        this.resto = res;
        this.openUrl_resto();
     }

     } catch (error) {
     if (this.oldresto && this.oldresto.length > 0) {
       this.resto = this.oldresto;
     }
     else { this.resto = 'erreur_chargement'; }
     console.log('Erreur de chargement', error);
   }

 }


 async load_more_search(event) {

  this.page++;
  this.oldresto = this.resto;
  try {
    const res : any  = await this._apiService.load_search_resto(this.term, this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    this.resto = this.resto.concat(res);
    event.target.complete();

      // Désactiver l'infinite scroll si moins de données retournées que la limite
  if (res.length < this.limit) {
    this.infiniteScrollDisabled = true;
    this.search = false ;
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


hasLiked(resto: any): boolean {

  if (!resto || !resto.user_ids || !this.userData || !this.userData.iduser) {
    return false;
  }
  return resto.user_ids.includes(this.userData.iduser.toString());
}

formatLikesCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // Abrege en millions
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Abrege en milliers
  } else {
    return count.toString(); // Affiche le nombre tel quel si moins de 1000
  }
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
            const updatedIndex = this.resto.findIndex(resto => resto.id === message.idpub);
            if (updatedIndex !== -1) {
              this.resto[updatedIndex].likes_count = message.likes_count;
              this.resto[updatedIndex].user_ids = message.user_ids;
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


like_resto(resto: any) {
  if (resto.isLoading) return; // Évite les clics multiples

  resto.isLoading = true;

  let data = {
    iduser: this.userData.iduser,
    contactuser: this.userData.numuser,
    id_resto: resto.id,
  };

  this._apiService.get_etat_resto(data).subscribe(async (res:any) => {
    console.log("SUCCESS ===",res);

    if(res.result === 'oui') {
      if(res.data.etat === 'oui') {
       await  this.disLike(resto);
       resto.likes_count--;
       resto.user_ids = resto.user_ids.filter(userId => userId !== this.userData.iduser);
      } else if (res.data.etat === 'non') {
        await  this.Likes(resto);
        resto.likes_count++;
        resto.user_ids.push(this.userData.iduser);
      }
    } else if (res.result === 'non') {
      await this.Likepremier(resto);
      resto.likes_count++;
      resto.user_ids.push(this.userData.iduser);
    }

    resto.isLoading = false;
    this.cdr.detectChanges();
  }, (error: any) => {
    resto.isLoading = false;
    console.log('Erreur de connection  nouveau etat non enregistre');
    console.log("ERROR ===",error);
  });
}


async Likepremier(resto): Promise<void> {

  let data = {

    iduser: this.userData.iduser,
    contactuser: this.userData.numuser,
    etat: 'oui',
    id_resto: resto.id,
   }

   this._apiService.addetatlikes_resto(data).subscribe((res:any) => {

   },(error: any) => {

    console.log('Erreur de connection nouveau etat non enregistre');
    console.log("ERROR ===",error);
   })

   this.cdr.detectChanges();

      }


     async Likes(resto): Promise<void> {

      let data = {

        iduser: this.userData.iduser,
        contactuser: this.userData.numuser,
        etat: 'oui',
        id_resto: resto.id,

       }

       this._apiService.disLike_resto(resto.id,data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
         //window.location.reload();

         //alert('Nouveau etat ajoute avec success');
       },(error: any) => {

        console.log('Erreur de connection  nouveau etat non enregistre');
        console.log("ERROR ===",error);
       })

       this.cdr.detectChanges();

          }


     async disLike(resto): Promise<void> {

      let data = {

        iduser: this.userData.iduser,
        contactuser: this.userData.numuser,
        etat: 'non',
        id_resto: resto.id,

       }

       this._apiService.disLike_resto(resto.id,data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);


       },(error: any) => {

        console.log('Erreur de connection  nouveau etat non enregistre');
        console.log("ERROR ===",error);
       })

       this.cdr.detectChanges();

        }

}
