import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-ajouter-restaurant',
  templateUrl: './ajouter-restaurant.page.html',
  styleUrls: ['./ajouter-restaurant.page.scss'],
})
export class AjouterRestaurantPage implements OnInit {

  verifieForm: FormGroup;

  id:any;
  nom_resto:any;
  description:any;
  rang: any;
  photo:any;
  contact: any;
  longitude: any;
  admin: any;
  date_deb: any;
  date_fin: any;
  etiquette : any;
  commentaire: any;
  supprimer: any;
  ville: any;

  selectedphoto : string = 'none'; // Option par défaut pour la photo
  selectednom: string = 'none'; // Option par défaut pour la titre
  selected_description: string = 'none'; // Option par défaut pour la commentaire
  selectedrang: string = 'none'; // Option par défaut pour la rang
  selectedadmin: string = 'none'; // Option par défaut si admin
  selectedcontact: string = 'none'; // Option par défaut pour la contact
  selectedlatitude: string = 'none'; // Option par défaut pour la latitude
  selectedlongitude: string = 'none'; // Option par défaut pour la longitude
  selected_date_deb : string = 'none'; // Option par défaut pour la date ouverture resto
  selected_date_fin : string = 'none'; // Option par défaut pour la date fermeture resto
  selected_etiquette: string = 'none'; // Option par défaut pour une etiquette
  selected_commentaire: string = 'none'; // Option par défaut pour un commentaire
  selected_supprimer: string = 'none'; // Option par défaut pour  supprimer
  selected_ville: string = 'none'; // Option par défaut pour  ville
  selected_contact_admin: string = 'none'; // Option par défaut pour  ville

  latitude: any;
  entreprises: any = [];

  selectedFile: File;
  contact_admin: any;



  constructor(
   private route: ActivatedRoute,
   private router: Router,
   private _apiService : ApiService,
   private loadingCtrl: LoadingController,
   public loadingController: LoadingController,
   private toastCtrl: ToastController  // Injecter le ToastController

 ) {

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

    // Ajoutez cette méthode pour gérer la sélection de fichier
 onFileSelected(event: any): void {
   const files: FileList = event.target.files;

   if (files.length > 0) {
     // Assurez-vous que this.selectedFile contient le fichier sélectionné
     this.selectedFile = files[0];

     // Affichez des informations sur le fichier dans la console (optionnel)
     console.log('Nom du fichier:', this.selectedFile.name);

     if (this.selectedFile.type.startsWith('image/')) {
       const reader = new FileReader();
       reader.onload = (e: any) => {
         const imagePreview = e.target.result;
         console.log('Aperçu de l\'image:', imagePreview);
         // Vous pouvez affecter imagePreview à une variable de modèle pour l'afficher dans votre template.
       };
       reader.readAsDataURL(this.selectedFile);
     }
   }
 }


 updatenom(event: any) {
   this.selectednom = event.detail.value;
 }
 update_description(event: any) {
   this.selected_description = event.detail.value;
 }
 updaterang(event: any) {
   this.selectedrang = event.detail.value;
 }
 updatecontact(event: any) {
   this.selectedcontact = event.detail.value;
 }
 updatelatitude(event: any) {
   this.selectedlatitude = event.detail.value;
 }
 updatelongitude(event: any) {
   this.selectedlongitude = event.detail.value;
 }

 updatephoto(event: any) {
   this.selectedphoto = event.detail.value;
 }

 update_date_deb(event: any) {
  this.selected_date_deb = event.detail.value;
}

update_date_fin(event: any) {
  this.selected_date_fin = event.detail.value;
}

update_etiquette(event: any) {
  this.selected_etiquette = event.detail.value;
}

update_commentaire(event: any) {
  this.selected_commentaire = event.detail.value;
}

update_supprimer(event: any) {
  this.selected_supprimer = event.detail.value;
}

update_ville(event: any) {
  this.selected_ville = event.detail.value;
}

update_contact_admin(event: any) {
  this.selected_contact_admin = event.detail.value;
}

 async add_resto() {
   const file: File = this.selectedFile;

   const loading = await this.loadingCtrl.create({
     message: 'Rechargement...',
     spinner: 'lines',
     cssClass: 'custom-loading',
     duration: 10000,
   });
   loading.present();

   // Promesse pour la récupération de this.titre
   const nomPromise = this.selectednom !== 'none' ? this.nom_resto : 'non';

   // Promesse pour la récupération de this.commentaire
   const descriptionPromise = this.selected_description !== 'none' ? this.description : 'non';

   // Promesse pour la récupération du chemin du fichier ou 'non'
   const photoPromise = this.selectedphoto !== 'none' ? file : 'non';

   // Autres champs synchrones...
   const rang = this.selectedrang !== 'none' ? this.rang : '0';
   const contact = this.selectedcontact !== 'none' ? this.contact : '0';
   const longitude = this.selectedlongitude !== 'none' ? this.longitude : 'non';
   const latitude = this.selectedlatitude !== 'none' ? this.latitude : 'non';
   const date_deb = this.selected_date_deb !== 'none' ? this.date_deb : 'non';
   const date_fin = this.selected_date_fin !== 'none' ? this.date_fin : 'non';
   const etiquette = this.selected_etiquette !== 'none' ? this.etiquette : 'non';
   const commentaire = this.selected_commentaire !== 'none' ? this.commentaire : 'non';
   const supprimer = this.selected_supprimer !== 'none' ? 'oui' : 'non';
   const ville = this.selected_ville !== 'none' ? this.ville : 'non';
   const contact_admin = this.selected_contact_admin !== 'none' ? this.contact_admin : 'non';


   // Attendre toutes les promesses
   const [nom, description, photo] = await Promise.all([
     nomPromise,
     descriptionPromise,
     photoPromise,
   ]);

   // Construire FormData avec les valeurs récupérées
   const formData = new FormData();
   formData.append('nom', nom);
   formData.append('description', description);
   formData.append('photo', photo);
   formData.append('rang', rang);
   formData.append('contact', contact);
   formData.append('longitude', longitude);
   formData.append('latitude', latitude);
   formData.append('date_deb', date_deb);
   formData.append('date_fin', date_fin);
   formData.append('etiquette', etiquette);
   formData.append('commentaire', commentaire);
   formData.append('supprimer', supprimer);
   formData.append('ville', ville);
   formData.append('contact_admin', contact_admin);



   // Appelez la méthode addpub de votre service en passant FormData
   this._apiService.add_resto(formData).subscribe(
     (res: any) => {
       console.log('SUCCESS ===', res);
       loading.dismiss();
       this.router.navigateByUrl('/restaurant');
       alert('resto ajoutée avec succès');
       this.presentToast(' Restaurant ajoute avec success', 'success');
     },
     (error: any) => {
       loading.dismiss();
       this.presentToast("Erreur de connexion, restorant non enregistrée.");
       console.log('ERROR ===', error);
     }
   );
 }



 ngOnInit() {

   this.verifieForm = new FormGroup({

   });

 }


 }

