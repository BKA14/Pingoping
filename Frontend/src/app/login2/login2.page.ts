import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
 prenom1:any;
 iduser: any;
 numuser: any;
 idpub: any;

  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController
  ) { }


  login2() {

    this.router.navigateByUrl('/welcome2');

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

    this._apiService.login(data).subscribe((res:any) => {
      loading.dismiss();
      this.grade=res;
     if (res==='utilisateur')
     {
      this.getlogin();
      this.router.navigateByUrl('/acceuil');
     }
      if (res==='admin')
     {
      this.getlogin();
      this.router.navigateByUrl('/acceuil');
     }
     if (res==='superadmin')
     {
      this.getlogin();
      this.router.navigateByUrl('/acceuil');
     }
     if (res===0)
     {

      alert('Erreur email ou mot de passe incorrect');
      this.router.navigateByUrl('/login2');

    }

    this.setsession();
    this.setsession1();

    }
    ,(error: any) => {
      loading.dismiss();
      alert('Erreur de connexion avec le serveur, veuillez réessayer ou contactez nous ! : ' + error.error); // Afficher le message d'erreur de l'objet error
     console.log("ERROR ===",error);
    })

   }


   getlogin(){
    let data = {
      email: this.email_entreprise,
      password: this.password_entreprise,
               }
      this._apiService.getlogin(data).subscribe((res:any) => {
      let rep =res[0];
      console.log("SUCCESSEE ===",res);
      console.log("SUCCESSEE ===",rep.prenom);
      this.prenom1=rep.prenom;
      this.iduser=rep.id;
      console.log("ERROR iduser1 ===",rep.id);
      this.numuser=rep.contact;

      localStorage.setItem('prenom1',this.prenom1);
      localStorage.setItem('iduser',this.iduser);
      console.log("ERROR iduser2 ===",this.iduser);
      localStorage.setItem('numuser',this.numuser);
      localStorage.setItem('idpub',this.idpub);

      console.log(this.prenom1);
     },(error: any) => {
     alert('Erreur de connection avec le serveur veillez reessayer');
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



  ngOnInit() {

    this.verifieForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
  ]),
    password: new FormControl('', [
      Validators.minLength(8),
    Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[a-zA-Z0-9@$!%*?&#]+$')
        ]),

    });

  }

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;
  }
}
