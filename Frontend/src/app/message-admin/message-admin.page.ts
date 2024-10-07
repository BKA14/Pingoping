import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IonContent, IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { authService } from '../services/auth.service';
import { CustomFilterPipe } from './custom-filter.pipe';



@Component({
  selector: 'app-message-admin',
  templateUrl: './message-admin.page.html',
  styleUrls: ['./message-admin.page.scss'],
})
export class MessageAdminPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  infiniteScrollDisabled: boolean = false;


  message : any;
  page: number = 1;
  limit: number = 12;
  duration = 2000;
  term: any;
  search: boolean = false;
  userData: any;
  oldmessage: any;
  statutFilter: string;

  constructor(
    private router: Router,
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
    private authService: authService,
    private toastCtrl: ToastController,
    private renderer: Renderer2,

  ) {

    }

  ngOnInit() {

      // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

    this.getmessage()
  }


      // Méthode pour afficher un toast
      async presentToast(message: string, color: string = 'danger') {
        const toast = await this.toastCtrl.create({
          message: message,
          duration: this.duration, // Durée d'affichage du toast
          position: 'middle',
          color: color,
        });
        toast.present();
        }



  async refreshPage(e: any) {

    // Réinitialiser les données de la page et du tableau pub
    this.page = 1;
    this.term='';
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll

    // Rafraîchir les pubs
    await this.getmessage();

    // Terminer l'animation de rafraîchissement
    e.target.complete();
  }



  async getmessage(){

    this.page = 1;
    this.oldmessage = this.message;

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner:'lines',
      cssClass: 'custom-loading',
    });

    loading.present();

    this._apiService.getmessage(this.page, this.limit).subscribe((res:any) => {

      console.log("SUCCESS ===",res);

      if (res && res.length < 1) {
        this.message = 'aucune_alerte';
      }
      else {
         this.message = res;
      }

      loading.dismiss();

     },(error: any) => {


      if (this.oldmessage && this.oldmessage.length > 0) {
        this.message = this.oldmessage;
      }
      else { this.message = 'erreur_chargement'; }
      loading.dismiss();

      this.presentToast('Erreur de chargement','success');

  })
  }

  async getmessage_2(){

    this.page = 1;


    this._apiService.getmessage(this.page, this.limit).subscribe((res:any) => {

      console.log("SUCCESS ===",res);
      this.message = res;

     },(error: any) => {
      this.presentToast('Erreur de chargement','success');

      console.log("Erreur de connection ===",error);
  })

  }



  async loadMore(event) {

    this.page++;
    this.oldmessage = this.message;

    try {
      const res : any  = await this._apiService.getmessage(this.page, this.limit).toPromise();
      console.log('SUCCESS ===', res);

      this.message = this.message.concat(res);
      event.target.complete();

        // Désactiver l'infinite scroll si moins de données retournées que la limite
    if (res.length < this.limit) {
      this.infiniteScrollDisabled = true;
    }
    } catch (error) {
      console.log('Erreur de chargement', error);
      if (this.oldmessage && this.oldmessage.length > 0) {
        this.message = this.oldmessage;
      }
      else { this.message = 'erreur_chargement'; }
      event.target.complete();
    }
  }


async marquer_lu(message) {

  let data = {
   lu : 'oui'
  }
  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner:'lines',
    cssClass: 'custom-loading',
  });

  loading.present();

  try {
    const res : any = await this._apiService.marquer_lu_message(message.id,data).toPromise();
    console.log("SUCCESS ===", res);

    this.getmessage_2();

    this.presentToast('effectué','success');
    loading.dismiss();

      } catch (error) {
        console.error("ERROR ===", error);

        this.presentToast('erreur non effectué');

        loading.dismiss();
      }
}



getLoadFunction(event) {

  if (this.search){
      this.load_more_search(event);
    }
    else {
      this.loadMore(event);
    }
  }


onSearch(event: any) {
  // La valeur actuelle du champ de recherche
  const term = event.target.value;

  // Vérifier si l'utilisateur a tapé quelque chose
  if (term && term.trim() !== '') {
    this.search = true;
    this.term = term;
    this.load_search(event); // Appeler la fonction de recherche
  } else
  {
       this.search = false; // Réinitialiser la recherche si le champ est vide
       this.term = '';
       this.page = 1;
       this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
       this.getmessage();

  }
}

filterByStatus(statut: string) {
  this.statutFilter = statut;

  // Si le statut est "toutes", réinitialiser la recherche et charger toutes les commandes
  if (this.statutFilter === 'toutes') {
    this.term = ''; // Réinitialiser le terme de recherche
    this.search = false;
    this.page = 1;
    this.infiniteScrollDisabled = false; // Réactiver l'infinite scroll
    this.getmessage(); // Recharger toutes les commandes
  } else {
    this.term = this.statutFilter; // Mettre à jour le terme de recherche avec le statut sélectionné
    this.search = true;
    this.load_search(event); // Appliquer la recherche sur le statut sélectionné
  }
}



async load_search(event) {

   this.page = 1;
   this.oldmessage = this.message;

   try {
     const res : any = await this._apiService.load_message_search(this.term, this.page, this.limit).toPromise();
     console.log('SUCCESS ===', res);

     if (res && res.length < 1) {
       this.message = 'aucune_alerte';
     }
     else {
        this.message = res;
     }

     } catch (error) {
     if (this.oldmessage && this.oldmessage.length > 0) {
       this.message = this.oldmessage;
     }
     else { this.message = 'erreur_chargement'; }
     console.log('Erreur de chargement', error);
   }

 }


 async load_more_search(event) {
   this.page++;
   this.oldmessage = this.message;
   try {
     const res : any  = await this._apiService.load_message_search(this.term, this.page, this.limit).toPromise();
     console.log('SUCCESS ===', res);

     this.message = this.message.concat(res);
     event.target.complete();

       // Désactiver l'infinite scroll si moins de données retournées que la limite
   if (res.length < this.limit) {
     this.infiniteScrollDisabled = true;
     this.search = false ;
   }
   } catch (error) {
     console.log('Erreur de chargement', error);
     if (this.oldmessage && this.oldmessage.length > 0) {
       this.message = this.oldmessage;
     }
     else { this.message = 'erreur_chargement'; }
     event.target.complete();
   }
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
  console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

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

}
