import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ajouter-plat',
  templateUrl: './ajouter-plat.page.html',
  styleUrls: ['./ajouter-plat.page.scss'],
})
export class AjouterPlatPage implements OnInit {

  verifieForm: FormGroup;

  id:any;
  nom_plat:any;
  description:any;
  rang: any;
  photo:any;
  etiquette : any;
  supprimer: any;
  prix: any;
  id_restaurant : any;
  contact_admin: any;

  selectedphoto : string = 'none'; // Option par défaut pour la photo
  selectednom: string = 'none'; // Option par défaut pour la titre
  selected_description: string = 'none'; // Option par défaut pour la commentaire
  selectedrang: string = 'none'; // Option par défaut pour la rang
  selected_etiquette: string = 'none'; // Option par défaut pour une etiquette
  selected_supprimer: string = 'none'; // Option par défaut pour  supprimer
  selected_prix: string = 'none'; // Option par défaut pour  prix

  latitude: any;
  entreprises: any = [];

  selectedFile: File;
  nom_resto: any;



  constructor(
   private route: ActivatedRoute,
   private router: Router,
   private _apiService : ApiService,
   private loadingCtrl: LoadingController,
   public loadingController: LoadingController,
   private toastCtrl: ToastController  // Injecter le ToastController

 ) {

  this.route.params.subscribe((params :any) => {
    this.id_restaurant = params.id;
    this.nom_resto = params.nom_resto;

    console.log(this.id_restaurant);
  })

   }


  // Méthode pour afficher un toast
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
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


  if (this.prix === null || this.prix === '' || isNaN(this.prix)) {
    alert("Entrer le prix du plat");
    return;
}


if (this.nom_plat === null || this.nom_plat === '') {
  alert("Entrer le prix du plat");
  return;
}


   const file: File = this.selectedFile;

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
   const prix = this.selected_prix!== 'none' ? this.prix : 'non';


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
   formData.append('etiquette', etiquette);
   formData.append('supprimer', supprimer);
   formData.append('prix', prix);
   formData.append('id_restaurant', this.id_restaurant);
   formData.append('contact_admin', this.contact_admin);
   formData.append('nom_restaurant', this.nom_resto );


   // Appelez la méthode addpub de votre service en passant FormData
   this._apiService.add_plat(formData).subscribe(
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

