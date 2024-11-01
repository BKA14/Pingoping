import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.page.html',
  styleUrls: ['./livraison.page.scss'],
})
export class LivraisonPage implements OnInit {


  number: any;
  grade: any;
  prenom1: string;
  iduser: string;
  numuser: string;
  idpub: string;
  term: any;
  oldnumber: any;
  search: boolean = false;


  constructor(
    private http: HttpClient,
    private _apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private callNumber: CallNumber,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {


    }


  ngOnInit() {

     this.getsessionuser();

     this.numero() ;
     this.cdr.detectChanges(); // Détecter et appliquer les changements
  }


  getsessionuser(){

    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);

     }


    async numero() {

      const loading = await this.loadingCtrl.create({
        message: 'Rechargement...',
        spinner: 'lines',
        cssClass: 'custom-loading',
        duration: 10000,
      });

      this.oldnumber = this.number;

      try {
      const res : any = await this._apiService.numero_livraison().toPromise();
      console.log('SUCCESS ===', res);

      if (res && res.length < 1) {
        this.number = 'aucune_alerte';
      } else {
        this.number =  res;
      }

      loading.dismiss();

      } catch (error) {
      console.log('erreur de chargement', error);
      if (this.oldnumber && this.oldnumber.length > 0) {
        this.number = this.oldnumber;
      }
      else { this.number = 'erreur_chargement'; }
      console.log('Erreur de chargement', error);
      loading.dismiss();
    }

      }


    appeler(numero: string) {
      this.callNumber.callNumber(numero, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }


      refreshPage(e: any) {
        this.numero();
        // Log pour indiquer le rafraîchissement
        console.log('Rafraîchissement de la page');
        // Terminer l'animation de rafraîchissement
        e.target.complete();
      }


      async presentAlert(id) {
        const alert = await this.alertController.create({
          header: 'Etes-vous sur de vouloir supprimer ce numero ?',
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


      async supprimer(number){

        const loading = await this.loadingCtrl.create({
          message: 'Rechargement...',
         spinner:'lines',
        // showBackdrop:false,
          cssClass: 'custom-loading',
        });

        loading.present();

      this._apiService.supprimer_num_livraison(number.id).subscribe((res:any)  => {

        loading.dismiss();

        this.numero() ;

      },(error: any) => {
        loading.dismiss();
        alert('Erreur de connection avec le serveur veillez reessayer');

     })
     this.cdr.detectChanges();

      }

}
