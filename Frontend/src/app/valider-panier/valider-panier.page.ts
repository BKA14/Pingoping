import { authService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ApiService } from '../api.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { timeService } from '../timeservice.service';
import * as L from 'leaflet';
// Import the Leaflet CSS



// Fix Leaflet's default icon paths
import { icon, Icon } from 'leaflet';
import { CartService } from '../services/cart.service';

const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
@Component({
  selector: 'app-valider-panier',
  templateUrl: './valider-panier.page.html',
  styleUrls: ['./valider-panier.page.scss'],
})
export class ValiderPanierPage implements OnInit {

  signalementForm: FormGroup;
  selectedMedia: string | undefined;
  service: any;
  userData: any;
  cart: any[] = [];
  total: number = 0;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private _apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private authService: authService,
    private timeService: timeService,
    private toastCtrl: ToastController,
    private cartService: CartService
  ) {
    this.signalementForm = this.fb.group({
      location: this.fb.group({
        latitude: [0],
        longitude: [0]
      })
    });
  }

  ngOnInit(): void {

        // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  // S'abonner aux changements du panier
  this.cartService.cart$.subscribe(cart => {
    this.cart = cart;
  });

  const state = this.router.getCurrentNavigation()?.extras?.state;
  if (state) {
    this.cart = state.cart || [];
    this.total = state.total || 0;
  }

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


    async confirmOrder() {
      const orderData = {
        cart: this.cart,
        total: this.total,
        user: {
          id: this.userData.iduser,
          nom: this.userData.nom,
          prenom: this.userData.prenom1,
          contact: this.userData.numuser,
        }
      };

      await this.getLocation(); // Obtenir la position GPS avant d'envoyer la commande

      if (this.signalementForm.valid) {
        const combinedData = {
          ...orderData,
          ...this.signalementForm.value
        };

        console.log('Combined data:', combinedData);

        // Envoie au serveur via une API
        this.sendOrderToServer(combinedData); // Envoyer combinedData, pas juste orderData
      }
    }


    async sendOrderToServer(order: any) {

      if (this.cart.length === 0 || this.total <= 0) {
        alert('Votre panier est vide ou le montant total est incorrect.');
        return;
      }

      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        cssClass: 'custom-loading',
        duration: 10000,
      });

      loading.present();

      this._apiService.add_commande(order).subscribe({
        next: (response) => {
          // Appeler emptyCart et s'abonner à l'observable pour exécuter l'opération
          this.cartService.emptyCart(this.userData.iduser).subscribe({
            next: () => {
              console.log('Panier vidé avec succès');
              this.router.navigate(['/get-commande-user']);
            },
            error: (err) => {
              console.error('Erreur lors du vidage du panier:', err);
            }
          });

          alert('Commande effectuée avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi de la commande', error);
          this.presentToast('Erreur lors de l\'envoi de la commande...');
        },
        complete: () => {
          loading.dismiss();
        }
      });
    }


  localiser() {
    this.getLocation();
  }


map: L.Map;
marker: L.Marker;
mapVisible = false;

async getLocation() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    this.signalementForm.patchValue({
      location: {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      }
    });
    this.updateMapLocation(coordinates.coords.latitude, coordinates.coords.longitude);
  } catch (error) {
    alert('Impossible de récupérer vos coordonnées, verifier votre connexion et assurez-vous d\'activer les services de localisation sur votre mobile. Si le problème persiste contacté Pingoping depuis les paramètres. ');
  }
}

ngAfterViewInit() {
  this.getLocation();
}

actualiser_carte() {
  this.map.invalidateSize();
}


enableManualLocationSelection() {
  // Afficher le conteneur de la carte
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    mapContainer.style.display = 'block';

    // Forcer le recalcul des dimensions de la carte
    setTimeout(() => {
      this.map.invalidateSize();
    }, 300); // Attendez une courte période avant de recalculer la taille
  }

  // Initialiser la carte si elle n'est pas déjà initialisée
  if (!this.map) {
    const lat = this.signalementForm.get('location')?.value?.latitude;
    const lng = this.signalementForm.get('location')?.value?.longitude;
    this.initMap(lat, lng);
  }

  // Afficher le bouton de validation
  this.mapVisible = true;

  // Ajouter un événement de clic sur la carte pour permettre à l'utilisateur de sélectionner une position
  this.map.on('click', (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    this.updateMarker(lat, lng);
  });
}


valider() {
  // Masquer la carte et réinitialiser la visibilité
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    mapContainer.style.display = 'none';
  }
  this.mapVisible = false;

}

private initMap(lat: number, lng: number) {
  this.map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);

  this.marker = L.marker([lat, lng], {
    draggable: true
  }).addTo(this.map);

  this.marker.on('dragend', (e) => {
    const { lat, lng } = e.target.getLatLng();
    this.updateMarker(lat, lng);
  });
}

private updateMapLocation(lat: number, lng: number) {
  if (this.map) {
    this.map.setView([lat, lng], 13);
    this.updateMarker(lat, lng);
  } else {
    this.initMap(lat, lng);
  }
}

private updateMarker(lat: number, lng: number) {
  if (this.marker) {
    this.marker.setLatLng([lat, lng]);
  } else {
    this.marker = L.marker([lat, lng], {
      draggable: true
    }).addTo(this.map);
  }
  // Mettez à jour le formulaire avec les nouvelles coordonnées
  this.signalementForm.patchValue({
    location: {
      latitude: lat,
      longitude: lng
    }
  });
  console.log('Coordonnées sélectionnées:', lat, lng);
}

}



