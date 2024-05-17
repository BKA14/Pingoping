import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {
  verifieForm: FormGroup;

showPassword = false;
email_entreprise:any;
 password_entreprise: any;
 grade:any;
 nom:any;
 prenom1:any;
 iduser: any;
 numuser: any;
 idpub: any;

  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private platform: Platform
  ) {

    this.verifieForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
//Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)'  // pour le mot de passe avec majuscule, minuscule et caractére
   }


  login2() {

    this.router.navigateByUrl('/welcome2');

  }

  async login(){


    this.grade =  localStorage.getItem('grade');
    this.iduser =  localStorage.getItem('iduser');
    this.numuser = localStorage.getItem('numuser');
    this.prenom1 = localStorage.getItem('prenom1')


    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    if (    this.grade !== undefined && this.grade !== null &&
      this.prenom1 !== undefined && this.prenom1 !== null &&
      this.numuser !== undefined && this.numuser !== null &&
      this.iduser !== undefined && this.iduser !== null &&
      this.grade !== '' && this.prenom1 !== '' &&
      this.numuser !== '' && this.iduser !== ''
     ) {

    if (this.grade ==='utilisateur')
    {

     this.router.navigateByUrl('/acceuil');
    }
     else if (this.grade ==='admin')
    {

     this.router.navigateByUrl('/acceuil');
    }
     else if (this.grade ==='superadmin')
    {

     this.router.navigateByUrl('/acceuil');
    }

  }

  loading.dismiss();


  }

  async login4(){

    let data = {
      email: this.email_entreprise,
      password: this.password_entreprise,
    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.login(data).subscribe(async (res:any) => {

      this.grade=res;
     if (res==='utilisateur')
     {
      await this.getlogin();
      this.router.navigateByUrl('/acceuil');
     }
      if (res==='admin')
     {
      await this.getlogin();
      this.router.navigateByUrl('/acceuil');
     }
     if (res==='superadmin')
     {
      console.log("ERROR ===  essaie 1" );
      await this.getlogin();
      this.router.navigateByUrl('/acceuil');
     }
     if (res===0)
     {
      alert('Erreur email ou mot de passe incorrect');
      this.router.navigateByUrl('/login2');
    }
    else  console.log("ERROR === essaie 2");
    loading.dismiss();
    await this.setsession();
    await this.setsession1();

    }
    ,(error: any) => {
      loading.dismiss();
      alert('Erreur de connexion avec le serveur, veuillez réessayer ou contactez nous ! '); // Afficher le message d'erreur de l'objet error
     console.log("ERROR ===",error);
    })

   }


   async getlogin(){
    let data = {
      email: this.email_entreprise,
      password: this.password_entreprise,
               }
    await  this._apiService.getlogin(data).subscribe((res:any) => {
      let rep =res[0];
      console.log("SUCCESSEE ===",res);
      console.log("SUCCESSEE ===",rep.prenom);
      this.prenom1=rep.prenom;
      this.nom=rep.nom;
      this.iduser=rep.id;
      console.log("ERROR iduser1 ===",rep.id);
      this.numuser=rep.contact;

      localStorage.setItem('nom',this.nom);
      localStorage.setItem('prenom1',this.prenom1);
      localStorage.setItem('iduser',this.iduser);
      console.log("ERROR iduser2 ===",this.iduser);
      localStorage.setItem('numuser',this.numuser);
      localStorage.setItem('idpub',this.idpub);

      console.log(this.prenom1);
      console.log(this.nom);
     },(error: any) => {
     console.log('Erreur de connection avec le serveur veillez reessayer');
  })
  }

   setsession(){
    localStorage.setItem('grade',this.grade);
    console.log(this.grade);
    }

    setsession1(){
     // localStorage.setItem('prenom1',this.prenom1)
      console.log(this.prenom1);
      }

      setsessionid(){

         console.log(this.iduser);
         }
         setsessioncontact(){

           console.log(this.numuser);
           }

           setsessionidpub(){

             console.log(this.idpub);

             }


  ionViewWillEnter() {

  this.login();

  }


  async ngOnInit() {


  }

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;
  }

 /* IonViewWillLeave est déclenché lorsque la page est sur le point de quitter l'écran.
     Dans cette fonction, nous empêchons la navigation arrière en redirigeant l'utilisateur vers login2. */
  /* ionViewWillLeave() {
    this.preventBackNavigation();
  } */

  // Empêche la navigation arrière en redirigeant l'utilisateur vers login2
  /* preventBackNavigation() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.router.navigate(['/login2']);
    });
  } */

}
