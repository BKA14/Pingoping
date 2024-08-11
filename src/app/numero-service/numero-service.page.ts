import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CustomFilterPipe } from './custom-filter.pipe';

@Component({
  selector: 'app-numero-service',
  templateUrl: './numero-service.page.html',
  styleUrls: ['./numero-service.page.scss'],
})
export class NumeroServicePage implements OnInit {
  number: any;
  grade: any;
  prenom1: string;
  iduser: string;
  numuser: string;
  idpub: string;
  term: any;

  constructor(
    private http: HttpClient,
    private _apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private callNumber: CallNumber,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    setInterval(() => {

      this.numero() ;
       this.cdr.detectChanges(); // Détecter et appliquer les changements

      // this.openUrl() ;
       }, 5000);
     this.numero() ;
     this.getsessionuser();
  }


  getsessionuser(){

    this.prenom1= (localStorage.getItem('prenom1'));
    console.log(this.prenom1);

    this.grade= (localStorage.getItem('grade'));
    console.log(this.grade);

    this.iduser= (localStorage.getItem('iduser'));
    console.log(this.iduser);

    this.numuser= (localStorage.getItem('numuser'));
    console.log(this.numuser);

    this.idpub= (localStorage.getItem('idpub'));
    console.log(this.numuser);

     }


  async numero() {
    try {
    const res = await this._apiService.numero_service().toPromise();
    console.log('SUCCESS ===', res);

    this.number = res;

    } catch (error) {
    console.log('erreur de chargement', error);
    // Gérez les erreurs de chargement de manière appropriée
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
      this.cdr.detectChanges();
      }


      async supprimer(number){

        const loading = await this.loadingCtrl.create({
          message: 'Rechargement...',
         spinner:'lines',
        // showBackdrop:false,
          cssClass: 'custom-loading',
        });

        loading.present();

      this._apiService.supprimer_numero(number.id).subscribe((res:any)  => {

        loading.dismiss();

        this.numero() ;

      },(error: any) => {
        loading.dismiss();
        alert('Erreur de connection avec le serveur veillez reessayer');

     })
     this.cdr.detectChanges();

      }

        // filtre pour affichage par catégorie
  transform(number: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(number, term, excludes);
  }


}
