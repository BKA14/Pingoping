import { CommentaireService } from './CommentaireService';
import { ListeUserPage } from './../liste-user/liste-user.page';
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
import { filter } from 'rxjs/operators';
import { Subscription, fromEvent, interval } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';




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
   pubs: any = [];
   etats: any = [];
   etats1: any = [];
   etatpub: any = [];
   pubvideo: any = [];
    navCtrl: any;

    etatid: any;
    pubid:any;
    idpub: any;

    isLiked = false;
    public countdown: string;



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
      private ngZone: NgZone
      )
    {
      this.getpub();
      this.getUserLocation();
      this.getcategorie();
      this.getsessionuser();
      this.getetat();
      this.pub2();
      this.getpub();

    }

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



    handleVideoClick(videoElement: ElementRef) {

      const video = videoElement.nativeElement as HTMLVideoElement;
     // this.toggleVideo(video);
      console.log('Video clicked!');

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
      this.getcategorie();
      this.getsessionuser();
      this.getetat();
      this.pub2();
      this.getpub();

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

    async ngOnInit() {
       //this.reloadPage();
      this.updateCountdownForAds() ;

      this.setupIntersectionObserver();
      // Mettez à jour le compte à rebours chaque seconde
      setInterval(() => {
       this.updateCountdownForAds() ;

       // this.openUrl() ;
      }, 1000);
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

     alert('Erreur de connection  nouveau etat non enregistre');
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
      this.pub2();
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
  this.cdr.detectChanges();

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
  this.getsession1();
  this.cdr.detectChanges();

  }


  refreshPage(e){
  setTimeout(() => {
    this.getpub();
    this.pub2();
    this.getpubvideo();
    this.getUserLocation();
    this.cdr.detectChanges();
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
        this.cdr.detectChanges();
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
         this.cdr.detectChanges();
        });

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
   this.cdr.detectChanges();
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
     this.cdr.detectChanges();
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
  this.cdr.detectChanges();
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
  this.cdr.detectChanges();
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
    // Conversion de mètres en kilomètres
    const kilometers = meters / 1000;

      // Formattage du résultat
      const formattedDistance = kilometers.toLocaleString('en-US', {
        maximumFractionDigits: 0,
      });

    return `${formattedDistance} km`;
  }



}
