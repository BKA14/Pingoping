import { Alert } from 'selenium-webdriver';
import { CommentaireService } from './CommentaireService';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, NgZone, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController, IonInfiniteScroll, IonList, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { DistanceCalculatorService } from './distance-calculator.service';
import { ChangeDetectorRef } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { filter, throttleTime } from 'rxjs/operators';
import { Observable, Subscription, fromEvent, interval } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { OnDestroy } from '@angular/core';
import { CountdownService } from '../countdown.service';
import { WebSocketService } from '../websocket.service';
import { authService } from '../services/auth.service';
import { timeService } from '../timeservice.service';



@Component({
selector: 'app-commentaire',
templateUrl: './commentaire.page.html',
styleUrls: ['./commentaire.page.scss'],
})
export class CommentairePage implements OnInit, OnDestroy {


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('commentsList') commentsList: ElementRef;

  updateSubscription: Subscription;
  oldpub: any;
  oldcomment: any;
  serverTime: string | number | Date;


@HostListener('click', ['$event'])
onClick(event: MouseEvent) {
const link = this.el.nativeElement.href;
if (link) {
window.open(link, '_blank');
event.preventDefault();
}
}

pubid: any;
titre: any;

tokens: any;
term;
handlerMessage = '';
roleMessage = '';

distanceToUser?: number;
couleurbouton?: any;
userlatitude : any;
userlongitude : any;
localisation? : any;
mapsUrl: any;
likes: any;
latitude:any;
longitude:any;

rangpub: any;
categorie: any = [];
pub: any = [];
pubs: any = [];
etats: any = [];
etats1: any = [];
etatpub: any = [];
pubvideo: any = [];
newComment: string;
comment: any;
comments: any[] = []; // Liste des commentaires
pubId: string; // Identifiant de la publication actuelle
private intervalId: any; // Identifiant de la publication actuelle, pour la mise a jour chaque 3 secondes
isButtonDisabled ;
countdownValue: number;
showOptions : any;
modif : any;
reponse:any;
// Déclarez une variable pour le délai de blocage du bouton (en millisecondes)
delayDuration = 1000; // 30 secondes
id_comment : any;
id_reponse : any;
userbloquer : any;
userData: any = null;
// Déclarer une variable pour stocker la position de défilement
scrollPosition: number = 0;
// Déclarez une variable pour suivre l'état du bouton de decompte
private countdownSubscription: Subscription;
iduserenligne : any ;
page: number = 1;
limit: number = 200;


etatid: any;
idpub: any;
isLiked = false;
public countdown: string;
private websocketSubscription: Subscription;
infiniteScrollDisabled: boolean = false; // Variable pour gérer l'état de l'infinite scroll



shouldBlink(countdown: string): boolean {
// Ajoutez la logique pour déterminer si le texte doit clignoter
// Vous pouvez vérifier la condition spécifique que vous souhaitez ici
return countdown.trim() === 'Événement en cours!';
}

// Date de l'événement (remplacez cela par votre propre logique pour récupérer la date)


public progress = 0;
etatService: any;


constructor(public _apiService: ApiService,
private alertController: AlertController,
private route: ActivatedRoute,
private router: Router,
private loadingCtrl: LoadingController,
public  loadingController: LoadingController,
private distanceCalculatorService: DistanceCalculatorService,
private cdr: ChangeDetectorRef,
private zone: NgZone,
private appRef: ApplicationRef,
private routerOutlet: IonRouterOutlet,
public commentaireService: CommentaireService,
private el: ElementRef,
private ngZone: NgZone,
private navCtrl: NavController,
private countdownService: CountdownService,
private elementRef: ElementRef,
private renderer: Renderer2,
private wsService: WebSocketService,
private authService: authService,
private timeService: timeService

)
{
this.route.queryParams.subscribe(params => {
if (params && params.pubId) {
this.pubid = params.pubId;
this.loadcommentairepub(this.pubid);
}
});

this.getpub();
this.getUserLocation();
this.loadcommentairepub(this.pubid);
}


private clickListener: () => void;


async ngOnInit() {

  this.updateSubscription = interval(10000).subscribe(async () => {
  await this.openUrl();
  console.log('actualise openUrl 3');
  this.cdr.detectChanges(); // Détecter et appliquer les changements
  });

  this.timeService.getServerTime().subscribe((response) => {
    this.serverTime = response.serverTime;
    console.log('serveur time', this.serverTime );
  });

  // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  this.loadInitialPub() ;
  this.loadLike();
  this.loadCommentaires();

  this.clickListener = this.toggleOptions.bind(this);
  document.addEventListener('click', this.clickListener);

  //this.reloadPage();
  this.setupIntersectionObserver();
  // Mettez à jour le compte à rebours chaque seconde
  this.intervalId = setInterval(() => {
    this.loadcommentairepub(this.pub.id);
    window.scrollTo(0, this.scrollPosition);
  }, 3000);

  this.startCountdown();
  window.addEventListener('click', (event) => {
  this.comment.forEach(commentaire => {
  });
  });

  }


restoreScrollPosition() {
  window.scrollTo(0, this.scrollPosition);
  console.log(this.scrollPosition);
}

ionViewWillEnter() {
this.getpub();
this.getUserLocation();
}


    likepub(pub: any) {

      if (pub.isLoading) return; // Évite les clics multiples

      pub.isLoading = true;

      let data = {
        iduser: this.userData.iduser,
        contactuser: this.userData.numuser,
        pubid: pub.id,
       }
       this._apiService.getetat2(data).subscribe(async (res:any) => {
        console.log("SUCCESS ===",res);

        if(res.result === 'oui'){

        if(res.data.etat === 'oui') {
        await this.disLike(pub);
        pub.likes_count = pub.likes_count - 1;
        pub.user_ids = pub.user_ids.filter(userId => userId !== this.userData.iduser);
        console.log("dislike",pub.likes_count);
        console.log("dislike",pub.user_ids);
        }
        else if (res.data.etat === 'non')
        {
          await  this.Likes(pub);
          pub.likes_count = pub.likes_count + 1;
          pub.user_ids.push(this.userData.iduser);
          console.log("like",pub.likes_count);
          console.log("like",pub.user_ids);
        }
        else {
        console.log('Erreur de connection')
          return;
        }

        }
        else if (res.result === 'non')
           {
           await this.Likepremier(pub);
           pub.likes_count = pub.likes_count + 1;
           pub.user_ids.push(this.userData.iduser);
           console.log("like",pub.likes_count);
           console.log("like",pub.user_ids);
           }

           pub.isLoading = false;
           // Forcer la détection des changements manuelle
         this.cdr.detectChanges();
        },(error: any) => {
          pub.isLoading = false;
          console.log('Erreur de connection  nouveau etat non enregistre');
        console.log("ERROR ===",error);
       })

         }


    async Likepremier(pub): Promise<void> {

      let data = {
        iduser: this.userData.iduser,
        contactuser: this.userData.numuser,
        etat: 'oui',
        pubid: pub.id,
       }

       this._apiService.addetatlikes(data).subscribe((res:any) => {
       // console.log("SUCCESS ===",res);
         //window.location.reload();

         //alert('Nouveau etat ajoute avec success');
       },(error: any) => {

        console.log('Erreur de connection  nouveau etat non enregistre');
        console.log("ERROR ===",error);
       })

       this.cdr.detectChanges();

          }

         async Likes(pubs): Promise<void> {

          let data = {

            iduser: this.userData.iduser,
            contactuser: this.userData.numuser,
            etat: 'oui',
            pubid: pubs.id,

           }

           this._apiService.disLike(pubs.id,data).subscribe((res:any) => {
            console.log("SUCCESS ===",res);

             //alert('Nouveau etat ajoute avec success');
           },(error: any) => {

            console.log('Erreur de connection  nouveau etat non enregistre');
            console.log("ERROR ===",error);
           })

           this.cdr.detectChanges();

              }

         async disLike(pub): Promise<void> {

          let data = {

            iduser: this.userData.iduser,
            contactuser: this.userData.numuser,
            etat: 'non',
            pubid: pub.id,

           }

           this._apiService.disLike(pub.id,data).subscribe((res:any) => {
            console.log("SUCCESS ===",res);

           },(error: any) => {

            console.log('Erreur de connection  nouveau etat non enregistre');
            console.log("ERROR ===",error);
           })

           this.cdr.detectChanges();
              }


reloadPage() {
//window.location.reload();
this.getpub();
this.actualiser();
}


actualiser(){
// this.pub2();
this.getpub();
}



async getpub(){

  this.oldpub = this.pub;
  const loading = await this.loadingCtrl.create({
   message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
    duration: 8500,
  });

   loading.present();
   this._apiService.getpubid(this.pubid).subscribe(async (res:any) => {
   console.log("SUCCESS == pub",res);

   if (res && res.length < 1) {
    this.pub = 'aucune_alerte';
  }
  else {
    this.pub = res;
    console.log('latitude', res[0].latitude)
    await this.openUrl();
  }

    loading.dismiss();

   },(error: any) => {
    if (this.oldpub && this.oldpub.length > 0) {
      this.pub = this.oldpub;
    }
    else { this.pub = 'erreur_chargement'; }
   console.log('Erreur de connection avec le serveur veillez reessayer');
   this.pub = this.oldpub;
   loading.dismiss();

})

this.cdr.detectChanges();

}


loadInitialPub() {

  this.websocketSubscription = this.wsService.listenForPubUpdates().subscribe(
    (message) => {
      if (Array.isArray(message)) {
        // Chargement initial des alertes
        console.log('Initial alerts loaded:');
      } else {
        // Traitement des actions individuelles
        switch (message.action) {
          case 'date':
            const updatedPubs = Array.isArray(message) ? message: [message];
            updatedPubs.forEach(updatedPub => {
              const index = this.pub.findIndex(pub => pub.id === updatedPub.id);
              if (index !== -1) {
                this.pub[index].countdown = updatedPub.countdown;
                console.log(`Nouveau countdown pour pub ${updatedPub.id}:`, updatedPub.countdown);
              }
            });
          case 'insert':
              console.log('New alert inserted:', message);
              break;
            case 'update':
              const updatedIndex = this.pub.findIndex(pub => pub.id === message.old_pub_id);
              if (updatedIndex !== -1) {
                // Copier les valeurs actuelles avant la mise à jour
                const currentLikesCount = this.pub[updatedIndex].likes_count;
                const currentUserIds = [...this.pub[updatedIndex].user_ids];

                // Mettre à jour le message avec les nouvelles valeurs
                message.likes_count = currentLikesCount;
                message.user_ids = currentUserIds;

                // Remplacer l'élément dans le tableau this.pub
                this.pub[updatedIndex] = message;

                console.log('pub updated:', message);
                console.log('pub updated:', message.old_pub_id);
              }
              break;
          case 'delete':
            console.log('pub deleted:', message);
            break;
          default:
            console.log('Unknown action:', message);
        }
      }
    },
    (err) => console.error('WebSocket Error:', err)
  );

  }


loadLike() {
  this.websocketSubscription = this.wsService.listenForLikesUpdates().subscribe(
    (message) => {
      if (Array.isArray(message)) {
        // Chargement initial des alertes
        console.log('Ne fais rien car géré au niveau des Pub:');
        // Vous pouvez éventuellement traiter les données initiales ici si nécessaire
      } else {
        // Traitement des actions individuelles
        switch (message.action) {
          case 'insert':
            console.log('Ne fais rien pour insert car géré au niveau des Pub:');
            // Vous pouvez ajouter un traitement spécifique si nécessaire
            break;
          case 'update':
            console.log('Il y a une mise à jour like sur la pub ok:');
            const updatedIndex = this.pub.findIndex(pub => pub.id === message.idpub);
            if (updatedIndex !== -1) {
              this.pub[updatedIndex].likes_count = message.likes_count;
              this.pub[updatedIndex].user_ids = message.user_ids;
              console.log('Likes_count de la pub mis à jour:', message.likes_count);
              console.log('User_ids de la pub mis à jour:', message.user_ids);
            }
            break;
          case 'delete':
            console.log('Ne fais rien pour delete car géré au niveau des Pub:');
            // Vous pouvez ajouter un traitement spécifique si nécessaire
            break;
          default:
            console.log('Action inconnue:', message);
        }
      }
    },
    (err) => console.error('Erreur WebSocket:', err)
  );
}


loadCommentaires() {
  this.websocketSubscription = this.wsService.listenForCommentairesUpdates().subscribe(
    (message) => {
      if (Array.isArray(message)) {
        // Chargement initial des alertes
        console.log('Ne fais rien car pas besoin pour le moment:');
      } else {
        // Traitement des actions individuelles
        switch (message.action) {
          case 'insert':
            console.log('Un nouveau commentaires inseré:');
            this.comment.push(message);
            break;
          case 'update':
            console.log('Il y a une mise à jour de commentraires:');
            const updatedIndex = this.comment.findIndex(comment => comment.id === message.old_commentaires_id);
            if (updatedIndex !== -1) {
              const ancienne_date = this.comment[updatedIndex].heure;
              message.heure =  ancienne_date;
              this.comment[updatedIndex] = message;
              console.log('commentaires mis a jour:', message.old_commentaires_id);
              console.log('commentaires mis a jour :', message.commentaires_id);
            }
            break;
          case 'delete':
            console.log('Il y a une suppression de commentraires:');
            this.comment = this.comment.filter(comment => comment.id !== message.old_commentaires_id);
            console.log('commentaire deleted:', message);
            break;
          default:
            console.log('Action inconnue:', message);
        }
      }
    },
    (err) => console.error('Erreur WebSocket:', err)
  );
}


 // Vérification d'appartenance avec Set
 hasLiked(pub: any): boolean {
  return pub.user_ids?.includes(this.userData.iduser.toString());
}


getWhatsAppLink(contact: string): string {
const encodedContact = encodeURIComponent(contact);
return `whatsapp://send?phone=${encodedContact}`;
}

  async refreshPage(e){

// Réinitialiser les données de la page et du tableau pub
this.page = 1;
this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

await this.getpub();
this.cdr.detectChanges();
this.getUserLocation();
await this.loadcommentairepub(this.pubid);
console.log('rafraichissement de la page');
e.target.complete();

}


async deconnect() {
const alert = await this.alertController.create({
header: 'Déconnexion',
message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
buttons: [
{
text: 'Annuler',
role: 'cancel',
cssClass: 'secondary',
handler: () => {
// L'utilisateur a annulé la déconnexion, ne rien faire
}
}, {
text: 'Déconnecter',
handler: () => {
// L'utilisateur a confirmé la déconnexion
this.performLogout();
}
}
]
});

await alert.present();
}

async performLogout() {
const loading = await this.loadingCtrl.create({
message: 'Déconnexion en cours...',
spinner: 'lines',
cssClass: 'custom-loading',
duration: 8500,
});
loading.present();

localStorage.clear();
this.router.navigateByUrl('/login2');
loading.dismiss();
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

async getUserLocation(): Promise<{ userLatitude: number; userLongitude: number } | null> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: Unable to get location')), 6000)
    );

    const geolocationPromise = Geolocation.getCurrentPosition();

    const coordinates = await Promise.race([geolocationPromise, timeoutPromise]) as GeolocationPosition; // Assertion de type ici

    const userLatitude = coordinates.coords.latitude;
    const userLongitude = coordinates.coords.longitude;

    console.log('Latitude:', userLatitude);
    console.log('Longitude:', userLongitude);

    this.userlongitude = userLongitude;
    this.userlatitude = userLatitude;

    return {  userLatitude, userLongitude };
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées:', error);
    return null;
  }
}

async openUrl() {
console.log('Début de openUrl');
const userLocationData = await this.getUserLocation();

if (userLocationData) {
  const { userLatitude, userLongitude } = userLocationData;
  console.log(`Coordonnées utilisateur : ${userLatitude}, ${userLongitude}`);

  if (Array.isArray(this.pub)) {
    for (const publi of this.pub) {
      const distance = this.distanceCalculatorService.haversineDistance(
        userLatitude,
        userLongitude,
        publi.latitude,
        publi.longitude
      );

      console.log(`Distance : ${distance} mètres`);

      if (!isNaN(distance)) {
        publi.distanceToUser = distance;
        console.log(`Distance entre l'utilisateur et l'entreprise : ${publi.distanceToUser} mètres`);
      } else {
        console.error('La distance est NaN.');
      }
    }
  } else {
    console.error('this.pub n\'est pas un tableau :', this.pub);
  }
} else {
  this.userlongitude = null;
  this.userlatitude = null;
  console.error('Impossible de récupérer les coordonnées de l\'utilisateur.');
  throw new Error('Erreur: Impossible de récupérer les coordonnées de l\'utilisateur.');
}
}

convertMetersToKilometers(meters: number): string {
// Si la distance en mètres est inférieure à 4000 (4 km), renvoyer en mètres
if (meters < 4000) {
const formattedmettre = Math.floor(meters).toString();
return `${formattedmettre} m`;
} else {
// Sinon, convertir les mètres en kilomètres
const kilometers = meters / 1000;
// Formattage du résultat sans point ni virgule
const formattedDistance = Math.floor(kilometers).toString();
return `${formattedDistance} km`;
}
}



async loadcommentairepub(pubId: string) {
  this.page = 1;
  this.oldcomment = this.comment;
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner:'lines',
   // showBackdrop:false,
     cssClass: 'custom-loading',
     duration: 8500,
   });

    loading.present();

    this._apiService.loadcommentairepub(pubId, this.page, this.limit).subscribe((res: any) => {
    console.log('SUCCESS ===', res);
    // Mettez à jour les commentaires avec la réponse de l'API

      this.comment = res;
      loading.dismiss();
      this.iduserenligne = pubId;
    } , (error: any) => {
      console.log('Erreur de connexion avec le serveur, veuillez réessayer.');
      this.comment = this.oldcomment;
    });

}

async loadMore(event) {

  this.page++;
  this.oldcomment = this.comment;
    this._apiService.loadcommentairepub(this.pubid, this.page, this.limit).subscribe((res: any) => {
      console.log('SUCCESS ===', res);

    this.comment = this.comment.concat(res);

    // Désactiver l'infinite scroll si moins de données retournées que la limite
    if (res.length < this.limit) {
      this.infiniteScrollDisabled = true;
    }
    event.target.complete();
  } , (error: any) => {
    console.log('Erreur de connexion avec le serveur, veuillez réessayer.');
    this.comment = this.oldcomment;
  });
}


// pour reinitialiser la variable  de decompte

startCountdown(): void {
this.countdownService.startCountdown();
this.countdownSubscription = this.countdownService.getCountdownTimer().subscribe(() => {
this.isButtonDisabled = false;
this.countdownValue = null;
});

}


  async submitComment() {

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner:'lines',
      cssClass: 'custom-loading',
      duration: 8500,
    });

    loading.present();

    // Vérifie si un commentaire a été saisi
    if (!this.newComment) {
      loading.dismiss();
      return;
    }

    // Vérifie si l'utilisateur est bloqué
    try {
      const res = await this._apiService.usersignaler2(this.userData.iduser).toPromise();
      this.userbloquer = res;
      if (this.userbloquer.length > 0 && this.userbloquer[0].datefinblocage.trim() !== 'non') {
        const dateFinBlocage = new Date(this.userbloquer[0].datefinblocage);
        const dateFinBlocageString = dateFinBlocage.toLocaleString();
        alert('Vous avez été bloqué, vous pourrez commenter le ' + dateFinBlocageString + '. Merci de respecter les autres utilisateurs.');
        loading.dismiss();
        return;
      }
    } catch (error) {
      console.log('erreur de chargement', error);
      loading.dismiss();
      return;
    }

    // Désactive le bouton et initialise le compte à rebours
    this.isButtonDisabled = true;
    this.countdownValue = this.countdownService.delayDuration;

    const newComment = {
      id : 'ok',
      pubid: this.pubid,
      nom: this.userData.nom,
      iduser: this.userData.iduser,
      prenom: this.userData.prenom1,
      commentaire: this.newComment,
    };

    try {
      const res : any = await this._apiService.sendcomment(newComment).toPromise();
      console.log("SUCCESS ===", res);

           const idsubmit = res.id;
           console.log('id res', res.id);
           console.log('idsubmit', idsubmit); // Affiche l'identifiant retourné

           newComment.id = idsubmit;

           this.newComment = '';

      // Ajoutez le nouveau commentaire en bas de la liste sans recharger la page
       //await this.comment.push(newComment);

       // Ajoutez une petite pause pour permettre au DOM de se mettre à jour
       setTimeout(() => {
       // Défilez jusqu'à la fin de la liste des commentaires
       this.scrollTo();
       }, 850); // ajustez la durée selon les besoins


      loading.dismiss();

      // Réinitialise le décompte et l'état du bouton après l'envoi du commentaire
      this.startCountdown();
    } catch (error) {
      console.error("ERROR ===", error);
      alert('Erreur : Commentaire non envoyé reessayer');
      this.isButtonDisabled = false;
      loading.dismiss();
    }
  }


  scrollTo() {
    // Obtenez une référence à la liste des commentaires par son identifiant unique
    const commentsList = document.getElementById('commentsList');
    console.log('ok 1', commentsList)
    console.log('ok 2', commentsList.lastElementChild)
    if (commentsList && commentsList.lastElementChild) {
      // Faites défiler jusqu'au dernier élément de la liste
      console.log('ok 3', commentsList)

      commentsList.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });

    }
  }

//////////// recuperer la date /////////////////////

formatCommentTime(time: string): string {
  const commentDate = new Date(time);
  const now = new Date(this.serverTime); // Utiliser l'heure du serveur
  const diffInSeconds = Math.round((now.getTime() - commentDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Il y a quelques instants';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.round(diffInSeconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.round(diffInSeconds / 3600);
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    return commentDate.toLocaleDateString('fr-FR');
  }
}

async supprimerCommentaire(id){

const loading = await this.loadingCtrl.create({
message: 'Rechargement...',
spinner:'lines',
// showBackdrop:false,
cssClass: 'custom-loading',
duration: 8500,
});

loading.present();

this._apiService.presentAlertcommentaire(id).subscribe((res:any)  => {

// Supprimez le commentaire de la liste locale
const index = this.comment.findIndex(comment => comment.id === id);
if (index !== -1) {
  this.comment.splice(index, 1);
}

loading.dismiss();

},(error: any) => {
loading.dismiss();
alert('Erreur de connection avec le serveur veillez reessayer');
//this.navCtrl.setRoot('/welcome2');
// console.log("ERREUR ===",error);
})
this.cdr.detectChanges();

}


async presentAlert(id) {

const alert = await this.alertController.create({
header: 'Etes-vous sur de vouloir supprimer ce commentaire ?',
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

this.supprimerCommentaire(id);

},
},
],
});
return alert.present();
this.cdr.detectChanges();

}

async modifierCommentaire(id){

let data = {
commentaire : this.newComment,
}

const loading = await this.loadingCtrl.create({
message: 'Rechargement...',
spinner:'lines',
// showBackdrop:false,
cssClass: 'custom-loading',
duration: 8500,
});

loading.present();

this._apiService.modifierCommentaire(this.id_comment,data).subscribe((res:any)  => {


// Mettez à jour le commentaire dans la liste locale
const commentaireIndex = this.comment.findIndex(comment => comment.id === this.id_comment);
if (commentaireIndex !== -1) {
this.comment[commentaireIndex].commentaire = this.newComment;
}


this.modif = false;
this.newComment = '';
this.id_comment ='';
loading.dismiss();


},(error: any) => {
loading.dismiss();
alert('Erreur de connection avec le serveur veillez reessayer');
//this.navCtrl.setRoot('/welcome2');
// console.log("ERREUR ===",error);
})
this.cdr.detectChanges();
}

modifcommentaire(commentaire : any): void {
this.id_comment = commentaire.id;
console.log( 'idvue', this.id_comment  );
console.log( 'idvue2', commentaire.id  );
this.newComment = commentaire.commentaire;
this.modif=true;
this.reponse=false;
}

repondre(commentaire) {
  this.id_reponse = commentaire.id;
  console.log( 'idvue', this.id_reponse  );
  console.log( 'idvue2', commentaire.id  );
  this.reponse=true;
  this.modif=false;
  }

annulermodif(): void {
this.modif=false;
this.newComment='';

}

annulerepondre(): void {
  this.reponse=false;
  this.newComment='';
  }

// Méthode pour trouver le commentaire parent correspondant
findParentComment(idParent: string): any {
  return this.comment.find(comment => comment.id === idParent);
}



async signalerCommentaire(commentaire) {

  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner:'lines',
    // showBackdrop:false,
    cssClass: 'custom-loading',
    duration: 8500,
    });

    loading.present();

  const newComment = {
// signaleur
  nomsignaleur: this.userData.nom,
  prenomdusignaleur: this.userData.prenom1,
  iduserdusignaleur: this.userData.iduser,
  heuredusignalement: new Date().toISOString(),

  //id comm
  idcomsignaler : commentaire.id,

  // signalé
  idusersignaler : commentaire.iduser,
  nomestsignaler : commentaire.nom,
  prenomestsignaler : commentaire.prenom,
  heurecomdusignaler : commentaire.heure,
  commentairesignaler : commentaire.commentaire,
  pubidcomsignaler : commentaire.pubid,

  };

//verifie si l'utilisateur avais deja signaler cet utilisateur

const data = {
  iduser : this.userData.iduser,
  idcomsignaler : commentaire.id,
  pubidcommentaire : commentaire.pubid,
    };

  const result = await this._apiService.verifie(data).toPromise();
  console.log("SUCCESS ===", result);

  if (result === true) {
    loading.dismiss();
    alert('vous avez deja signalé ce commentaire, on s\'en occupe déja');
    return;
      }

////////////////////////////////////////////////////////////////////////////////

  try {

  const res = await this._apiService.signalercommentaire(newComment).toPromise();
  console.log("SUCCESS ===", res);
  loading.dismiss();
  alert('Signalement envoyé, notre équipe va s\'en charger');

  }

  catch (error) {
  console.error("ERROR ===", error);
  loading.dismiss();
  alert('Erreur reseau signalement non envoyé');
  }

  }



async signalement(commentaire) {

  const alert = await this.alertController.create({
  header: 'Etes-vous sur de vouloir signaler cet utilisateur ?',
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

  this.signalerCommentaire(commentaire);

  },
  },
  ],
  });
  return alert.present();
  this.cdr.detectChanges();

  }


    async repondrecommentaire() {

      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        spinner:'lines',
        // showBackdrop:false,
        cssClass: 'custom-loading',
        duration: 8500,
        });

      loading.present();

      // Vérifie si un commentaire a été saisi
      if (!this.newComment) {
      return;
      }

      // Désactive le bouton et initialise le compte à rebours
      this.isButtonDisabled = true;
      this.countdownValue = this.countdownService.delayDuration;

      const newComment = {
      id : 'ok',
      pubid: this.pubid,
      nom: this.userData.nom,
      iduser: this.userData.iduser,
      prenom: this.userData.prenom1,
      commentaire: this.newComment,
      idcommentrepondu : this.id_reponse,
      };
      console.log('id', this.id_reponse);

      try {
      const res : any = await this._apiService.repondrecommentaire(newComment).toPromise();
      console.log("SUCCESS ===", res);

      // Ajouter l'identifiant retourné dans l'objet de commentaire
         const idnouv = res.id;
         console.log('id res', res.id);
         console.log('idniouv', idnouv); // Affiche l'identifiant retourné

         newComment.id = idnouv;

         this.comment.push(newComment);

      // Ajoutez une petite pause pour permettre au DOM de se mettre à jour
      setTimeout(() => {
      // Défilez jusqu'à la fin de la liste des commentaires
      this.scrollTo();
      }, 850); // ajustez la durée selon les besoins

      this.newComment ='';
      this.id_reponse ='';

      loading.dismiss();
      // Réinitialise le décompte et l'état du bouton après l'envoi du commentaire
      this.startCountdown();
      this.reponse =false;
      } catch (error) {
      console.error("ERROR ===", error);
      loading.dismiss();
      alert('Erreur : Commentaire non envoyé');
      this.isButtonDisabled = false;
      }

      }

      copiercommentaire(text: string) {
        // Créez une zone de texte temporaire pour copier le texte
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Affichez le message de copie pendant 2 secondes
        const copyMessage = document.getElementById('copy-message');
        if (copyMessage) {
          copyMessage.classList.add('show');
          setTimeout(() => {
            copyMessage.classList.remove('show');
          }, 2000); // 2 secondes
        }
      }



ngOnDestroy() {
  document.removeEventListener('click', this.clickListener);
}


toggleOptions(event: MouseEvent,commentaire: any): void {
  // Fermer tous les menus de commentaire
  this.comment.forEach(c => {
    if (c !== commentaire) {
      c.showOptions = false;
    }
  });

 // commentaire.showOptions = !commentaire.showOptions;

  event.stopPropagation();
  console.log('1',event)

}

private hideButtonTimeout: any;
@ViewChild('scrollButton', { static: false }) scrollButton: ElementRef;
@ViewChild(IonContent, { static: false }) content: IonContent;


ngAfterViewInit() {
  this.addScrollListener();
  this.resetHideButtonTimer() ;
}


scrollToTop() {
  this.content.scrollToBottom(500); // Utiliser la méthode scrollToTop d'Ionic
}

addScrollListener() {
  this.content.getScrollElement().then(scrollElement => {
    this.renderer.listen(scrollElement, 'scroll', () => {
      this.handleScroll(scrollElement);
      this.resetHideButtonTimer();
    });
  });
}


handleScroll(scrollElement) {
  const scrollButton = this.scrollButton.nativeElement;

  if (!scrollElement || !scrollButton) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollElement;
  console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

  if (scrollTop >= 700 && scrollTop + clientHeight < scrollHeight - 800) {
    this.renderer.setStyle(scrollButton, 'display', 'block');
  } else {
    this.renderer.setStyle(scrollButton, 'display', 'none');
  }
}

resetHideButtonTimer() {
  if (this.hideButtonTimeout) {
    clearTimeout(this.hideButtonTimeout);
  }
  this.hideButtonTimeout = setTimeout(() => {
    this.renderer.setStyle(this.scrollButton.nativeElement, 'display', 'none');
  }, 2000);
}

@ViewChildren('videoElement') videoElements: QueryList<ElementRef<HTMLVideoElement>>;
private manualPause: boolean = false; // Contrôle de la pause manuelle
private currentPlayingVideo: HTMLVideoElement = null; // Vidéo actuellement en lecture

setupIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        if (!this.manualPause) {
          this.playVideo(video);
        }
      } else {
        this.pauseVideo(video);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  this.videoElements.forEach((videoElement) => {
    const video = videoElement.nativeElement;
    observer.observe(video);
  });
}

handleVideoClick(videoElement: HTMLVideoElement) {
  console.log('Video clicked', videoElement);
  if (this.currentPlayingVideo && this.currentPlayingVideo !== videoElement) {
    // Pause la vidéo actuellement en cours si elle existe et n'est pas la même que celle cliquée
    this.pauseVideo(this.currentPlayingVideo);
  }
  this.currentPlayingVideo = videoElement;

  if (document.fullscreenElement === videoElement) {
    document.exitFullscreen().catch(err => console.log(`Error exiting full screen: ${err.message}`));
  } else {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen().catch(err => console.log(`Error requesting full screen: ${err.message}`));
    }
  }
}

// Méthode pour gérer la pause manuelle
toggleManualPause(videoElement: HTMLVideoElement) {
  console.log('Entre dans toggle:');
  this.manualPause = !this.manualPause;
  if (this.manualPause) {
    console.log('Entre dans toggle 1:', this.manualPause);
    this.pauseVideo(videoElement);
    console.log('Entre dans toggle 2:', this.manualPause);
  } else {
    console.log('Entre dans toggle 3:', this.manualPause);
    this.playVideo(videoElement);
  }
}

@HostListener('document:fullscreenchange', ['$event'])
onFullScreenChange(event: Event) {
  const videoElement = event.target as HTMLVideoElement;
  console.log('Fullscreen change event', videoElement);
  if (!document.fullscreenElement) {
    // Le document n'est pas en mode plein écran
    console.log('Exited fullscreen mode');
  }
}

playVideo(video: HTMLVideoElement) {
  // Pause toutes les autres vidéos avant de jouer la nouvelle
  this.videoElements.forEach((videoElement) => {
    const videoEl = videoElement.nativeElement;
    if (videoEl !== video) {
      this.pauseVideo(videoEl);
    }
  });

  // Jouer la nouvelle vidéo
  if (video) {
    this.currentPlayingVideo = video; // Met à jour la vidéo actuellement en lecture
    this.manualPause = false; // Réinitialise la pause manuelle
    video.play().catch(err => console.log(`Error playing video: ${err.message}`));
  }
}

pauseVideo(video: HTMLVideoElement) {
  if (video) {
    video.pause();
    if (this.currentPlayingVideo === video) {
      this.currentPlayingVideo = null; // Réinitialise la vidéo actuellement en lecture
    }
  }
}

togglePlayPause(video: HTMLVideoElement) {
  if (video.paused) {
    video.play().catch(err => console.log(`Error playing video: ${err.message}`));
  } else {
    video.pause();
  }
}

seekVideo(event: Event, video: HTMLVideoElement) {
  const input = event.target as HTMLInputElement;
  video.currentTime = parseFloat(input.value);
}

toggleFullScreen(video: HTMLVideoElement) {
  if (document.fullscreenElement === video) {
    document.exitFullscreen().catch(err => console.log(`Error exiting full screen: ${err.message}`));
  } else {
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(err => console.log(`Error requesting full screen: ${err.message}`));
    }
  }
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
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
  return videoExtensions.some(ext => trimmedPhoto.endsWith(ext)) && trimmedPhoto !== 'non';
}

}












