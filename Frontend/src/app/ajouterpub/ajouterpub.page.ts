import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ajouterpub',
  templateUrl: './ajouterpub.page.html',
  styleUrls: ['./ajouterpub.page.scss'],
})
export class AjouterpubPage implements OnInit {
  verifieForm: FormGroup;

 id:any;
 annee_entreprise:any;
 titre:any;
 commentaire:any;
 rangpub: any;
 photo:any;
 contact: any;
 longitude: any;
 datePublication : any;
 datefin: any;
 selectedDateOptionfin: string = 'none';  // Option par défaut pour la date de début
 selectedDateOptiondeb:  string = 'none';  // Option par défaut pour la date de début
 selectedphoto : string = 'none'; // Option par défaut pour la photo
 selectedtitre: string = 'none'; // Option par défaut pour la titre
 selectedcommentaire: string = 'none'; // Option par défaut pour la commentaire
 selectedrang: string = 'none'; // Option par défaut pour la rang
 selectedcontact: string = 'none'; // Option par défaut pour la contact
 selectedlatitude: string = 'none'; // Option par défaut pour la latitude
 selectedlongitude: string = 'none'; // Option par défaut pour la longitude
 latitude: any;
 entreprises: any = [];

 selectedFile: File;




 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private _apiService : ApiService,
  private loadingCtrl: LoadingController,
  public loadingController: LoadingController,
) {

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


updatetitre(event: any) {
  this.selectedtitre = event.detail.value;
}
updatecommentaire(event: any) {
  this.selectedcommentaire = event.detail.value;
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

async addpub() {
  const file: File = this.selectedFile;

  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
  });
  loading.present();

  // Promesse pour la récupération de this.titre
  const titrePromise = this.selectedtitre !== 'none' ? this.titre : 'non';

  // Promesse pour la récupération de this.commentaire
  const commentairePromise = this.selectedcommentaire !== 'none' ? this.commentaire : 'non';

  // Promesse pour la récupération du chemin du fichier ou 'non'
  const photoPromise = this.selectedphoto !== 'none' ? file : 'non';

  // Autres champs synchrones...
  const rangpub = this.selectedrang !== 'none' ? this.rangpub : '50';
  const contact = this.selectedcontact !== 'none' ? this.contact : '0';
  const longitude = this.selectedlongitude !== 'none' ? this.longitude : 'non';
  const latitude = this.selectedlatitude !== 'none' ? this.latitude : 'non';

  // Promesses pour les dates
  const datePublicationPromise = this.selectedDateOptiondeb !== 'none' ? this.datePublication : 'non';
  const datefinPromise = this.selectedDateOptionfin !== 'none' ? this.datefin : 'non';

  // Attendre toutes les promesses
  const [titre, commentaire, photo, datePublication, datefin] = await Promise.all([
    titrePromise,
    commentairePromise,
    photoPromise,
    datePublicationPromise,
    datefinPromise
  ]);

  // Construire FormData avec les valeurs récupérées
  const formData = new FormData();
  formData.append('titre', titre);
  formData.append('commentaire', commentaire);
  formData.append('photo', photo);
  formData.append('rangpub', rangpub);
  formData.append('contact', contact);
  formData.append('longitude', longitude);
  formData.append('latitude', latitude);
  formData.append('datePublication', datePublication);
  formData.append('datefin', datefin);

  console.log('datePublication ===', datePublication);
  console.log('datefin ===', datefin);
  console.log('titre ===', titre);
  console.log('commentaire ===', commentaire);
  console.log('rangpub ===', rangpub);
  console.log('longitude ===', longitude);
  console.log('latitude ===', latitude);

  // Appelez la méthode addpub de votre service en passant FormData
  this._apiService.addpub(formData).subscribe(
    (res: any) => {
      console.log('SUCCESS ===', res);
      loading.dismiss();
      this.router.navigateByUrl('/acceuil');
      alert('pub ajoutée avec succès');
    },
    (error: any) => {
      loading.dismiss();
      alert('Erreur de connexion, pub non enregistrée.');
      console.log('ERROR ===', error);
    }
  );
}



async addpub2() {
  const file: File = this.selectedFile;

  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
  });
  loading.present();

  // Construisez l'objet FormData
  const formData = new FormData();
   // Pour l'enregistrement titre
  if (this.selectedtitre!== 'none') {
    formData.append('titre', this.titre);
  }
  else {
    formData.append('titre', 'non');
  }
 // Pour l'enregistrement commentaire
  if (this.selectedcommentaire!== 'none') {
    formData.append('commentaire', this.commentaire);
  }
  else {
    formData.append('commentaire', 'non');
  }
  // Pour l'enregistrement photo
  if (this.selectedphoto !== 'none') {
    formData.append('photo', file);
  }
  else {
    formData.append('photo', 'non');
  }
    // Pour l'enregistrement du rang
    if (this.selectedrang !== 'none') {
      formData.append('rangpub', this.rangpub);
    }
    else {
      formData.append('rangpub', '50');
    }

     // Pour l'enregistrement du contact
     if (this.selectedcontact !== 'none') {
      formData.append('contact', this.contact);
    }
    else {
      formData.append('contact', '0');
    }
    // Pour l'enregistrement du longitude
    if (this.selectedlongitude !== 'none') {
      formData.append('longitude', this.longitude);
    }
    else {
      formData.append('longitude', 'non');
    }
    // Pour l'enregistrement du latitude
    if (this.selectedlatitude !== 'none') {
      formData.append('latitude', this.latitude);
    }
    else {
      formData.append('latitude', 'non');
    }
 // pour la date de debut
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


  console.log('datePublication ===', this.datePublication);
  console.log('datefin ===', this.datefin);

  // Appelez la méthode addpub de votre service en passant FormData
  this._apiService.addpub(formData).subscribe(
    (res: any) => {
      console.log('SUCCESS ===', res);
      loading.dismiss();
      this.router.navigateByUrl('/acceuil');
      alert('pub ajoutée avec succès');
    },
    (error: any) => {
      loading.dismiss();
      alert('Erreur de connexion, pub non enregistrée.');
      console.log('ERROR ===', error);
    }
  );
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





async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    duration: 1500,
    cssClass: 'custom-loading',
  });

  loading.present();
  this.addpub();
  //this.router.navigateByUrl('/welcome')
  this.router.navigateByUrl('/welcome');
  //this.navCtrl.setRoot('/welcome');
}

ngOnInit() {

  this.verifieForm = new FormGroup({


//  titre: new FormControl('', [
   // Validators.required,

  //]),




  });



}



}

