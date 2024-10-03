import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-update-restorant',
  templateUrl: './update-restorant.page.html',
  styleUrls: ['./update-restorant.page.scss'],
})
export class UpdateRestorantPage implements OnInit {

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

  selectedphoto : string = 'garder_photo'; // Option par défaut pour la photo
  selectednom: string = 'pas_de_nom'; // Option par défaut pour la titre
  selected_description: string = 'pas_de_description';
  selectedrang: string = 'pas_de_rang'; // Option par défaut pour la rang
  selectedcontact: string = 'pas_de_contact'; // Option par défaut pour la contact
  selectedlatitude: string = 'pas_de_latitude'; // Option par défaut pour la latitude
  selectedlongitude: string = 'pas_de_longitude'; // Option par défaut pour la longitude
  selected_date_deb : string = 'pas_de_date_deb'; // Option par défaut pour la date ouverture resto
  selected_date_fin : string = 'pas_de_date_fin'; // Option par défaut pour la date fermeture resto
  selected_etiquette: string = 'pas_etiquette'; // Option par défaut pour une etiquette
  selected_commentaire: string = 'pas_commentaire'; // Option par défaut pour un commentaire
  selected_supprimer: string = 'none'; // Option par défaut pour  supprimer
  selected_ville: string = 'pas_de_ville'; // Option par défaut pour  ville
  selected_contact_admin: string = 'pas_de_contact_admin'; // Option par défaut pour  ville


  latitude: any;
  entreprises: any = [];

  selectedFile: File;
  heure_ajout: any;
  contact_admin: any;



  constructor(
   private route: ActivatedRoute,
   private router: Router,
   private _apiService : ApiService,
   private loadingCtrl: LoadingController,
   public  loadingController: LoadingController,
   private toastCtrl: ToastController

 ) {

  this.route.params.subscribe((param:any) => {
    this.id = param.id;
    console.log(this.id);
    this.getresto(this.id);
  })

   }


  // Méthode pour afficher un toast
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000, // Durée d'affichage du toast
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


 refreshPage(e){

  setTimeout(() => {
    this.getresto(this.id);
    console.log('rafraichissement de la page');
    e.target.complete();
  },500);

  }


getresto (id){
  this._apiService.getresto(id).subscribe((res:any) => {
    console.log("SUCCESS ===",res[0]);

    let resto = res[0];
    this.id = resto.id;
    this.nom_resto = resto.nom_resto;
    console.log("nom resto ===", this.nom_resto);
    this.description = resto.description;
    this.photo = resto.image;
    this.rang = resto.rang;
    this.contact = resto.contact;
    this.longitude = resto.longitude;
    this.latitude = resto.latitude;
    this.date_deb = resto.heure_deb;
    this.date_fin = resto.heure_fin;
    this.supprimer = resto.supprimer;
    this.etiquette = resto.etiquette
    this.commentaire= resto.commentaire;
    this.ville= resto.ville;
    this.heure_ajout= resto.heure_ajout;
    this.contact_admin= resto.contact_admin;

   },(error: any) => {
    console.log("Erreur de connection",error);
})
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

 async updateresto() {

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
   const nomPromise = this.selectednom !== 'none' ? this.nom_resto : 'non';

   // Promesse pour la récupération de this.commentaire
   const descriptionPromise = this.selected_description !== 'none' ? this.description : 'non';


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
   const [nom, description] = await Promise.all([
     nomPromise,
     descriptionPromise,
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
   formData.append('contact', contact);
   formData.append('longitude', longitude);
   formData.append('latitude', latitude);
   formData.append('date_deb', date_deb);
   formData.append('date_fin', date_fin);
   formData.append('etiquette', etiquette);
   formData.append('commentaire', commentaire);
   formData.append('supprimer', supprimer);
   formData.append('ville', ville);
   formData.append('id', this.id);
   formData.append('supprimer', supprimer);

   formData.append('contact_admin', contact_admin);

    const id = await this.id;

    // Appelez la méthode addpub de votre service en passant FormData
    this._apiService.update_resto(id, formData).subscribe(
      (res: any) => {
        console.log('SUCCESS ===', res);
        loading.dismiss();
        this.router.navigateByUrl('/restaurant');
        this.presentToast('Restaurant mis à jour  avec success', 'success');
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

