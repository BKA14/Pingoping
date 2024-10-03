import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { authService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  cart: any[] = []; // Initialisation à un tableau vide
  total = 0;
  duration = 3000;
  userData: any;

  constructor(
    private cartService: CartService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: authService,
    private router: Router
  ) {}

  ngOnInit() {
    // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;
      this.loadCart(); // Charger le panier chaque fois que userData change
    });
  }

  async loadCart() {

    const loading = await this.loadingCtrl.create({
      message: 'Chargement du panier...',
      spinner: 'lines',
      duration: 7000,
    });

    await loading.present();

    this.cartService.loadCart(this.userData.iduser).subscribe({
      next: (cart: any[]) => {
        this.cart = cart || []; // Assurez-vous que cart est toujours un tableau
        this.calculateTotal();   // Recalculer le total du panier
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

  refreshPage(e: any) {
    this.loadCart();
    this.presentToast('Rafraîchissement de la page', 'success');
    e.target.complete();
  }

  validateOrder() {
    // Vérifiez que vous avez bien des articles dans le panier
    if (this.cart.length > 0 && this.total > 0) {
      // Naviguez vers la page 'valider-panier' en passant l'état (cart et total)
      this.router.navigate(['/valider-panier'], {
        state: { cart: this.cart, total: this.total }
      });
    } else {
      console.error('Le panier est vide ou le total est invalide.');
    }
  }

  // Ajouter un plat au panier
  ajouterAuPanier(plat) {
    const index = this.cart.findIndex(item => item.plat_id === plat.id);

    if (index > -1) {
      // Si le plat est déjà dans le panier, le supprimer
      this.cartService.removeFromCart(this.cart[index].id).subscribe({
        next: () => {
          this.presentToast(`${plat.nom_plat} supprimé du panier.`, 'warning');
          this.loadCart(); // Recharger le panier après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du panier:', error);
          this.presentToast('Erreur lors de la suppression du plat. Veuillez réessayer.', 'danger');
        }
      });
    } else {
      // Ajouter le plat au panier
      this.cartService.addToCart(plat).subscribe({
        next: () => {
          this.presentToast(`${plat.nom_plat} ajouté au panier.`, 'success');
          this.loadCart(); // Recharger le panier après ajout
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout au panier:', error);
          this.presentToast('Erreur lors de l\'ajout au panier. Veuillez réessayer.', 'danger');
        }
      });
    }
  }


  // Supprimer un plat du panier
  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId).subscribe({
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

  // Vider le panier
  vider_panier(){
    this.cartService.emptyCart(this.userData.iduser).subscribe({
      next: () => {
        this.presentToast('Panier vidé', 'success');
        this.cart = [];
        this.total = 0;
      },
      error: (error) => {
        console.error('Erreur lors du vidage du panier:', error);
        this.presentToast('Erreur lors du vidage du panier. Veuillez réessayer.', 'danger');
      }
    });
  }

  // Méthode pour vérifier si un plat est valide (toutes les informations sont présentes)
isValidItem(plat: any): boolean {
  return plat.nom_restaurant && plat.nom_plat && plat.prix && plat.quantity;
}

// Calculer le prix total en excluant les plats incomplets
calculateTotal() {
  this.total = this.cart
    .filter(plat => this.isValidItem(plat))  // Filtrer les plats valides
    .reduce((acc, plat) => acc + plat.prix * plat.quantity, 0);
}

  increaseQuantity(index: number) {
    if (this.cart[index].quantity < 10) { // Limiter la quantité à 10 par exemple
      this.cart[index].quantity++;
      this.calculateTotal();
    } else {
      this.presentToast('Quantité maximale atteinte', 'warning');
    }
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
      this.calculateTotal();
    } else {
      this.presentToast('Quantité minimale atteinte', 'warning');
    }
  }
}
