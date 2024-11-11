import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, IonContent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { CustomFilterPipe } from './custom-filter.pipe';
import { interval, Subscription } from 'rxjs';
import { WebSocketService } from '../websocket.service';
import { authService } from '../services/auth.service';
import { timeService } from '../timeservice.service';

@Component({
selector: 'app-signalement',
templateUrl: './signalement.page.html',
styleUrls: ['./signalement.page.scss'],
})
export class SignalementPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


signalement : any = [];
term2 : string ;
term : string ;
oui_terminer =  'oui';
non_terminer = 'non';
dateblocage : any;
userbloquer :any;
page : number = 1;
limit : number = 15;
oldsignalement: any;
olduser: any;
infiniteScrollDisabled: boolean = false;
private websocketSubscription: Subscription;
  signalementLoaded: boolean = false;
  search: boolean  = false;
  search2: boolean  = false;
  updateSubscription: any;
  recherche_date: boolean =false;
  endDate: string ;
  startDate: string ;
  userData: any;
  serverTime: string | number | Date;


constructor(
private route: ActivatedRoute,
private router: Router,
private _apiService : ApiService,
private loadingCtrl: LoadingController,
public loadingController: LoadingController,
private alertController: AlertController,
private cdr: ChangeDetectorRef,
private renderer: Renderer2,
private wsService: WebSocketService,
private authService: authService,
private timeService: timeService
)
{
this.loadsignalement();
this.user();
}

ngOnInit() {

// S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  this.timeService.getServerTime().subscribe((response) => {
    this.serverTime = response.serverTime;
    // console.log('serveur time', this.serverTime );
  });

  this.signalement_websocket();

           }



async refreshPage(e: any) {
  this.term = '';
  this.term2 = '';
  this.startDate = '',
  this.endDate = '',
  this.search = false;
  this.search2= false;


  // Réinitialiser les données de la page et du tableau pub
  this.page = 1;
  this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

  // Rafraîchir les pubs
  await this.loadsignalement();
  this.user();

  // Terminer l'animation de rafraîchissement
  e.target.complete();
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


async loadsignalement() {
 this.page = 1;
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
  });

  loading.present();

  localStorage.setItem('oldsignalement', JSON.stringify(this.signalement));
  this.oldsignalement = JSON.parse(localStorage.getItem('oldsignalement'));

try {
const res : any = await this._apiService.loadsignalement(this.page, this.limit).toPromise();
 //console.log('SUCCESS ===', res);

if (res && res.length < 1) {
  this.signalement = 'aucune_alerte';
  }
  else {
    this.signalement = res;
    this.signalement.selectedDateOption = false;
    this.user();
  }
  loading.dismiss();
} catch (error) {
 //console.log('erreur de chargement', error);
if (this.oldsignalement && this.oldsignalement.length > 0) {
  this.signalement =  this.oldsignalement;
}
  else { this.signalement = 'erreur_chargement'; }
}
loading.dismiss();
}


async loadsignalement_2() {
  this.page = 1;
   const loading = await this.loadingCtrl.create({
     message: 'Rechargement...',
     spinner: 'lines',
     cssClass: 'custom-loading',
   });

   loading.present();

   localStorage.setItem('oldsignalement', JSON.stringify(this.signalement));
   this.oldsignalement = JSON.parse(localStorage.getItem('oldsignalement'));

   try {
 const res : any = await this._apiService.loadsignalement(this.page, this.limit).toPromise();
  //console.log('SUCCESS ===', res);

 if (res && res.length < 1) {
   this.signalement = 'aucune_alerte';
   }
   else {
     this.syncCommandes(res) ;
     this.signalement.selectedDateOption = false;
     this.user();
   }
   loading.dismiss();
 } catch (error) {
  //console.log('erreur de chargement', error);
 if (this.oldsignalement && this.oldsignalement.length > 0) {
   this.signalement =  this.oldsignalement;
 }
   else { this.signalement = 'erreur_chargement'; }
 }
 loading.dismiss();
 }


 syncCommandes(nouvelles_signalement: any[]) {
   // Gérer l'ajout, la mise à jour et la suppression des commandes
   const updatedSignalement = [...this.signalement]; // Copie de l'ancienne liste pour comparaison

   // 1. Gérer les ajouts et les mises à jour
   nouvelles_signalement.forEach(nouvelles_signalement => {
     const index = updatedSignalement.findIndex(c => c.id === nouvelles_signalement.id);

     if (index === -1) {
       // Ajout en tête si c'est une nouvelle commande
       updatedSignalement.unshift(nouvelles_signalement);
     } else {
       // Mise à jour de la commande existante
       updatedSignalement[index] = nouvelles_signalement;
     }
   });

   // 2. Gérer les suppressions
   this.signalement = updatedSignalement.filter(signalement =>
     nouvelles_signalement.some(nouvelles_signalement => nouvelles_signalement.id === signalement.id)
   );

   // 3. Mettre à jour la liste des commandes
   if (this.signalement.length === 0) {
     this.signalement = 'aucune_alerte'; // Aucun élément dans la liste
   }
 }


async loadMore(event) {

  this.page++;

  localStorage.setItem('oldsignalement', JSON.stringify(this.signalement));
  this.oldsignalement = JSON.parse(localStorage.getItem('oldsignalement'));

  try {
    const res : any  = await this._apiService.loadsignalement(this.page, this.limit).toPromise();
   //  console.log('SUCCESS ===', res);

    this.signalement = this.signalement.concat(res);
    event.target.complete();

      // Désactiver l'infinite scroll si moins de données retournées que la limite
  if (res.length < this.limit) {
    this.infiniteScrollDisabled = true;
  }
  } catch (error) {
    // console.log('Erreur de chargement', error);
    if (this.oldsignalement && this.oldsignalement.length > 0) {
      this.signalement = this.oldsignalement;
    }
    else { this.signalement = 'erreur_chargement'; }
    event.target.complete();
  }
}


signalement_websocket() {
  this.websocketSubscription = this.wsService.listenForSignalementUpdates().subscribe(
    (message) => {
      if (Array.isArray(message)) {
        // Chargement initial des alertes
       // this.signalement = message;
        // console.log('Initial alerts loaded:', this.signalement);
      } else {
        // Traitement des actions individuelles
        switch (message.action) {
          case 'insert':
            this.signalement.unshift(message);
            console.log('New signalement inserted:', message);
            // break;
          case 'update':
            const updatedIndex = this.signalement.findIndex(signalement => signalement.id === message.old_signalement_id);
            if (updatedIndex !== -1) {
              this.signalement[updatedIndex] = message;
             //  console.log('signalement updated:', message);
             //  console.log('signalement updated:', message.old_signalement_id);
            }
            break;
          case 'delete':
            this.signalement = this.signalement.filter(signalement => signalement.id !== message.signalement_id);
           //  console.log('signalement deleted:', message);
            break;
          default:
           //  console.log('Unknown action:', message);
        }
      }
    },
    (err) => console.error('WebSocket Error:', err)
  );
}

  async traitement(signalement){

    let data = {
      traitement : 'oui',
      admin_nom : this.userData.nom,
      admin_prenom : this.userData.prenom1
    }

    this._apiService.traitement(signalement.id ,data).subscribe((res:any) => {
     //  console.log("SUCCESS ===",res);
      signalement.admin_nom = this.userData.nom;
      signalement.admin_prenom = this.userData.prenom1;
      signalement.traitement = 'oui';
      this.loadsignalement_2();
      alert(' Signalement traité !');
     },(error: any) => {
    //   console.log("Erreur de connection");
      alert(' Erreur de connection ');
    })
    }

    async terminer(signalement) {
      const alert = await this.alertController.create({
        header: 'Etes-vous sur de vouloir terminer ce signalement ?',
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

            this.traitement(signalement);

          },
          },
      ],
      });
    return alert.present();
    this.cdr.detectChanges();
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

// date fin blocage
  updateDate(event: any) {
    this.dateblocage = event.detail.value;
  }

  btn(signalement: any) {
    signalement.selectedDateOption = !signalement.selectedDateOption;
  }


   confirmer(signalement){

    let data = {
      datefinblocage : this.dateblocage,
    }

    this._apiService.confirmer(signalement.idusersignaler ,data).subscribe((res:any) => {
    //   console.log("SUCCESS ===",res);
      this.signalement.selectedDateOption  = !this.signalement.selectedDateOption;
      this.loadsignalement_2();
      alert(' blocage effectué  !');
     },(error: any) => {
     //  console.log("Erreur de connection");
      alert(' Erreur de connection ');
    })
   }

  // filtre pour affichage par catégorie
  transform(signalement: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(signalement, term, excludes);
  }


async user() {

  this.olduser = this.userbloquer;
  try {
  const res = await this._apiService.usersignaler().toPromise();
  // console.log('SUCCESS ok ===', res);

  this.userbloquer = res;

  } catch (error) {
  // console.log('erreur de chargement', error);
  this.userbloquer = this.olduser;
  }
  }

// Méthode pour trouver la date de fin de blocage correspondante à partir de l'id de l'utilisateur signalé
findDateFinBlocage(idUserSignaler: string): string {
  // Vérifiez si this.userbloquer est défini
  if (this.userbloquer) {
    // Recherchez la correspondance dans this.userbloquer
    const userBloque = this.userbloquer.find(userBloque => userBloque.id === idUserSignaler);
    // Si une correspondance est trouvée, formatez la date et retournez-la
    if (userBloque && userBloque.datefinblocage !=='non') {
      // Créez une nouvelle instance de Date à partir de la chaîne de date
      const dateFinBlocage = new Date(userBloque.datefinblocage);
      // Formatez la date en chaîne lisible
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      };
      return dateFinBlocage.toLocaleDateString('fr-FR', options);
    }
  }
  // Si this.userbloquer est undefined ou si aucune correspondance n'est trouvée, retournez une valeur par défaut
  return 'non';

}


debloquer(signalement){

  let data = {
    datefinblocage : 'non',
  }

  this._apiService.debloquer(signalement.idusersignaler ,data).subscribe((res:any) => {
    // console.log("SUCCESS ===",res);
    this.loadsignalement_2();
   alert(' deblocage effectué  !');
   },(error: any) => {
    // console.log("Erreur de connection");
    alert(' Erreur de connection ');
  })

 }


private hideButtonTimeout: any;
@ViewChild('scrollButton', { static: false }) scrollButton: ElementRef;
@ViewChild(IonContent, { static: false }) content: IonContent;


ngAfterViewInit() {
  this.addScrollListener();
  this.resetHideButtonTimer() ;
}

scrollToTop() {
  this.content.scrollToTop(500); // Utiliser la méthode scrollToTop d'Ionic
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
   //console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

  if (scrollTop >= 7000 ) {
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


search_active(event) {
  const searchTerm = event.target.value; // Obtenez la valeur de l'entrée

  if (searchTerm.trim() !== '') {
    this.search = true;
    this.load_signalement_search(event);
  }else {
    this.search = false;
    this.term = '';
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
    this.loadsignalement();
  }
}


getLoadFunction(event) {
  if (this.search2) {
    this.More_filterAlerts(event);
  } else if (this.search){
    this.load_more_search(event);
  }
  else {
    this.loadMore(event);
  }
}



async load_signalement_search(event) {
 this.page = 1;

 localStorage.setItem('oldsignalement', JSON.stringify(this.signalement));
 this.oldsignalement = JSON.parse(localStorage.getItem('oldsignalement'));

  try {
    const res : any = await this._apiService.load_signalement_search(this.term, this.page, this.limit).toPromise();
   //  console.log('SUCCESS ===', res);

    if (res && res.length < 1) {
      this.signalement = 'aucune_alerte';
    }
    else {
       this.signalement = res;
    }

    } catch (error) {
    if (this.oldsignalement && this.oldsignalement.length > 0) {
      this.signalement = this.oldsignalement;
    }
    else { this.signalement = 'erreur_chargement'; }
    // console.log('Erreur de chargement', error);
  }
}


async load_more_search(event) {
  this.page++;

  localStorage.setItem('oldsignalement', JSON.stringify(this.signalement));
  this.oldsignalement = JSON.parse(localStorage.getItem('oldsignalement'));

  try {
    const res : any  = await this._apiService.load_signalement_search(this.term, this.page, this.limit).toPromise();
    // console.log('SUCCESS ===', res);

    this.signalement = this.signalement.concat(res);
    event.target.complete();

      // Désactiver l'infinite scroll si moins de données retournées que la limite
  if (res.length < this.limit) {
    this.infiniteScrollDisabled = true;
    this.search = false ;
  }
  } catch (error) {
    // console.log('Erreur de chargement', error);
    if (this.oldsignalement && this.oldsignalement.length > 0) {
      this.signalement = this.oldsignalement;
    }
    else { this.signalement = 'erreur_chargement'; }
    event.target.complete();
  }
}


date() {
  this.recherche_date = !this.recherche_date;
}

choisir_date(){
  this.recherche_date = !this.recherche_date;
  this.filterAlerts();
}
annuler_date(){
  this.recherche_date = false;
}

updateDateFin(event: CustomEvent) {
  this.endDate = event.detail.value;
  // Vérifier que la date de fin est supérieure à la date de début
  if (this.startDate && this.endDate < this.startDate) {
    // Afficher une alerte ou gérer l'erreur comme vous le souhaitez
    alert('La date de fin doit être supérieure à la date de début');
    this.endDate = this.startDate;
  }
}



filterAlerts() {
  if (this.term2 !== '' || (this.startDate !== '' && this.endDate !== '') ) {
    this.search2= true;
    this.infiniteScrollDisabled = false;
    this.filterAlerts2();
  }

}


async filterAlerts2() {
  this.page = 1;
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
  });

  await loading.present();

  try {
    const res: any = await this._apiService.loadsignalement_search_all(
      this.startDate || '',
      this.endDate || '',
      this.term2 || '',
      this.page,
      this.limit
    ).toPromise();


    if (res && res.length > 0) {
      this.signalement = res;
    } else {
      this.signalement = 'aucune_alerte';
    }
  } catch (error) {
    console.error('Erreur de chargement', error);

    if (this.oldsignalement && this.oldsignalement.length > 0) {
      this.signalement = this.oldsignalement;
    } else {
      this.signalement = 'erreur_chargement';
    }
  } finally {
    loading.dismiss();
  }
}


async More_filterAlerts(event) {

  this.page++;

  localStorage.setItem('oldsignalement', JSON.stringify(this.signalement));
  this.oldsignalement = JSON.parse(localStorage.getItem('oldsignalement'));

  try {
    const res: any = await this._apiService.loadsignalement_search_all(
      this.startDate || '',
      this.endDate || '',
      this.term2 || '',
      this.page,
      this.limit
    ).toPromise();

   //  console.log('SUCCESS ===', res);

    this.signalement = this.signalement.concat(res);
    event.target.complete();

      // Désactiver l'infinite scroll si moins de données retournées que la limite
  if (res.length < this.limit) {
    this.infiniteScrollDisabled = true;
    this.search2 = false;
  }
  } catch (error) {
    // console.log('Erreur de chargement', error);
    if (this.oldsignalement && this.oldsignalement.length > 0) {
      this.signalement = this.oldsignalement;
    }
    else { this.signalement = 'erreur_chargement'; }
    event.target.complete();
  }
}

}
