// authentication.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

nom:any;
prenom1:any;
iduser: any;
numuser: any;
grade: any;

constructor(private router: Router,
  private loadingCtrl: LoadingController,
  public loadingController: LoadingController,
)
{
  this.getsession();
}

  async ngOnInit() {
 await this.getsession();
}


async getsession(){
  const loading = await this.loadingCtrl.create({
    message: 'kevin ...',
   spinner:'lines',
  // showBackdrop:false,
    cssClass: 'custom-loading',
  });

  //loading.present();

this.grade= (localStorage.getItem('grade'));
console.log(this.grade);

this.prenom1= (localStorage.getItem('prenom1'));
console.log(this.prenom1);

this.iduser= (localStorage.getItem('iduser'));
console.log(this.iduser);

this.numuser= (localStorage.getItem('numuser'));
console.log(this.numuser);

//loading.dismiss();
  }


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent' // Vous pouvez choisir différents types de spinner : "bubbles", "circles", "crescent", etc.
    });

    await loading.present();

    if (this.grade && this.prenom1 && this.numuser && this.iduser) {
      // Arrêter le spinner
      await loading.dismiss();
      return true;
    } else {
      // Arrêter le spinner
      await loading.dismiss();
      this.router.navigate(['/login2']);
      return false;
    }
  }


}
