import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-plat',
  templateUrl: './update-plat.page.html',
  styleUrls: ['./update-plat.page.scss'],
})
export class UpdatePlatPage implements OnInit {
  verifieForm: FormGroup;

  id:any;
  nom_plat:any;
  description:any;
  rang: any;
  photo:any;
  etiquette : any;
  supprimer: any;
  prix: any;

  selectedphoto : string = 'garder_photo'; // Option par défaut pour la photo
  selectednom: string = 'pas_de_nom'; // Option par défaut pour la titre
  selected_description: string = 'pas_de_description'; // Option par défaut pour la commentaire
  selectedrang: string = 'pas_de_rang'; // Option par défaut pour la rang
  selected_etiquette: string = 'pas_etiquette'; // Option par défaut pour une etiquette
  selected_supprimer: string = 'none'; // Option par défaut pour  supprimer
  selected_prix: string = 'pas_de_prix'; // Option par défaut pour  prix

  latitude: any;
  entreprises: any = [];

  selectedFile: File;



  constructor(
   private route: ActivatedRoute,
   private router: Router,
   private _apiService : ApiService,
   private loadingCtrl: LoadingController,
   public loadingController: LoadingController,
   private toastCtrl: ToastController,
   private location: Location

 ) {

  this.route.params.subscribe((param:any) => {
    this.id = param.id;
    console.log(this.id);
    this.getplat(this.id);
  })

   }


   getplat (id){
  this._apiService.getplat(id).subscribe((res:any) => {
    console.log("SUCCESS ===",res);

    let resto = res[0];
    this.id = resto.id;
    this.nom_plat = resto.nom_plat;
    this.description = resto.description;
    this.photo = resto.image;
    this.rang = resto.rang;
    this.supprimer = resto.supprimer;
    this.etiquette = resto.etiquette
    this.prix= resto.prix;

   },(error: any) => {
    console.log("Erreur de connection",error);
})
}

  // Méthode pour afficher un toast
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
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


 updatephoto(event: any) {
   this.selectedphoto = event.detail.value;
 }

update_etiquette(event: any) {
  this.selected_etiquette = event.detail.value;
}

update_supprimer(event: any) {
  this.selected_supprimer = event.detail.value;
}

update_prix(event: any) {
  this.selected_prix = event.detail.value;
}

 async add_resto() {

  const file: File = this.selectedFile;

  if (this.selectedphoto == 'nouvelle' && !file){
    return " choisissez la photo";
  }

   const loading = await this.loadingCtrl.create({
     message: 'Rechargement...',
     spinner: 'lines',
     cssClass: 'custom-loading',
     duration: 8500,
   });
   loading.present();

   // Promesse pour la récupération de this.titre
   const nomPromise = this.selectednom !== 'none' ? this.nom_plat : 'non';

   // Promesse pour la récupération de this.commentaire
   const descriptionPromise = this.selected_description !== 'none' ? this.description : 'non';

   // Promesse pour la récupération du chemin du fichier ou 'non'
   const photoPromise = this.selectedphoto !== 'none' ? file : 'non';

   // Autres champs synchrones...
   const rang = this.selectedrang !== 'none' ? this.rang : '0';
   const etiquette = this.selected_etiquette !== 'none' ? this.etiquette : 'non';
   const supprimer = this.selected_supprimer !== 'none' ? 'oui' : 'non';
   const prix = this.selected_prix !== 'none' ? this.prix : 'non';


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

  // Pour l'enregistrement photo
  if (this.selectedphoto == 'nouvelle') {
    formData.append('photo', file);
  }
  else if (this.selectedphoto == 'none') {
    formData.append('photo', 'non');
  }
  else if (this.selectedphoto == 'garder_photo') {
  formData.append('photo', this.photo);
  }

   formData.append('rang', rang);
   formData.append('etiquette', etiquette);
   formData.append('supprimer', supprimer);
   formData.append('prix', prix);
   formData.append('id', this.id);

   const id = await this.id;

   // Appelez la méthode addpub de votre service en passant FormData
   this._apiService.update_plat(id, formData).subscribe(
     (res: any) => {
       console.log('SUCCESS ===', res);
       loading.dismiss();
       this.location.back();
       this.presentToast(' Plat mis à jour avec success', 'success');
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

