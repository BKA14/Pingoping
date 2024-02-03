import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-updatepub',
  templateUrl: './updatepub.page.html',
  styleUrls: ['./updatepub.page.scss'],
})
export class UpdatepubPage implements OnInit {
  verifieForm: FormGroup;



  id:any;
  annee_entreprise:any;
  titre:any;
  commentaire:any;
  photo:any;
  contact: any;
  longitude: any;
  latitude: any;
  rangpub: any;
  datePublication : any;
  datefin: any;
  date_deb:any;
  date_de_fin: any;
  selectedDateOptionfin: string = 'none';  // Option par défaut pour la date de début
  selectedDateOptiondeb:  string = 'none';  // Option par défaut pour la date de début
  selectedphoto : string = 'none'; // Option par défaut pour la photo

  entreprises: any = [];

  selectedFile: File;





  constructor(
   private route: ActivatedRoute,
   private router: Router,
   private _apiService : ApiService,
   private loadingCtrl: LoadingController,
   public loadingController: LoadingController
 ) {
  this.route.params.subscribe((param:any) => {
    this.id = param.id;
    console.log(this.id);
    this.getpub2(this.id);
  })

   }


    getentreprises(){
     this._apiService.getentreprises().subscribe((res:any) => {

       console.log("SUCCESS ===",res);


      },(error: any) => {
      alert('Erreur de connection avec le serveur veillez reessayer');
      //this.navCtrl.setRoot('/welcome2');
      this.router.navigateByUrl('/welcome2');
      // console.log("ERREUR ===",error);
   })
   }

   refreshPage(e){
    setTimeout(() => {
      this.getpub2(this.id);
      console.log('rafraichissement de la page');
      e.target.complete();
    },500);
    }


  getpub2 (id){
    this._apiService.getpub2(id).subscribe((res:any) => {
      console.log("SUCCESS ===",res);

      let pub = res[0];
      this.id = pub.id;
      this.titre = pub.titre;
      this.commentaire = pub.commentaire;
      this.photo = pub.photo;
      this.rangpub = pub.rangpub;
      this.contact = pub.contact;
      this.longitude = pub.longitude;
      this.latitude = pub.latitude;
      this.datePublication = pub.date;
      this.datefin = pub.datefin;
      this.photo = pub.photo;

      this.date_deb= pub.date;
      this.date_de_fin = pub.datefin;

     },(error: any) => {
      console.log("Erreur de connection",error);
  })
}

updatephoto(event: any) {
  this.selectedphoto = event.detail.value;
}

updateDate(event: any) {
  this.datePublication = event.detail.value;
}
updateDateFin(event: any) {
  this.datefin = event.detail.value;
}


updateDateOptionfin(event: any) {
  this.selectedDateOptionfin = event.detail.value;
}

updateDateOptiondeb(event: any) {
  this.selectedDateOptiondeb = event.detail.value;
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


   async updatepub(){

    const file: File = this.selectedFile;


    const formData = new FormData();
    formData.append('id_pub', this.id);
    formData.append('titre', this.titre);
    formData.append('commentaire', this.commentaire);
    // Pour l'enregistrement photo
    if (this.selectedphoto !== 'none') {
      formData.append('photo', file);
    }
    else {
      formData.append('photo', 'non');
    }
    formData.append('rangpub', this.rangpub);
    formData.append('contact', this.contact);
    formData.append('longitude', this.longitude);
    formData.append('latitude', this.latitude);

    if (this.selectedDateOptiondeb !== 'none') {
      formData.append('datePublication', this.datePublication);
    } else {
      formData.append('datePublication', 'non'); // Vous pouvez utiliser une valeur spécifique pour indiquer "Non"
    }

      // pour la date de fin
    if (this.selectedDateOptionfin !== 'none') {
      formData.append('datefin', this.datefin);
    } else {
      formData.append('datefin', 'non'); // Vous pouvez utiliser une valeur spécifique pour indiquer "Non"
    }
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });

  console.log('formdata ===', formData);
  loading.present();
  this._apiService.updatepub(this.id,formData).subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    //this.getentreprisee(this.id);

    loading.dismiss();
    this.router.navigateByUrl('/acceuil');
   },(error: any) => {
    console.log("Erreur de connection",error);
    loading.dismiss();
  })
  }


 async showLoading() {
   const loading = await this.loadingCtrl.create({
     message: 'Rechargement...',
     cssClass: 'custom-loading',
   });

   loading.present();

   this.updatepub();
   loading.dismiss();
   //this.router.navigateByUrl('/welcome')
   this.router.navigateByUrl('/welcome');
   //this.navCtrl.setRoot('/welcome');
 }




 ngOnInit() {

   this.verifieForm = new FormGroup({


   titre: new FormControl('', [
     Validators.required,

   ]),

       commentaire: new FormControl('', [
         Validators.required,

       ]),

       rangpub: new FormControl('', [
        Validators.required,

      ]),

      contact: new FormControl('', [
        Validators.required,
      ]),

      longitude: new FormControl('', [
        Validators.required,
      ]),

      latitude: new FormControl('', [
        Validators.required,
      ]),

   });


 }

 }


