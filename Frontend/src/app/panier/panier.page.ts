import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { authService } from '../services/auth.service';
import { Router } from '@angular/router';
import { timeService } from '../timeservice.service';
import { ApiService } from '../api.service';
import { DeliveryResponse } from '../api.service';



@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  cart: any[] = [];
  total = 0;
  deliveryFee = 0; // Variable pour les frais de livraison
  duration = 3000;
  userData: any;
  serverTime: string | number | Date;
  isOrderValidated: boolean = false; // Nouveau champ pour contrôler l'état de validation



  constructor(
    private cartService: CartService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: authService,
    private router: Router,
    private timeService: timeService,
    private _apiService: ApiService,
    public loadingController: LoadingController,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.userData$.subscribe(data => {
      this.userData = data;
      this.loadCart();
    });

    this.timeService.getServerTime().subscribe((response) => {
      this.serverTime = response.serverTime;
      console.log('serveur time', this.serverTime );
    });

  }

  async loadCart() {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement du panier...',
      spinner: 'lines',
      duration: 10000,
    });

    await loading.present();

    this.cartService.loadCart(this.userData.iduser).subscribe({
      next: (cart: any[]) => {
        // Filtrer les plats invalides dès le chargement
        this.cart = Array.isArray(cart) ? cart.filter(plat => this.isValidItem(plat)) : [];
        console.log('Contenu du panier:', this.cart);
        this.calculateTotal();
        this.calculateDeliveryFee(); // Appeler ici après le chargement du panier
      },
      error: (error) => {
        console.error('Erreur lors du chargement du panier:', error);
        this.presentToast('Erreur lors du chargement du panier.', 'danger');
      },
      complete: async () => {
        await loading.dismiss();
      }
    });
  }


  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: this.duration,
      position: 'middle',
      color: color,
    });
    toast.present();
  }

  refreshPage(e: any) {
    this.loadCart();
    this.presentToast('Rafraîchissement de la page', 'success');
    e.target.complete();
  }

  validateOrder() {
    if (this.cart.length > 0 && this.total > 0) {
      this.router.navigate(['/valider-panier'], {
        state: { cart: this.cart, total: this.total }
      });
    } else {
      console.error('Le panier est vide ou le total est invalide.');
    }
  }


  isNightTime: boolean = false;

calculateTotal() {
  if (!Array.isArray(this.cart)) {
    console.error('this.cart n\'est pas un tableau:', this.cart);
    return;
  }

  const subtotal = this.cart
    .filter(plat => this.isValidItem(plat)) // Filtrer les éléments valides
    .reduce((acc, plat) => {
      // Vérifier que le prix est un nombre avant de le multiplier
      const prix = parseFloat(plat.prix); // Convertir en nombre
      return acc + (isNaN(prix) ? 0 : prix * plat.quantity);
    }, 0);

  this.total = subtotal + this.deliveryFee; // Calculer le total
}


calculateDeliveryFee(): Promise<void> {
  const totalPlats = this.cart.reduce((acc, plat) => acc + plat.quantity, 0);
  const data = { totalPlats, serverTime: this.serverTime };

  return new Promise((resolve, reject) => {
    this._apiService.calcul_total(data).subscribe({
      next: (response: DeliveryResponse) => {
        this.deliveryFee = response.deliveryFee;
        this.isNightTime = response.isNightTime;
        console.log('deliveryFee', response.deliveryFee, response.isNightTime);
        this.calculateTotal(); // Mise à jour avec les nouveaux frais
        resolve(); // Résoudre la promesse
      },
      error: (error) => {
        console.error('Erreur lors du calcul des frais de livraison:', error);
        this.presentToast('Erreur de calcul des frais de livraison', 'danger');
        reject(error); // Rejeter la promesse en cas d'erreur
      },
    });
  });
}

async validatepanier() {
  try {
    await this.calculateDeliveryFee(); // Attendre que le calcul soit terminé
    // Ici, vous pouvez gérer la logique après que les frais de livraison ont été calculés
    if (this.deliveryFee >= 0) { // ou toute autre condition de succès
      this.isOrderValidated = true; // Supposons que la validation soit réussie
      this.presentToast('Panier validé avec succès', 'success');
      // Afficher le bouton commander
    } else {
      this.presentToast('Erreur de validation du panier. Veuillez réessayer.', 'danger');
    }
  } catch (error) {
    console.error('Erreur lors de la validation du panier:', error);
    this.presentToast('Erreur de validation du panier. Veuillez réessayer.', 'danger');
  }
}



increaseQuantity(index: number) {
  if (this.cart[index].quantity < 10) {
    this.cart[index].quantity++;
    this.cartService.updateCart(this.cart).subscribe(); // Mettez à jour le panier
    this.calculateTotal();
    this.calculateDeliveryFee();
  } else {
    this.presentToast('Quantité maximale atteinte', 'warning');
  }
}


decreaseQuantity(index: number) {
  if (this.cart[index].quantity > 1) {
    this.cart[index].quantity--;
    this.cartService.updateCart(this.cart).subscribe(); // Mettez à jour le panier
    this.calculateTotal();
    this.calculateDeliveryFee();
  } else {
    this.presentToast('Quantité minimale atteinte', 'warning');
  }
}


async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Etes-vous sur de vouloir vider votre panier ?',
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

        this.vider_panier();

      },
      },
  ],
  });
return alert.present();
this.cdr.detectChanges();
}


    // Vider le panier
    vider_panier() {
      this.cartService.emptyCart(this.userData.iduser).subscribe({
        next: () => {
          this.presentToast('Panier vidé', 'success');
          this.cart = [];
          this.total = 0;
          this.deliveryFee = 0; // Mettre les frais de livraison à 0
        },
        error: (error) => {
          console.error('Erreur lors du vidage du panier:', error);
          this.presentToast('Erreur lors du vidage du panier. Veuillez réessayer.', 'danger');
        }
      });
    }




      // Supprimer un plat du panier
  removeFromCart(cartItemId: any) {
    this.cartService.removeFromCart(cartItemId, this.userData.iduser).subscribe({
      next: () => {
        this.presentToast('Plat supprimé du panier', 'warning');
        this.loadCart(); // Recharger le panier
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du panier:', error);
        this.presentToast('Erreur lors de la suppression du plat. Veuillez réessayer.', 'danger');
      }
    });
  }


  isValidItem(plat: any): boolean {
    return plat.nom_restaurant &&
           plat.nom_plat &&
           plat.prix != null &&
           !isNaN(plat.prix) &&
           plat.prix > 0 &&
           plat.quantity > 0;
  }


}
