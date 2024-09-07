import { authService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { timeService } from '../timeservice.service';
import * as L from 'leaflet';
// Import the Leaflet CSS



// Fix Leaflet's default icon paths
import { icon, Icon } from 'leaflet';

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
  selector: 'app-signalisation',
  templateUrl: './signalisation.page.html',
  styleUrls: ['./signalisation.page.scss'],
})
export class SignalisationPage implements OnInit {
  signalementForm: FormGroup;
  selectedMedia: string | undefined;
  service: any;
  ville: any;
  userData: any;
  serverTime: string | number | Date;


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private _apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private authService: authService,
    private timeService: timeService
  ) {
    this.signalementForm = this.fb.group({
      category: ['', Validators.required],
      description: [''],
      image: ['', Validators.required],
      ville: ['', Validators.required],
      location: this.fb.group({
        latitude: [0],
        longitude: [0]
      })
    });
  }

  ngOnInit(): void {
    // Initialize any additional logic here if necessary
    this.getLocation();
    this.getservice();
    this.getville();

        // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  this.timeService.getServerTime().subscribe((response) => {
    this.serverTime = response.serverTime;
    console.log('serveur time', this.serverTime );
  });

  console.log(console.log(this.userData.numuser));

  }


  async getservice(){

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner:'lines',
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.getservice().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.service = res;
      loading.dismiss();
     },(error: any) => {
      console.log("Erreur de connection ",error);
      loading.dismiss();
  })
  }

  async getville(){
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.getville().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.ville = res;
      loading.dismiss();
     },(error: any) => {
      console.log("Erreur de connection ",error);
      loading.dismiss();
  })
  }


  localiser() {
    this.getLocation();
  }

  async selectMedia(): Promise<void> {
    try {
        const media = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri, // Utiliser Uri pour obtenir le chemin du fichier
            source: CameraSource.Prompt // Permet à l'utilisateur de choisir entre la caméra et la galerie
        });

        const fileUri = media.webPath!;
        const fileType = media.format;
        const base64Data = await this.readAsBase64(fileUri);

        // Vérifier la taille du fichier
        const fileSizeInBytes = this.getFileSize(base64Data);
        const maxVideoSizeInBytes = 100 * 1024 * 1024; // Limite de taille de 100 Mo pour les vidéos

        if (['jpeg', 'png', 'gif', 'bmp'].includes(fileType) && fileSizeInBytes <= maxVideoSizeInBytes) {
            // C'est une image
            this.selectedMedia = `data:image/${fileType};base64,${base64Data}`;
            this.signalementForm.patchValue({ image: this.selectedMedia });
        } else if (['mp4', 'webm', 'ogg'].includes(fileType) && fileSizeInBytes <= maxVideoSizeInBytes) {
            // C'est une vidéo et elle est dans la limite de taille
            this.selectedMedia = fileUri; // Utiliser le chemin URI de la vidéo
            this.signalementForm.patchValue({ image: fileUri });
        } else if (fileSizeInBytes > maxVideoSizeInBytes) {
            alert('La taille du fichier dépasse la limite autorisée de 100 Mo.');
        } else {
            alert('Format de fichier non pris en charge.');
        }

       // alert(this.selectedMedia);
    } catch (error) {
        console.error('Erreur lors de la sélection du média:', error);
    }
}

private async readAsBase64(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
}

private convertBlobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

private getFileSize(base64String: string): number {
    const stringLength = base64String.length - 'data:;base64,'.length;
    const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812; // taille en octets
    return sizeInBytes;
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

@ViewChildren('videoElement') videoElements: QueryList<ElementRef<HTMLVideoElement>>;

// Méthode pour gérer la pause manuelle
toggleManualPause(videoElement: HTMLVideoElement) {
  if (videoElement.paused) {
    this.playVideo(videoElement);
  } else {
    this.pauseVideo(videoElement);
  }
}

seekVideo(event: Event, video: HTMLVideoElement) {
  const input = event.target as HTMLInputElement;
  video.currentTime = parseFloat(input.value);
}

private playVideo(videoElement: HTMLVideoElement) {
  videoElement.play();
}

private pauseVideo(videoElement: HTMLVideoElement) {
  videoElement.pause();
}

async quitter(id) {
  const alert = await this.alertController.create({
    header: 'Confirmez-vous l\'envoie de  cette signalisation ?',
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
          this.onSubmit();
      },
      },
  ],
  });
   return alert.present();
}

async onSubmit() {
  const loading = await this.loadingController.create({
      message: 'Envoi en cours...',
      spinner: 'crescent'
  });

  await loading.present();
  console.log('Loading presented');

  let userData = {
      nom:  this.userData.nom,
      prenom: this.userData.prenom1,
      numero: this.userData.numuser,
      iduser: this.userData.iduser,
  };

  await this.getLocation();

  if (this.signalementForm.valid) {
      const combinedData = {
          ...userData,
          ...this.signalementForm.value
      };

      console.log('Combined data:', combinedData);

      try {
          if (!this.selectedMedia) {
              console.error('Aucune image ou vidéo sélectionnée');
              await loading.dismiss();
              return;
          }

          const mediaType = this.getMediaType(this.selectedMedia);
          const mediaBlob = this.getBlobFromBase64(this.selectedMedia, mediaType);

          const formData = new FormData();
          formData.append(mediaType === 'video' ? 'video' : 'image', mediaBlob, `${mediaType}.${this.getFileExtension(this.selectedMedia)}`);
          formData.append('category', combinedData.category);
          formData.append('description', combinedData.description);
          formData.append('location', JSON.stringify(combinedData.location));
          formData.append('nom', combinedData.nom);
          formData.append('prenom', combinedData.prenom);
          formData.append('numero', combinedData.numero);
          formData.append('iduser', combinedData.iduser);
          formData.append('heuredusignalement', new Date( this.serverTime).toISOString());

          console.log('Form data prepared:', formData);

          this._apiService.signalisation(formData).subscribe(
              async (res: any) => {
                  console.log('Signalement envoyé avec succès', res);
                  alert("alerte bien envoyé, on s'en charge");
                  this.router.navigateByUrl('/alert-user');
                  await loading.dismiss();
              },
              async (error) => {
                  console.error("Erreur lors de l'envoi du signalement", error);
                  alert("Erreur, alerte non envoyé");
                  await loading.dismiss();
              }
          );

      } catch (error) {
          console.error('Erreur de connexion avec le serveur:', error);
          alert("Problème de connexion avec le serveur, alerte non envoyé");
          await loading.dismiss();
      }
  } else {
      console.error('Form invalid:', this.signalementForm.errors);
      alert("Problème de connexion avec le serveur, alerte non envoyé");
      await loading.dismiss();
  }
}

getMediaType(base64: string): string {
  const matches = base64.match(/^data:(video|image)\/([A-Za-z-+\/]+);base64/);
  if (matches && matches.length > 1) {
      return matches[1];
  }
  return 'image'; // Par défaut, si le type n'est pas reconnu
}

getFileExtension(base64: string): string {
  const matches = base64.match(/^data:(video|image)\/([A-Za-z-+\/]+);base64/);
  if (matches && matches.length > 2) {
      return matches[2];
  }
  return 'jpeg'; // Par défaut, si le type n'est pas reconnu
}

getBlobFromBase64(base64: string, type: string): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: `${type}/${this.getFileExtension(base64)}` });
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
  this.getLocation();  // Obtenez la position de l'utilisateur dès que la vue est initialisée
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



