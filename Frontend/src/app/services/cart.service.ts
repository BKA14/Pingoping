import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { authService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartSubject = new BehaviorSubject<any[]>([]); // Stock local du panier
  public cart$ = this.cartSubject.asObservable(); // Observable du panier pour les composants
  userData: any;

  constructor(
    private _apiService: ApiService,
    private authService: authService,
  ) {
    // S'abonner aux changements de données utilisateur
    this.authService.userData$.subscribe(data => {
      this.userData = data;

      // Lorsque les données utilisateur sont disponibles, charger le panier
      if (this.userData && this.userData.iduser) {
        this.loadCart(this.userData.iduser).subscribe({
          next: (cart) => {
            console.log('Panier chargé:', cart);
          },
          error: (err) => {
            console.error('Erreur lors du chargement du panier:', err);
          }
        });
      }
    });
  }

  // Charger le panier initial depuis l'API pour un utilisateur
  loadCart(userId): Observable<any[]> {
    return this._apiService.getCart(userId).pipe(
      tap((cart: any[]) => {
        console.log('Panier reçu du serveur:', cart);
        this.cartSubject.next(cart); // Met à jour le panier local avec les données du serveur
      })
    );
  }

 // Ajouter un plat au panier
addToCart(plat): Observable<any> {
  const body = {
    user_id: this.userData.iduser,
    plat_id: plat.id,
    nom_plat: plat.nom_plat,
    nom_restaurant: plat.nom_restaurant,
    prix: plat.prix,
    quantity: plat.quantity || 1,
  };

  return this._apiService.add_cart(body).pipe(
    tap((res: any) => {
      const currentCart = Array.isArray(this.cartSubject.value) ? this.cartSubject.value : [];

      // Ajouter le nouvel élément au panier localement après une réponse positive
      const newCartItem = {
        plat_id: plat.id,
        nom_plat: plat.nom_plat,
        nom_restaurant: plat.nom_restaurant,
        prix: plat.prix,
        quantity: plat.quantity || 1,
        id: res.panier_id  // Assure-toi que res.id correspond bien à l'ID de l'élément ajouté
      };

      this.cartSubject.next([...currentCart, newCartItem]); // Met à jour le panier localement
    })
  );
}


  // Supprimer un plat du panier
  removeFromCart(cartItemId): Observable<any> {
    return this._apiService.delete_cart(cartItemId).pipe(
      tap(() => {
        const currentCart = this.cartSubject.value.filter(item => item.id !== cartItemId);
        this.cartSubject.next(currentCart); // Met à jour le panier sans l'élément supprimé
      })
    );
  }

  // Vider le panier
  emptyCart(userId): Observable<any> {
    return this._apiService.delete_all_cart(userId).pipe(
      tap(() => {
        this.cartSubject.next([]); // Vider le panier localement
      })
    );
  }
}
