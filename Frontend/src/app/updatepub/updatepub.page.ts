import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-updatepub',
  templateUrl: './updatepub.page.html',
  styleUrls: ['./updatepub.page.scss'],
})
export class UpdatepubPage implements OnInit {
  verifieForm: FormGroup;



  id:any;
  annee_entreprise:any;
  titre:any;
  commentaire:any;
  photo:any;
  bouton: any;
  contact: any;
  longitude: any;
  latitude: any;
  rangpub: any;
  entreprises: any = [];


  constructor(
   private route: ActivatedRoute,
   private router: Router,
   private _apiService : ApiService,
   private loadingCtrl: LoadingController,
   public loadingController: LoadingController
 ) {
  this.route.params.subscribe((param:any) => {
    this.id = param.id;
    console.log(this.id);
    this.getpub2(this.id);
  })

   }


   async addpub(){
     let data = {
      id: this.id,
      titre: this.titre,
      commentaire: this.commentaire,
      photo: this.photo,
      bouton:this.bouton,
      rangpub: this.rangpub,
     }

     const loading = await this.loadingCtrl.create({
       message: 'Rechargement...',
      spinner:'lines',
     // showBackdrop:false,
       cssClass: 'custom-loading',
     });
     loading.present();

     this._apiService.addpub(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
       this.id ='';
       this.titre ='';
       this.commentaire ='';
       this.photo ='';
       this.bouton ='';
       this.rangpub ='';
       //window.location.reload();
       loading.dismiss();
       this.router.navigateByUrl('/acceuil');
       alert('pub ajoute avec success');
     },(error: any) => {
       loading.dismiss();
      alert('Erreur de connection pub non enregistre');
      console.log("ERROR ===",error);
     })
    }

    getentreprises(){
     this._apiService.getentreprises().subscribe((res:any) => {

       console.log("SUCCESS ===",res);


      },(error: any) => {
      alert('Erreur de connection avec le serveur veillez reessayer');
      //this.navCtrl.setRoot('/welcome2');
      this.router.navigateByUrl('/welcome2');
      // console.log("ERREUR ===",error);
   })
   }

   refreshPage(e){
    setTimeout(() => {
      this.getpub2(this.id);
      console.log('rafraichissement de la page');
      e.target.complete();
    },500);
    }


  getpub2 (id){
    this._apiService.getpub2(id).subscribe((res:any) => {
      console.log("SUCCESS ===",res);

      let pub = res[0];
      this.id = pub.id;
      this.titre = pub.titre;
      this.commentaire = pub.commentaire;
      this.photo = pub.photo;
      this.bouton = pub.bouton;
      this.rangpub = pub.rangpub;
      this.contact = pub.contact;
      this.longitude = pub.longitude;
      this.latitude = pub.latitude;

     },(error: any) => {
      console.log("Erreur de connection",error);
  })
}



   async updatepub(){

    let data = {
        id: this.id,
        titre: this.titre,
        commentaire: this.commentaire,
        photo: this.photo,
        bouton:this.bouton,
        rangpub:this.rangpub,
        contact: this.contact,
        longitude: this.longitude,
        latitude: this.latitude,
               }

  const loading = await this.loadingCtrl.create({
    message: 'Rechargement...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });

  loading.present();
  this._apiService.updatepub(this.id,data).subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    //this.getentreprisee(this.id);

    loading.dismiss();
    this.router.navigateByUrl('/acceuil');
   },(error: any) => {
    console.log("Erreur de connection",error);
    loading.dismiss();
  })
  }


 async showLoading() {
   const loading = await this.loadingCtrl.create({
     message: 'Rechargement...',
     duration: 1500,
     cssClass: 'custom-loading',
   });

   loading.present();
   this.addpub();
   this.updatepub();
   //this.router.navigateByUrl('/welcome')
   this.router.navigateByUrl('/welcome');
   //this.navCtrl.setRoot('/welcome');
 }




 ngOnInit() {

   this.verifieForm = new FormGroup({


   titre: new FormControl('', [
     Validators.required,
     Validators.minLength(2),
   ]),

       commentaire: new FormControl('', [
         Validators.required,
         Validators.minLength(2),
       ]),

       photo: new FormControl('', [
         Validators.required,
         Validators.minLength(2),
       ]),

       bouton: new FormControl('', [
         Validators.required,

       ]),

       rangpub: new FormControl('', [


      ]),

      contact: new FormControl('', [

      ]),

      longitude: new FormControl('', [

      ]),

      latitude: new FormControl('', [

      ]),

   });


 }

 }


