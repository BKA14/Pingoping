import { ListeUserPage } from './../liste-user/liste-user.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController, IonList, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { DistanceCalculatorService } from './distance-calculator.service';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})

export class AcceuilPage implements OnInit {

  term;
  handlerMessage = '';
  roleMessage = '';

  distanceToUser?: number;
  couleurbouton?: any;
  userlatitude : any;
  userlongitude : any;
  localisation? : any;
  mapsUrl: any;
  id: any;
  likes: any;
  latitude:any;
  longitude:any;
  grade:any;
  rangpub: any;
  nom:any;
  prenom1:any;
  iduser: any;
  numuser: any;
  categorie: any = [];
   pub: any = [];
   etats: any = [];
   pubvideo: any = [];
    navCtrl: any;
    etat : any;

    etatid: any;
    pubid:any;
    idpub: any;

    isLiked = false;


    public progress = 0;

    constructor(public _apiService: ApiService,
      private alertController: AlertController,
      private route: ActivatedRoute,
      private router: Router,
      private loadingCtrl: LoadingController,
      public loadingController: LoadingController,
      private distanceCalculatorService: DistanceCalculatorService,
      private cdr: ChangeDetectorRef,
      )
    {

      this.getpub();
      this.getUserLocation();
      this.getcategorie();
      this.getsessionuser();


    }



    LikePub2(pub): void {
      this._apiService.getetat().subscribe((res: any) => {
        console.log("SUCCESS ==", res);

        this.pubid = pub.id;

        // Supposons que les données contiennent un tableau d'états
        const etatsArray = res;

        let conditionSatisfaite = false; // Initialisation à false avant la boucle

        // Utilisation d'une boucle for...of pour parcourir les éléments du tableau
        for (const etat of etatsArray) {
          // ... (votre code à l'intérieur de la boucle)

          // Assigner les valeurs à des variables locales
          this.etatid = etat.id;
          console.log("SUCCESS ==", etat.id);
          const etatIdPub = etat.idpub;
          const etatContactUser = etat.contactuser;
          const etatIdUser = etat.iduser;
          const etatEtat = etat.etat;

          console.log("pudid 2 ===", etatIdPub, this.pubid, etat.id , this.iduser);

          // Conditions pour vérifier les états
          if (
            this.pubid === etatIdPub &&
            this.numuser === etatContactUser &&
            this.iduser === etatIdUser &&
            etatEtat.trim() === 'non'
          ) {
            this.likePublication(pub);
            this.updateetatlikes2();
            conditionSatisfaite = true;
            break; // Sortir de la boucle si une condition est satisfaite
          } else if (
            this.pubid === etatIdPub &&
            this.numuser === etatContactUser &&
            this.iduser === etatIdUser &&
            etatEtat.trim()  === 'oui'
          ) {
            conditionSatisfaite = true;
            this.dislikePublication(pub);
            this.updateetatlikes();
            break; // Sortir de la boucle si une condition est satisfaite
          }
        }

        // Réinitialisation de conditionSatisfaite à false après la boucle


        // Si aucune condition n'est satisfaite dans la boucle, exécuter ces actions
        if (!conditionSatisfaite) {
          this.addetatlikes();
          this.likePublication(pub);
        }
      });
    }




    LikePub(pub): void {
      this._apiService.getetat().subscribe((res: any) => {
        console.log("SUCCESS ==", res);

        this.pubid= pub.id;

        // Supposons que les données contiennent un tableau d'états
        const etatsArray = res;

        let conditionSatisfaite = false;

          for (let i = 0; i < etatsArray.length; i++) {
            const etat = etatsArray[i];

            // Assigner les valeurs à des variables locales
            this.etatid = etat.id;
            console.log("SUCCESS ==", etat.id);
            const etatIdPub = etat.idpub;
            const etatContactUser = etat.contactuser;
            const etatIdUser = etat.iduser;
            const etatEtat = etat.etat;

            console.log("pudid 2 ===", etatIdPub, this.pubid, etat.id , this.iduser);

            // Conditions pour vérifier les états
            if (
              this.pubid.trim() === etatIdPub.trim() &&
              this.numuser.trim() === etatContactUser.trim() &&
              this.iduser.trim() === etatIdUser.trim() &&
               etatEtat.trim() === 'non'
               ) {
              this.likePublication(pub);
              this.updateetatlikes2();
              console.log(" etat est non et un j'aime effectué ");
              conditionSatisfaite = true;
              break; // Sortir de la boucle si une condition est satisfaite
            } else if (
              this.pubid.trim() === etatIdPub.trim() &&
              this.numuser.trim() === etatContactUser.trim() &&
              this.iduser.trim() === etatIdUser.trim() &&
              etatEtat.trim()  === 'oui'
            ) {
              conditionSatisfaite = true;
              this.dislikePublication(pub);
              console.log(" etat est oui et un j'aime retiré ");
              this.updateetatlikes();
              break; // Sortir de la boucle si une condition est satisfaite
            }
          }

          // Si aucune condition n'est satisfaite dans la boucle, exécuter ces actions
          if (!conditionSatisfaite) {
            this.addetatlikes();
            console.log(" j'aime et nouveau etat ajouté ajouté ");
            this.likePublication(pub);
          }
                });
              }



    async dislikePublication(pub) {

      this.id = pub.id;
      pub.likes = parseInt(pub.likes, 10);

      if (!isNaN(pub.likes)) {
        // Incrémenter le nombre de likes

          pub.likes -= 1;
          this.likes= pub.likes;

          console.log("Erreur de connection 1",this.id);
      let data = {
        id: this.id,
        likes: this.likes
                 }

 const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
       spinner:'lines',
      // showBackdrop:false,
        cssClass: 'custom-loading',
      });

      loading.present();
      console.log("Erreur de connection 2", this.id);
      this._apiService.updatelikes(this.id, data).subscribe((res:any) => {
        loading.dismiss();
        console.log("SUCCESS ===",res);

      },(error: any) => {
        loading.dismiss();
        console.log("Erreur de connection",error);
      })

    }else {
      console.error("Erreur : pub.likes n'est pas un nombre valide.");
    }
  }


    async likePublication(pub) {

      this.id = pub.id;
      pub.likes = parseInt(pub.likes, 10);

      if (!isNaN(pub.likes)) {
        // Incrémenter le nombre de likes

          pub.likes += 1;
          this.likes= pub.likes;

          console.log("Erreur de connection 1",this.id);
      let data = {
        id: this.id,
        likes: this.likes
      }

 const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
       spinner:'lines',
      // showBackdrop:false,
        cssClass: 'custom-loading',
      });

      loading.present();
      console.log("Erreur de connection 2", this.id);
      this._apiService.updatelikes(this.id, data).subscribe((res:any) => {
        loading.dismiss();
        console.log("SUCCESS ===",res);

      },(error: any) => {
        loading.dismiss();
        console.log("Erreur de connection",error);
      })

    }else {
      console.error("Erreur : pub.likes n'est pas un nombre valide.");
    }
  }

  async addetatlikes(){
    let data = {

     iduser: this.iduser,
     contactuser: this.numuser,
     etat: 'oui',
     pubid:this.pubid,

    }

    console.log("SUCCESS ===",this.pubid);
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });

    loading.present();

    this._apiService.addetatlikes(data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);
      //window.location.reload();
      loading.dismiss();
      alert(' Nouveau etat ajoute avec success');
    },(error: any) => {
      loading.dismiss();
     alert('Erreur de connection  nouveau etat non enregistre');
     console.log("ERROR ===",error);
    })
   }


   async updateetatlikes(){
    let data = {

     id: this.etatid,
     iduser: this.iduser,
     contactuser: this.numuser,
     etat: 'non',
     pubid:this.pubid,

    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.updateetatlikes(data.id,data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);
      //window.location.reload();
      loading.dismiss();
      alert('Etat modifier avec success');
    },(error: any) => {
      loading.dismiss();
     alert('Erreur de connection etat non modifier');
     console.log("ERROR ===",error);
    })
   }


   async updateetatlikes2(){
    let data = {

     id: this.etatid,
     iduser: this.iduser,
     contactuser: this.numuser,
     etat: 'oui',
     pubid:this.pubid,

    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.updateetatlikes(data.id,data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);
      //window.location.reload();
      loading.dismiss();
      alert('Etat modifier avec success');
    },(error: any) => {
      loading.dismiss();
     alert('Erreur de connection etat non modifier');
     console.log("ERROR ===",error);
    })
   }



    reloadPage() {
      window.location.reload();
    }

    getsession(){
     this.grade= (localStorage.getItem('grade'));
     console.log(this.grade);
      }
      getsession1(){
        this.prenom1= (localStorage.getItem('prenom1'));
        console.log(this.prenom1);
         }

         getsessionuser(){
          this.iduser= (localStorage.getItem('iduser'));
          console.log(this.iduser);

          this.numuser= (localStorage.getItem('numuser'));
          console.log(this.numuser);

          this.idpub= (localStorage.getItem('idpub'));
          console.log(this.numuser);

           }




  async getpub(){

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });

    loading.present();

     this._apiService.getpub().subscribe((res:any) => {
      console.log("SUCCESS ==",res);
     let rep =res[1];
      this.pub = res;
      this.openUrl();
      this.couleurbtn();
     this.latitude=rep.latitude;
     this.longitude=rep.longitude;
     loading.dismiss();
     },(error: any) => {
     alert('Erreur de connection avec le serveur veillez reessayer');
     //this.navCtrl.setRoot('/welcome2');
     this.router.navigateByUrl('/welcome2');
     loading.dismiss();
     // console.log("ERREUR ===",error);
  })


  this.getsession();
  this.getsession1();
  this.getsessionuser();
  }


  getWhatsAppLink(contact: string): string {
    const encodedContact = encodeURIComponent(contact);
    return `whatsapp://send?phone=${encodedContact}`;
  }

  getpubvideo(){
    this._apiService.getpubvideo().subscribe((res:any) => {

      console.log("SUCCESS ===",res);
      this.pubvideo = res;

     },(error: any) => {
     alert('Erreur de connection avec le serveur veillez reessayer');
     //this.navCtrl.setRoot('/welcome2');
     this.router.navigateByUrl('/welcome2');
     // console.log("ERREUR ===",error);
  })

  this.getsession();
  this.getsession1()
  }


  refreshPage(e){
  setTimeout(() => {
    this.getpub();
    this.getpubvideo();
    this.getUserLocation();
    console.log('rafraichissement de la page');
    e.target.complete();
  },500);
  }

    async deconnect(){
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    localStorage.clear();
    this.router.navigateByUrl('/login2');
    loading.dismiss();

    }


    getcategorie(){

      this._apiService.getcategorie().subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        this.categorie = res;
       },(error: any) => {

        console.log("Erreur de connection ",error);

    })

    }


    async couleurbtn() {

      this._apiService.getetat().subscribe((res: any) => {
        console.log("SUCCESS ==", res);

        const etats = res;

          let couleur = '';

///////////////////////////////////////////////////////////////////////////////
          // Itérer sur les états
          etats.forEach(async  (etat) => {
            const etatContactUser = etat.contactuser;
            const etatIdUser = etat.iduser;
            const etatEtat = etat.etat;

            // Conditions pour vérifier les états
            if (
              this.numuser === etatContactUser.trim() &&
              this.iduser === etatIdUser.trim() &&
              etatEtat.trim() === 'oui'
               ) {
              couleur = 'oui';
              etat.couleurbouton = couleur;
                }
               else if (
                this.numuser === etatContactUser.trim() &&
                this.iduser === etatIdUser.trim() &&
                etatEtat.trim() === 'non'
                 )   {
              couleur = 'non';
              etat.couleurbouton = couleur;
                     }

              console.log(`La couleur du bouton est activée :  ${etat.id}  ${etat.couleurbouton}`);

                  });

    /////////////////////////////////////////////////////////////////////////////////

      //    console.log(`La couleur du bouton est activée: ${couleur}`);

         // console.log(`La couleur du bouton est activée : ${publi.couleurbouton}`);

        });


    }



    async supprimer(id){

      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
       spinner:'lines',
      // showBackdrop:false,
        cssClass: 'custom-loading',
      });

      loading.present();

    this._apiService.presentAlertpub(id).subscribe((res:any)  => {

      loading.dismiss();

      this.getpub();

    },(error: any) => {
      loading.dismiss();
      alert('Erreur de connection avec le serveur veillez reessayer');
      //this.navCtrl.setRoot('/welcome2');
      // console.log("ERREUR ===",error);
   })

      }


      async supprimervideo(id){

        const loading = await this.loadingCtrl.create({
          message: 'Rechargement...',
         spinner:'lines',
        // showBackdrop:false,
          cssClass: 'custom-loading',
        });

        loading.present();

      this._apiService.presentAlertpubvideo(id).subscribe((res:any)  => {
        loading.dismiss();
        this.getpub();

      },(error: any) => {
        loading.dismiss();
        alert('Erreur de connection avec le serveur veillez reessayer');
        //this.navCtrl.setRoot('/welcome2');
        // console.log("ERREUR ===",error);
     })
        }



  async presentAlert(id) {
    const alert = await this.alertController.create({
      header: 'Etes-vous sur de vouloir supprimer cette entreprise ?',
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

            this.supprimer(id);

        },
        },
    ],
    });
  return alert.present();
  }

  async presentAlertvideo(id) {
    const alert = await this.alertController.create({
      header: 'Etes-vous sur de vouloir supprimer cette entreprise ?',
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

            this.supprimervideo(id);

        },
        },
    ],
    });
  return alert.present();
  }


  async Loading() {
      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        duration: 4000,
        cssClass: 'custom-loading',
      });

      loading.present();
      this.router.navigateByUrl('/welcome')
      //this.navCtrl.setRoot('/welcome');
      this.getpub();
      this.getpubvideo();
    }

  async quitter(id) {
    const alert = await this.alertController.create({
      header: 'Etes-vous sur de vouloir quitter Lokalist ?',
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
            App.exitApp();
        },
        },
    ],
    });
  return alert.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      duration: 4000,
      cssClass: 'custom-loading',
    });

    loading.present();
    this.router.navigateByUrl('/welcome')
    //this.navCtrl.setRoot('/welcome');
    this.getpub();
  }

  ionViewWillEnter()
  {
    this.getpub();
    this.getpubvideo();
  }

  ngOnInit()
  {
    this.getpub();
    this.getpubvideo();
  }

  @ViewChild('maliste', {static: false}) list: IonList;

  get entrepriseCount(){

    return  this.pub.length;

  }
  acceuil() {

    this.router.navigateByUrl('/acceuil');

  }

  service() {

    this.router.navigateByUrl('/welcome');

  }

  apropos() {

    this.router.navigateByUrl('/apropos');

  }

  ping() {

    this.router.navigateByUrl('/ping');

  }
  //ionViewDidEnter(){
  // this.list && this.list.ionChange.subscribe(() => this.entrepriseCount);
  //}



async getUserLocation() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    const userLatitude = coordinates.coords.latitude;
    const userLongitude = coordinates.coords.longitude;
    // Utilisez les coordonnées de l'utilisateur comme nécessaire
    console.log('Latitude:', userLatitude);
    console.log('Longitude:', userLongitude);

    this.userlongitude = userLongitude ;
    this.userlatitude = userLatitude;

    console.error('Coordonnées entreprise:', this.latitude, this.longitude);
    return { userLatitude, userLongitude };
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées:', error);
    return null;
  }

}



async getUserLocationAndCompanyId(id) {
try {
  const coordinates = await Geolocation.getCurrentPosition();
  const userLatitude = coordinates.coords.latitude;
  const userLongitude = coordinates.coords.longitude;

  return { userLatitude, userLongitude, companyId: id };
} catch (error) {
  console.error('Erreur lors de la récupération des coordonnées:', error);
  return null;
}

}


async openUrl() {

  //const userLocationData = await this.getUserLocationAndCompanyId(id);

  const userLocationData = await this.getUserLocation();

  if (userLocationData) {

    const { userLatitude, userLongitude } = userLocationData;

    this.pub.forEach(async (publi) => {
      const distance = this.distanceCalculatorService.haversineDistance(
        userLatitude,
        userLongitude,
        publi.latitude,
        publi.longitude,
      );

      console.log(`Distance entre l'utilisateur et l'entreprise : ${distance} mètres`);

      if (!isNaN(distance)) {
        publi.distanceToUser = distance;
        console.log(`Distance entre l'utilisateur et l'entreprise : ${publi.distanceToUser} mètres`);
      } else {
        console.error('La distance calculée est NaN. Veuillez vérifier les coordonnées.');
      }

    });

  } else {
    console.error('Impossible de récupérer les coordonnées de l\'utilisateur.');
  }

  }

  convertMetersToKilometers(meters: number): string {
    // Conversion de mètres en kilomètres
    const kilometers = meters / 1000;

      // Formattage du résultat
      const formattedDistance = kilometers.toLocaleString('en-US', {
        maximumFractionDigits: 0,
      });

    return `${formattedDistance} km`;
  }


}
