import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-welcome2',
  templateUrl: './welcome2.page.html',
  styleUrls: ['./welcome2.page.scss'],
})
export class Welcome2Page implements OnInit {
  term;
  handlerMessage = '';
  roleMessage = '';

  nom:any;
   annee:any;
   responsable:any;
   contact:any;
   entreprises: any = [];
  navCtrl: any;


    constructor(public _apiService: ApiService,
      private alertController: AlertController,
      private route: ActivatedRoute,
      private router: Router,
      private loadingCtrl: LoadingController)
    {
      this.getentreprises();

    }

   addEntreprise(){
   let data = {
    annee: this.annee,
    nom: this.nom,
    responsable: this.responsable,
    contact: this.contact,

   }
   this._apiService.addentreprise(data).subscribe((res:any) => {
     //console.log("SUCCESS ===",res);

     this.annee ='';
     this.nom ='';
     this.responsable ='';
     this.contact ='';
     alert('SUCCESS');
     this.getentreprises();
   },(error: any) => {
    alert('ERROR');
    // console.log("ERROR ===",error);
   })
   }

  getentreprises(){
    this._apiService.getentreprises().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      this.entreprises = res;
     },(error: any) => {
      alert('Erreur de connection actualiser');
      //console.log("ERREUR ===",error);
  })

  }

  go(){
    this.router.navigateByUrl('/welcome');
    //this.navCtrl.setRoot('/welcome');
    window.location.reload();
  }

  refreshPage(e){
  setTimeout(() => {
    this.getentreprises();
    // console.log('Async operation has ended');
    e.target.complete();
  }, 1500);
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
            this._apiService.presentAlert(id).subscribe((res:any)  => {
              this.getentreprises();
            });
        },
        },
    ],
    });
  return alert.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      duration: 2000,
      cssClass: 'custom-loading',
    });

    loading.present();
    //this.router.navigateByUrl('/welcome')
    this.router.navigateByUrl('/acceuil');
    //this.navCtrl.setRoot('/welcome');
    this.getentreprises();
  }

  ngOnInit()
  {}

  }


