import { Alert } from 'selenium-webdriver';
import { CommentaireService } from './CommentaireService';
import { Component, ElementRef, EventEmitter, HostListener, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController, IonList, LoadingController } from '@ionic/angular';
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



@Component({
selector: 'app-commentaire',
templateUrl: './commentaire.page.html',
styleUrls: ['./commentaire.page.scss'],
})
export class CommentairePage implements OnInit {

@ViewChild(IonContent, { static: false }) content: IonContent; // Déclarez une référence au composant IonContent



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
pubs: any = [];
etats: any = [];
etats1: any = [];
etatpub: any = [];
pubvideo: any = [];
newComment: string;
comment: any;
comments: any[] = []; // Liste des commentaires
pubId: string; // Identifiant de la publication actuelle

isButtonDisabled ;
countdownValue: number;
showOptions : any;
modif : any;
reponse:any;
// Déclarez une variable pour le délai de blocage du bouton (en millisecondes)
delayDuration = 1000; // 30 secondes
id_comment : any;
userbloquer : any;

// Déclarez une variable pour suivre l'état du bouton de decompte
private countdownSubscription: Subscription;

// pour les options commentaire
toggleOptions(commentaire: any): void {
commentaire.showOptions = !commentaire.showOptions;
}


etatid: any;

idpub: any;

isLiked = false;
public countdown: string;


async ngOnInit() {


//this.reloadPage();
this.updateCountdownForAds() ;

this.setupIntersectionObserver();
// Mettez à jour le compte à rebours chaque seconde
setInterval(() => {
this.updateCountdownForAds() ;

// this.openUrl() ;
}, 1000);

this.startCountdown();

window.addEventListener('click', (event) => {
this.comment.forEach(commentaire => {
this.closeOptionsOnOutsideClick(event, commentaire);
});
});

}

// pour fermer le menu option
closeOptionsOnOutsideClick(event: MouseEvent, commentaire: any): void {
const clickedElement = event.target as HTMLElement;
const commentOptions = document.getElementById('comment-options-' + commentaire.id);

// Vérifie si l'élément cliqué est en dehors des options de commentaire
if (!commentOptions.contains(clickedElement)) {
commentaire.showOptions = false;
}
}


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
public loadingController: LoadingController,
private distanceCalculatorService: DistanceCalculatorService,
private cdr: ChangeDetectorRef,
private zone: NgZone,
private appRef: ApplicationRef,
private routerOutlet: IonRouterOutlet,
private commentaireService: CommentaireService,
private el: ElementRef,
private ngZone: NgZone,
private navCtrl: NavController,
private countdownService: CountdownService,
private elementRef: ElementRef
)
{
this.route.queryParams.subscribe(params => {
if (params && params.pubId) {
this.pubid = params.pubId;
this.loadcommentairepub(this.pubid);
// rechargement commentaire
setInterval(() => {

this.loadcommentairepub(this.pubid);
// this.openUrl() ;
}, 11000);
}
});

this.getpub();
this.getUserLocation();
this.getsessionuser();
this.getetat();
this.pub2();




}


@ViewChild('commentList') commentList: ElementRef; // Référence à la liste de commentaires

@ViewChildren('videoElement') videoElements: QueryList<ElementRef>;

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
this.playVideo(video);
} else {
this.pauseVideo(video);
}
});
};

const observer = new IntersectionObserver(callback, options);

this.videoElements.forEach((videoElement) => {
const video = videoElement.nativeElement;

// Observer pour l'intersection
observer.observe(video);

// Gestionnaire d'événements de clic
//fromEvent(video, 'click').subscribe(() => {
// this.toggleVideo(video);
// });

});
}


handleVideoClick(videoElement: HTMLVideoElement) {
// Vérifier si la vidéo est actuellement en mode plein écran
if (document.fullscreenElement === videoElement) {
// Quitter le mode plein écran si c'est le cas
document.exitFullscreen();
} else {
// Si la vidéo n'est pas en mode plein écran, basculer en mode plein écran
if (videoElement.requestFullscreen) {
videoElement.requestFullscreen();
} else if (videoElement.requestFullscreen) { // Pour la compatibilité avec les navigateurs WebKit
videoElement.requestFullscreen();
}
}
}



toggleVideo(video: HTMLVideoElement) {
if (video.paused) {
this.playVideo(video);
} else {
this.pauseVideo(video);
}
}


playVideo(video: HTMLVideoElement) {
if (video.paused) {
video.play();
}
}

pauseVideo(video: HTMLVideoElement) {
if (!video.paused) {
video.pause();
}
}



ionViewWillEnter() {

this.getpub();
this.getUserLocation();
this.getsessionuser();
this.getetat();
this.pub2();
}


intervale() {
// Rafraîchir toutes les 0.4 secondes
interval(90000).subscribe(() => {
// this.pub2();
this.getpub();
this.getetat();
this.getpub();
this.getetat();
this.getpub();
this.getetat();
});
}


reloadPage() {
//window.location.reload();
this.getpub();
this.getetat();
this.actualiser();
}


actualiser(){
// this.pub2();
this.getpub();
this.getetat();

}

async LikePub3(pubs): Promise<void> {

this.pubid= pubs.id;

// Supposons que les données contiennent un tableau d'états
const etatsArray = this.etats;

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
this.pubid === etatIdPub &&
this.numuser === etatContactUser &&
this.iduser === etatIdUser &&
etatEtat.trim() === 'non'
) {
// Mettre à jour le modèle après l'ajout de l'état

this.updateView(this.pubs);  // Mettre à jour la vue ici
this.likePublication(pubs);
this.updateetatlikes2();
if (pubs.etat.etat) {
pubs.etat.etat = 'oui'; // Affecter la valeur 'non' à l'état de la publicité
}
console.log(pubs.etat.etat);
conditionSatisfaite = true;
break; // Sortir de la boucle si une condition est satisfaite
} else if (
this.pubid === etatIdPub &&
this.numuser === etatContactUser &&
this.iduser === etatIdUser &&
etatEtat.trim()  === 'oui'
) {

conditionSatisfaite = true;
this.dislikePublication(pubs);
this.updateetatlikes();
if (pubs.etat.etat) {
pubs.etat.etat = 'non'; // Affecter la valeur 'non' à l'état de la publicité
}
console.log(pubs.etat.etat);
break; // Sortir de la boucle si une condition est satisfaite
}
}


// Réinitialisation de conditionSatisfaite à false après la boucle

// Si aucune condition n'est satisfaite dans la boucle, exécuter ces actions
if (!conditionSatisfaite) {
this.addetatlikes()
.then(() => {
// Mettre à jour le modèle après l'ajout de l'état
pubs.etat = { etat: 'oui' };
this.updateView(this.pubs);  // Mettre à jour la vue ici
this.likePublication(pubs);

})
.catch(error => {
console.error("Erreur lors de l'ajout du like :", error);
});
}
}

/*
Ceci est un commentaire
sur plusieurs lignes
*/

async getetat(){
this.zone.run(async () => {
const loading = await this.loadingCtrl.create({
message: 'Rechargement...',
spinner: 'lines',
cssClass: 'custom-loading',
});

loading.present();

this._apiService.getetat().subscribe((res:any) => {
console.log("SUCCESS ===",res);
this.etats = res;
loading.dismiss();
},(error: any) => {
console.log("Erreur de connection ",error);
this.cdr.detectChanges();
loading.dismiss();
})
});
}



async LikePub(pubs): Promise<void> {


this.pubid= pubs.id;

//   console.log('Valeur de pub jointure etat :',  pubs.etat.etat);


this._apiService.getetat().subscribe(async (res:any) => {
console.log("SUCCESS ===",res);
this.etats1 = res;



// Supposons que les données contiennent un tableau d'états
const etatsArray = this.etats1;

let conditionSatisfaite = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (let i = 0; i < etatsArray.length; i++) {
const etat = etatsArray[i];

// Assigner les valeurs à des variables locales

this.etatid = etat.id;
console.log("SUCCESS ==", etat.id);
console.log("SUCCESS ==", pubs.couleur);
const etatIdPub = etat.idpub;
const etatContactUser = etat.contactuser;
const etatIdUser = etat.iduser;
const etatEtat = etat.etat;

console.log("pudid 2 ===", etatIdPub, this.pubid, etat.id , this.iduser);
console.log( pubs.couleur);
// Conditions pour vérifier les états
if (

(
this.pubid.trim() === etatIdPub.trim() &&
this.numuser.trim() === etatContactUser.trim() &&
this.iduser.trim() === etatIdUser.trim() &&
etatEtat.trim() === 'non' &&
pubs.couleur.trim() === 'non'
)

) {
this.likePublication(pubs);
this.updateetatlikes2();
//  console.log(pubs.etat.etat);
pubs.couleur = 'oui'

//  console.log(pubs.etat.etat);
console.log("  il est passé ici  pour le non et devient oui");
console.log(" etat est non et un j'aime effectué ");
conditionSatisfaite = true;
break; // Sortir de la boucle si une condition est satisfaite
} else if (

(
this.pubid.trim() === etatIdPub.trim() &&
this.numuser.trim() === etatContactUser.trim() &&
this.iduser.trim() === etatIdUser.trim() &&
etatEtat.trim() === 'oui' &&
pubs.couleur.trim() === 'oui'
)
)
{
conditionSatisfaite = true;
this.dislikePublication(pubs);
this.updateetatlikes();
console.log(this.etatpub);
pubs.couleur = 'non';

// console.log(pubs.etat.etat);
console.log(" etat est oui et un j'aime retiré ");
console.log("  il est passé ici  pour le oui et devient non");

break; // Sortir de la boucle si une condition est satisfaite
}
}

// Si aucune condition n'est satisfaite dans la boucle, exécuter ces actions
if (!conditionSatisfaite &&  pubs.couleur.trim()==='premier') {
await  this.addetatlikes()
.then(async () => {
await  this.likePublication(pubs),
// Après avoir mis à jour vos données
this.cdr.markForCheck(),
this.appRef.tick()
})

.then(() => {
if ( pubs.couleur) {
pubs.couleur = 'oui';
}
console.log( pubs.couleur);
console.log("  il est passé ici  pour le premier et devient oui");
this.cdr.detectChanges(); // Déclencher manuellement la détection de changement
})
.catch(error => {
console.error("Erreur lors de l'ajout du like :", error);
});
}

// Forcer la détection des changements manuelle
this.cdr.detectChanges();
})


}


async dislikePublication(pubs) {
try {
pubs.likes = parseInt(pubs.likes, 10);

if (!isNaN(pubs.likes)) {
// Incrémenter le nombre de likes
pubs.likes -= 1;
this.likes = pubs.likes;

let data = {
id: pubs.id,
likes: this.likes
};



this._apiService.updatelikes(pubs.id, data).subscribe(
(res: any) => {

console.log("SUCCESS ===", res);
},
(error: any) => {

console.error("Erreur de connexion", error);
// Afficher un message d'erreur à l'utilisateur
// Par exemple, à l'aide d'un service d'alerte
this.showErrorMessage("Erreur lors de la mise à jour des likes.");
}
);
} else {
console.error("Erreur : pub.likes n'est pas un nombre valide.");
}
} catch (error) {
console.error("Erreur inattendue :", error);
// Afficher un message d'erreur à l'utilisateur
// Par exemple, à l'aide d'un service d'alerte
this.showErrorMessage("Erreur inattendue lors du traitement.");
} finally {
this.cdr.detectChanges();
}
}

// Fonction pour afficher un message d'erreur à l'utilisateur
showErrorMessage(message: string) {
// Utilisez un service d'alerte ou autre moyen pour afficher le message à l'utilisateur
console.error(message); // Vous pouvez également afficher dans la console pour le débogage
}



async likePublication(pubs) {


this.id = pubs.id;
pubs.likes = parseInt(pubs.likes, 10);

if (!isNaN(pubs.likes)) {
// Incrémenter le nombre de likes

pubs.likes += 1;
this.likes= pubs.likes;

console.log("Erreur de connection 1",this.id);
let data = {
id: this.id,
likes: this.likes
}

console.log("Erreur de connection 2", this.id);
this._apiService.updatelikes(pubs.id, data).subscribe((res:any) => {

console.log("SUCCESS ===",res);

},(error: any) => {

console.log("Erreur de connection",error);
})

}else {
console.error("Erreur : pub.likes n'est pas un nombre valide.");
}
this.cdr.detectChanges();

}

async addetatlikes(){
let data = {

iduser: this.iduser,
contactuser: this.numuser,
etat: 'oui',
pubid:this.pubid,

}


this._apiService.addetatlikes(data).subscribe((res:any) => {
console.log("SUCCESS ===",res);
//window.location.reload();

//alert('Nouveau etat ajoute avec success');
},(error: any) => {

console.log('Erreur de connection  nouveau etat non enregistre');
console.log("ERROR ===",error);
})
this.cdr.detectChanges();
}


async updateetatlikes(){
let data = {

id: this.etatid.trim(),
iduser: this.iduser.trim(),
contactuser: this.numuser.trim(),
etat: 'non',
pubid:this.pubid.trim(),

}


console.log("SUCCESS ===",data.id, data.contactuser,data.etat,data.pubid,data.iduser);
this._apiService.updateetatlikes(data.id,data).subscribe((res:any) => {
console.log("SUCCESS ===",res);
//window.location.reload();

//alert('Etat modifier avec success');
},(error: any) => {

// alert('Erreur de connection etat non modifier');
console.log("ERROR ===",error);
})
this.cdr.detectChanges();
}


async updateetatlikes2(){
let data = {
id: this.etatid.trim(),
iduser: this.iduser.trim(),
contactuser: this.numuser.trim(),
etat: 'oui',
pubid:this.pubid.trim(),
}


console.log("SUCCESS ===",data.id, data.contactuser,data.etat,data.pubid,data.iduser);
this._apiService.updateetatlikes(data.id,data).subscribe((res:any) => {
console.log("SUCCESS ===",res);
//window.location.reload();

// alert('Etat modifier avec success');
},(error: any) => {

// alert('Erreur de connection etat non modifier');
console.log("ERROR ===",error);
})
this.cdr.detectChanges();

}


getsession(){
this.grade= (localStorage.getItem('grade'));
console.log(this.grade);
}
getsession1(){
this.prenom1= (localStorage.getItem('prenom1'));
console.log(this.prenom1);

this.nom= (localStorage.getItem('nom'));
console.log(this.nom);
}

getsessionuser(){
this.iduser= (localStorage.getItem('iduser'));
console.log(this.iduser);

this.numuser= (localStorage.getItem('numuser'));
console.log(this.numuser);

this.idpub= (localStorage.getItem('idpub'));
console.log(this.numuser);

this.prenom1= (localStorage.getItem('prenom1'));
console.log(this.prenom1);

this.nom= (localStorage.getItem('nom'));
console.log(this.nom);

}


async getpub(){

const loading = await this.loadingCtrl.create({
message: 'Rechargement...',
spinner:'lines',
// showBackdrop:false,
cssClass: 'custom-loading',
});



this._apiService.getpubid(this.pubid).subscribe((res:any) => {
console.log("SUCCESS ==",res);
let rep =res[1];
this.pub = res;
this.openUrl();
this.pub2();
this.latitude=rep.latitude;
this.longitude=rep.longitude;

},(error: any) => {
console.log('Erreur de connection avec le serveur veillez reessayer');
//this.navCtrl.setRoot('/welcome2');
this.router.navigateByUrl('/welcome2');

// console.log("ERREUR ===",error);
})

this.getsession();
this.getsession1();
this.getsessionuser();
this.cdr.detectChanges();

}


getWhatsAppLink(contact: string): string {
const encodedContact = encodeURIComponent(contact);
return `whatsapp://send?phone=${encodedContact}`;
}

refreshPage(e){
setTimeout(() => {
this.getpub();
this.pub2();
this.getUserLocation();
this.cdr.detectChanges();
this.getUserLocation();
this.loadcommentairepub(this.pubid);
console.log('rafraichissement de la page');
e.target.complete();
},500);
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
cssClass: 'custom-loading'
});
loading.present();

localStorage.clear();
this.router.navigateByUrl('/login2');
loading.dismiss();
}



async pub2() {

this.zone.run(() => {
// Effectuer la jointure
const pubsWithEtat = this.pub.map(publicite => {
// Trouver l'état associé à la publicité actuelle
this.etatpub = this.etats.find(etat => etat.idpub.trim() === publicite.id.trim());


// Vérifier l'état et définir la couleur en conséquence
publicite.couleur = (
this.etatpub &&
this.iduser.trim() === this.etatpub.iduser.trim() &&
this.numuser.trim() === this.etatpub.contactuser.trim()
//  this.pubid.trim() === this.etatpub.idpub.trim()
) ? (this.etatpub.etat.trim() === 'oui' ? 'oui' : 'non') : 'premier';

// Retourner l'objet avec l'état associé et la nouvelle propriété couleur
return { ...publicite, etat: this.etatpub, couleur: publicite.couleur };
});

// Mettre à jour le modèle après la jointure
this.pubs = pubsWithEtat;

// Afficher la valeur de la nouvelle propriété "couleur" pour la première pub dans le tableau
console.log('Valeur de pub jointure etat et couleur :', this.pubs[0].couleur);


this.updateView(this.pubs);
this.cdr.detectChanges();
this.cdr.markForCheck();
this.appRef.tick();
this.setupIntersectionObserver();


});
}


updateView(pubs) {
console.log('pub avec etat:', this.pubs.etat);

// Filtrer les publicités avec un état
const pubsWithEtat = this.pubs.filter(publicite => publicite.etat);

// Effectuer d'autres actions nécessaires pour mettre à jour votre modèle Ionic
console.log('pub avec etat:', pubsWithEtat);

// Forcer la détection de changement
this.cdr.detectChanges();
}

async updateCountdownForAds() {
const now = new Date();

// Supposons que chaque publicité a une propriété 'date' représentant la date de début de l'événement
// et 'datefin' représentant la date de fin de l'événement

for (const pub of this.pubs) {
if (pub.date.toLowerCase().trim() === 'non' || pub.datefin.toLowerCase().trim() === 'non') {
pub.countdown = 'non';
} else {
const startDate = new Date(pub.date.trim());
const endDate = new Date(pub.datefin.trim());

if (now < startDate && startDate < endDate) {
// L'événement n'a pas encore commencé
const difference = startDate.getTime() - now.getTime();
const days = Math.floor(difference / (1000 * 60 * 60 * 24));
const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((difference % (1000 * 60)) / 1000);

pub.countdown = `${days}J - ${hours}h - ${minutes}m - ${seconds}s avant le début`;
} else if (now < endDate && startDate < endDate) {
// L'événement est en cours
const difference = endDate.getTime() - now.getTime();
const days = Math.floor(difference / (1000 * 60 * 60 * 24));
const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((difference % (1000 * 60)) / 1000);

pub.countdown =  'Événement en cours!';
}
else if ( endDate.getTime() === startDate.getTime() ) {
// La date a ete mal ajouté, la date de debut est supérieur a la date de fin
pub.countdown = 'non';
}
else if ( endDate < startDate ) {
// La date a ete mal ajouté, la date de debut est supérieur a la date de fin
pub.countdown = 'non';
}
else {
// L'événement est terminé
pub.countdown = 'Événement terminé';
}
}
}
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


CommentPub(pubs) {
this.navCtrl.navigateForward('/commentaire', { queryParams: { pubId: pubs.id } });
}


async openUrl() {
//const userLocationData = await this.getUserLocationAndCompanyId(id);
const userLocationData = await this.getUserLocation();

if (userLocationData) {

const { userLatitude, userLongitude } = userLocationData;

this.pubs.forEach(async (publi) => {
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
try {
const res = await this._apiService.loadcommentairepub(pubId).toPromise();
console.log('SUCCESS ===', res);
// Mettez à jour les commentaires avec la réponse de l'API
this.comment = res;
} catch (error) {
console.log('erreur de chargement', error);
// Gérez les erreurs de chargement de manière appropriée
}
}

// Fonction pour charger plus de commentaires (pagination)
async loadMoreComments(page: number) {
try {
// Implémentez la logique pour charger plus de commentaires depuis l'API en fonction de votre pagination
const nextPageComments = await this._apiService.loadMoreComments(this.pubId, page).toPromise();
console.log('SUCCESS loading more comments ===', nextPageComments);
// Ajoutez les nouveaux commentaires à la liste existante
this.comments = this.comments.concat(nextPageComments);
} catch (error) {
console.error('ERROR loading more comments ===', error);
// Gérez les erreurs de chargement de manière appropriée
}
}

// pour reinitialiser la variable  de decompte

// ngOnDestroy(): void {
// this.countdownSubscription.unsubscribe();
// }

startCountdown(): void {
this.countdownService.startCountdown();
this.countdownSubscription = this.countdownService.getCountdownTimer().subscribe(() => {
this.isButtonDisabled = false;
this.countdownValue = null;
});
}

async user2() {

  }


async submitComment() {

// Vérifie si un commentaire a été saisi
if (!this.newComment) {
return;
}

// verifie si l'utilisateur est bloqué ou pas
try {
  const res = await this._apiService.usersignaler2(this.iduser).toPromise();
  console.log('SUCCESS user2 ===', res);

  this.userbloquer = res;
  console.log('SUCCESS user23 ===',   this.userbloquer[0].datefinblocage);
  if (this.userbloquer.length > 0 && this.userbloquer[0].datefinblocage.trim() !== 'non') {
    const dateFinBlocage = new Date(this.userbloquer[0].datefinblocage);
    const dateFinBlocageString = dateFinBlocage.toLocaleString();
    alert('Vous avez été bloqué, vous pourrez commenter le ' + dateFinBlocageString + '. Merci de respecter les autres utilisateurs. Si vous persistez, vous pourrez être bloqué plus longtemps la prochaine fois.');
    return;
  }
}

catch (error) {
  console.log('erreur de chargement', error);
  // Gérez les erreurs de chargement de manière appropriée
  return;
  }
// Désactive le bouton et initialise le compte à rebours
this.isButtonDisabled = true;
this.countdownValue = this.countdownService.delayDuration;

const newComment = {
pubid: this.pubid,
nom: this.nom,
iduser: this.iduser,
prenom: this.prenom1,
heure: new Date().toISOString(),
commentaire: this.newComment,
};

try {
const res = await this._apiService.sendcomment(newComment).toPromise();
console.log("SUCCESS ===", res);
this.newComment = '';
this.comments.unshift(newComment);

// Réinitialise le décompte et l'état du bouton après l'envoi du commentaire
this.startCountdown();

}
catch (error) {
console.error("ERROR ===", error);
alert('Erreur : Commentaire non envoyé');
this.isButtonDisabled = false;
}
}


// Fonction pour formater l'heure de publication du commentaire
formatCommentTime(time: string): string {
const commentDate = new Date(time);
const now = new Date();
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
});

loading.present();

this._apiService.presentAlertcommentaire(id).subscribe((res:any)  => {

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
});

loading.present();

this._apiService.modifierCommentaire(this.id_comment,data).subscribe((res:any)  => {

loading.dismiss();

this.modif=false;
this.newComment ='';
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
this.newComment = commentaire.commentaire;
this.modif=true;
this.reponse=false;
}

repondre(commentaire : any): void {
  this.id_comment = commentaire.id;
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
    });

    loading.present();

  const newComment = {
// signaleur
  nomsignaleur: this.nom,
  prenomdusignaleur: this.prenom1,
  iduserdusignaleur: this.iduser,
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

//verifie si l'utilisateur avais deja signaler cet commentaire

const data = {
  iduser : this.iduser,
  idcommentaire : commentaire.id,
  pubidcommentaire : commentaire.pubid,
    };

  const result = await this._apiService.verifie(data).toPromise();
  console.log("SUCCESS ===", result);

  if (result === true) {
    loading.dismiss();
    alert('vous avez deja signalé ce commentaire, on s\'en occupe déja');
    return;
      }



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


    async repondrecommentaire() {
      // Vérifie si un commentaire a été saisi
      if (!this.newComment) {
      return;
      }
      // Désactive le bouton et initialise le compte à rebours
      this.isButtonDisabled = true;
      this.countdownValue = this.countdownService.delayDuration;

      const newComment = {
      pubid: this.pubid,
      nom: this.nom,
      iduser: this.iduser,
      prenom: this.prenom1,
      heure: new Date().toISOString(),
      commentaire: this.newComment,
      idcommentrepondu : this.id_comment,
      };

      try {
      const res = await this._apiService.repondrecommentaire(newComment).toPromise();
      console.log("SUCCESS ===", res);
      this.newComment = '';
      this.comments.unshift(newComment);

      // Réinitialise le décompte et l'état du bouton après l'envoi du commentaire
      this.startCountdown();
      this.reponse =false;
      } catch (error) {
      console.error("ERROR ===", error);
      alert('Erreur : Commentaire non envoyé');
      this.isButtonDisabled = false;
      }
      }

// pour la copie des coupons
copiercommentaire(text: string) {
const textArea = document.createElement('textarea');
textArea.value = text;
document.body.appendChild(textArea);
textArea.select();
document.execCommand('copy');
document.body.removeChild(textArea);

}



// Fonction pour fermer les options lorsque l'utilisateur clique en dehors du menu
closeOptions(event: MouseEvent): void {
  // Parcourir tous les éléments parents de l'élément cliqué
  let clickedInside = false;
  let target = event.target as HTMLElement; // Déclarer le type d'événement comme MouseEvent et caster event.target comme HTMLElement
  console.log('Clicked target:', target); // Ajout de débogage

  while (target) {
    if (target === this.commentList.nativeElement) {
      // Si l'élément cliqué est à l'intérieur de la liste de commentaires, ne fermez pas le menu
      clickedInside = true;
      break;
    }
    target = target.parentElement; // Maintenant, target.parentElement sera considéré comme HTMLElement
  }

  // Si l'élément cliqué est en dehors de la liste de commentaires, fermez le menu
  if (!clickedInside) {
    this.commentList.nativeElement.querySelectorAll('.comment-options.active').forEach(option => {
      option.classList.remove('active');
    });
  }
}


}










