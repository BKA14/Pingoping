import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CustomFilterPipe } from './custom-filter.pipe';
import { Geolocation } from '@capacitor/geolocation';
import { interval, Subscription } from 'rxjs';
import { authService } from '../services/auth.service';
import { WebSocketService } from '../websocket.service';
import { CartService } from '../services/cart.service'; // service panier


@Component({
  selector: 'app-list-plat',
  templateUrl: './list-plat.page.html',
  styleUrls: ['./list-plat.page.scss'],
})
export class ListPlatPage implements OnInit {


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  infiniteScrollDisabled: boolean = false;
  resto: any = [];
  grade: any;
  term: any;
  oldresto: any;
  page: number = 1;
  limit: number = 12;
  duration = 2000;
  limit_comment: number = 180; // Limite des caractères avant le tronquage
  search: boolean = false;


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
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastCtrl: ToastController,  // Injecter le ToastController
    private authService: authService,
    private wsService: WebSocketService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {

    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      this.contact_admin = params.contact_admin;
      this.nom_resto = params.nom_resto

      this.restaurant(this.id);
    });

    }

  ngOnInit() {


      // Charger le panier initial à partir du serveur
      this.cartService.loadCart(this.cartService.userData.iduser);

      // S'abonner aux changements du panier
      this.cartService.cart$.subscribe(cart => {
        this.cart = cart;
      });

    // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;
    });

    this.getsessionuser();

    this.restaurant(this.id)  ;

  }

  ajouterAuPanier(plat) {
    // Vérifier que le nom du restaurant, le nom du plat et le prix sont présents
    if (!plat.nom_restaurant || !plat.nom_plat || !plat.prix) {
      // Si un champ est manquant, afficher un toast d'erreur
      this.presentToast('Erreur : veuillez contacter le pingoping. Informations manquantes.', 'danger');
      console.error('Erreur : informations manquantes pour ajouter le plat au panier.');
    } else {
      // S'assurer que this.cart est bien un tableau
      if (!Array.isArray(this.cart)) {
        this.cart = []; // Initialiser this.cart comme un tableau vide s'il n'est pas défini ou incorrect
      }

      // Vérifier si le plat existe déjà dans le panier local (this.cart)
      const index = this.cart.findIndex(item => item.plat_id == plat.id);

      if (index > -1) {
        // Si le plat est déjà dans le panier, le supprimer
        this.cartService.removeFromCart(this.cart[index].id) // Utiliser l'ID du plat
          .subscribe({
            next: (res: any) => {
              console.log(`${plat.nom_plat} supprimé du panier.`);
              this.presentToast(`${plat.nom_plat} supprimé du panier.`, 'warning');
            },
            error: (error) => {
              // Afficher un message d'erreur en fonction du type d'erreur
              console.error('Erreur lors de la suppression du plat du panier:', error);
              this.presentToast('Erreur lors de la suppression du plat. Veuillez réessayer.', 'danger');
            }
          });
      } else {
        // Ajouter le plat au panier si tout est correct
        this.cartService.addToCart(plat)
          .subscribe({
            next: (res: any) => {
              console.log(`${plat.nom_plat} ajouté au panier.`);
              this.presentToast(`${plat.nom_plat} ajouté au panier.`, 'success');
            },
            error: (error) => {
              // Afficher un message d'erreur en fonction du type d'erreur
              console.error('Erreur lors de l\'ajout du plat au panier:', error);
              this.presentToast('Erreur lors de l\'ajout du plat au panier. Veuillez réessayer.', 'danger');
            }
          });
      }
    }
  }


  isInCart(plat) {
    // Vérifier que this.cart est bien un tableau avant d'utiliser .some()
    if (Array.isArray(this.cart)) {
      const inCart = this.cart.some(item => item.plat_id === plat.id);
      console.log(`Plat: ${plat.nom_plat}, In Cart: ${inCart}`);
      console.log('cart', this.cart);
      return inCart;
    } else {
      // Si le panier est vide ou non défini, renvoyer false
      return false;
    }
  }


  reloadPage() {

    this.cartService.loadCart(this.cartService.userData.iduser);

    this.restaurant(this.id);

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


  async restaurant(id) {

    this.page = 1;
    this.oldresto = this.resto;

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
      duration: 7500,
    });

    loading.present();



    try {
    const res : any = await this._apiService.plat_resto(id, this.page, this.limit).toPromise();
    console.log('SUCCESS ===', res);

    if (res && res.length < 1) {
      this.resto = 'aucune_alerte';
    } else {
      this.resto =  res;
    }

    loading.dismiss();

    } catch (error) {
    console.log('erreur de chargement', error);
    this.presentToast("Erreur de chargement");
    if (this.oldresto && this.oldresto.length > 0) {
      this.resto = this.oldresto;
    }
    else { this.resto = 'erreur_chargement'; }
    console.log('Erreur de chargement', error);
    this.presentToast("Erreur de chargement");

    loading.dismiss();
  }

    }


    async loadMore(event) {

      this.page++;
      this.oldresto = this.resto;

      try {
        const res : any  = await this._apiService.restaurant(this.page, this.limit).toPromise();

        this.resto = this.resto.concat(res);
        event.target.complete();

          // Désactiver l'infinite scroll si moins de données retournées que la limite
      if (res.length < this.limit) {
        this.infiniteScrollDisabled = true;
      }
      } catch (error) {
        this.presentToast('Rafraîchissement de la page','success');
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

         // Charger le panier initial à partir du serveur
        this.cartService.loadCart(this.cartService.userData.iduser);
        this.restaurant(this.id);

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

        this.restaurant(this.id) ;

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
       this.restaurant(this.id);

  }

}


async loadalert_search() {

  this.page = 1;
   this.oldresto = this.resto;

   try {
     const res : any = await this._apiService.load_search_resto(this.term, this.page, this.limit).toPromise();
     console.log('SUCCESS ===', res);

     if (res && res.length < 1) {
       this.resto = 'aucune_alerte';
     }
     else {
        this.resto = res;
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


}
