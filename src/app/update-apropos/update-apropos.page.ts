import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
selector: 'app-update-apropos',
templateUrl: './update-apropos.page.html',
styleUrls: ['./update-apropos.page.scss'],
})
export class UpdateAproposPage implements OnInit {


id:any;
email:any;
commentaire:any;
photo:any;
contact: any;
facebook: any;
instagram: any;
version: any;
whatsapp : any;
tiktok: any;
youtube:any;
telegram: any;
selectedfacebook: string = 'pas_de_facebook';  // Option par défaut pour la date de début
selectedyoutube:  string = 'pas_de_youtube';  // Option par défaut pour la date de début
selectedphoto : string = 'pas_de_photo'; // Option par défaut pour la photo
selectedemail: string = 'pas_de_email'; // Option par défaut pour la titre
selectedcommentaire: string = 'pas_de_commentaire'; // Option par défaut pour la commentaire
selectedversion: string = 'pas_de_version'; // Option par défaut pour la rang
selectedcontact: string = 'pas_de_contact'; // Option par défaut pour la contact
selectedinstagram: string = 'pas_de_instagram'; // Option par défaut pour la latitude
selectedtelegram: string = 'pas_de_telegram'; // Option par défaut pour la longitude
selectedtiktok: string = 'pas_de_tiktok'; // Option par défaut pour la latitude
selectedwhatsapp: string = 'pas_de_whatsapp'; // Option par défaut pour la longitude

entreprises: any = [];

selectedFile: File;




constructor(
  private route: ActivatedRoute,
  private router: Router,
  private _apiService : ApiService,
  private loadingCtrl: LoadingController,
  public loadingController: LoadingController
) {

this.getapropos();

  }


  refreshPage(e){
  setTimeout(() => {
    this.getapropos();
    console.log('rafraichissement de la page');
    e.target.complete();
  },500);
  }


getapropos (){
  this._apiService.getapropos().subscribe((res:any) => {
    console.log("SUCCESS ===",res);

    let a_propos = res[0];
    this.id = a_propos.id;
    this.email = a_propos.email;
    this.commentaire = a_propos.commentaire;
    this.photo = a_propos.photo;
    this.version = a_propos.version;
    this.contact = a_propos.contact;
    this.photo = a_propos.logo;
    this.youtube = a_propos.youtube;
    this.telegram = a_propos.telegram;
    this.instagram = a_propos.instagram;
    this.facebook = a_propos.facebook;
    this.whatsapp = a_propos.whatsapp;
    this.tiktok = a_propos.tiktok;

    },(error: any) => {
    console.log("Erreur de connection",error);
})
}



updateemail(event: any) {
this.selectedemail = event.detail.value;
}
updatecommentaire(event: any) {
this.selectedcommentaire = event.detail.value;
}
updateversion(event: any) {
this.selectedversion = event.detail.value;
}
updatecontact(event: any) {
this.selectedcontact = event.detail.value;
}
updatefacebook(event: any) {
this.selectedfacebook = event.detail.value;
}
updatewhatsapp(event: any) {
this.selectedwhatsapp = event.detail.value;
}

updatephoto(event: any) {
this.selectedphoto = event.detail.value;
}

updateinstagram(event: any) {
this.selectedinstagram = event.detail.value;
}
updatetiktok(event: any) {
this.selectedtiktok = event.detail.value;
}


updatetelegram(event: any) {
this.selectedtelegram = event.detail.value;
}

updateyoutube(event: any) {
this.selectedyoutube = event.detail.value;
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


  async update_apropos(){

  const file: File = this.selectedFile;

  if (this.selectedphoto == 'nouvelle' && !file){
    return " choisissez la photo";
  }

  const formData = new FormData();
  formData.append('id', this.id);
  // Construisez l'objet FormData

if (this.selectedemail !== 'none') {
  formData.append('email', this.email);
}
else {
  formData.append('email', 'non');
}
// Pour l'enregistrement commentaire
if (this.selectedcommentaire!== 'none') {
  formData.append('commentaire', this.commentaire);
}
else {
  formData.append('commentaire', 'non');
}
// Pour l'enregistrement photo
if (this.selectedphoto == 'nouvelle') {
  formData.append('photo', file);
}
else if (this.selectedphoto == 'none') {
  formData.append('photo', this.photo);
}

  // Pour l'enregistrement de la version
  if (this.selectedversion !== 'none') {
    formData.append('version', this.version);
  }
  else {
    formData.append('version', 'non');
  }

  // Pour l'enregistrement du lien facebook
  if (this.selectedfacebook !== 'none') {
    formData.append('facebook', this.facebook);
  }
  else {
    formData.append('facebook', 'non');
  }

    // Pour l'enregistrement du lien whatsapp
    if (this.selectedwhatsapp !== 'none') {
    formData.append('whatsapp', this.whatsapp);
  }
  else {
    formData.append('whatsapp', 'non');
  }


    // Pour l'enregistrement du lien instagram
    if (this.selectedinstagram !== 'none') {
      formData.append('instagram', this.instagram);
    }
    else {
      formData.append('instagram', 'non');
    }

        // Pour l'enregistrement du lien youtube
        if (this.selectedyoutube !== 'none') {
        formData.append('youtube', this.youtube);
      }
      else {
        formData.append('youtube', 'non');
      }

                // Pour l'enregistrement du lien telegram
                if (this.selectedtelegram !== 'none') {
                formData.append('telegram', this.telegram);
              }
              else {
                formData.append('telegram', 'non');
              }

                // Pour l'enregistrement du lien tiktok
                if (this.selectedtiktok !== 'none') {
                  formData.append('tiktok', this.tiktok);
                }
                else {
                  formData.append('tiktok', 'non');
                }




  // Pour l'enregistrement du contact
  if (this.selectedcontact !== 'none') {
    formData.append('contact', this.contact);
  }
  else {
    formData.append('contact', '0');
  }


const loading = await this.loadingCtrl.create({
  message: 'Rechargement...',
  spinner:'lines',
// showBackdrop:false,
  cssClass: 'custom-loading',
});

console.log('formdata ===', formData);
loading.present();
this._apiService.update_apropos(this.id,formData).subscribe((res:any) => {
  console.log("SUCCESS ===",res);
  //this.getentreprisee(this.id);

  loading.dismiss();
  this.router.navigateByUrl('/apropos');
  },(error: any) => {
  console.log("Erreur de connection",error);
  loading.dismiss();
})
}




ngOnInit()
{

}


}


