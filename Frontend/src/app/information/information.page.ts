import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authService } from '../services/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  info: any;
  verifieForm: FormGroup;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    public _apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private cdr: ChangeDetectorRef,
    private authService: authService,
  ) {
    this.getinfo();
  }

  isEditingNom = false;
  isEditingPrenom = false;
  isEditingEmail = false;

  ngOnInit() {

      // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

    this.verifieForm = new FormGroup({
      nom: new FormControl(this.info?.nom, [
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.required,
      ]),
      prenom: new FormControl(this.info?.prenom, [
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.maxLength(65),
        //Validators.minLength(6),
      // Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
    ]),
    });
  }

  editField(field: string) {
    this.resetEditing();
    switch(field) {
      case 'nom':
        this.isEditingNom = true;
        break;
      case 'prenom':
        this.isEditingPrenom = true;
        break;
        case 'email':
        this.isEditingEmail = true;
        break;
    }
  }

  resetEditing() {
    this.isEditingNom = false;
    this.isEditingPrenom = false;
    this.isEditingEmail = false;

  }


  async modifier() {
    // Sauvegardez les changements
    let data = {
      id: this.userData.iduser,
      nom: this.verifieForm.get('nom').value,
      prenom: this.verifieForm.get('prenom').value,
      contact: this.info.contact,
      email:  this.verifieForm.get('email').value,
    };

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    loading.present();
    this._apiService.updateinfo(this.userData.iduser, data).subscribe((res: any) => {
      loading.dismiss();
      console.log("SUCCESS ===", res);
      alert('modification effectué');
      this.getinfo();
    }, (error: any) => {
      loading.dismiss();
      console.log("Erreur de connection", error);
      alert('Erreur veuillez reesayer');

    });

    this.resetEditing();
  }



  userinfo() {
    this.router.navigateByUrl('/information');
  }

  apropos() {
    this.router.navigateByUrl('/apropos');
  }

  refreshPage(e) {
    setTimeout(() => {
      this.getinfo();
      console.log('Rafraichissement de la page');
      e.target.complete();
    }, 500);
  }

  async getinfo() {
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    loading.present();

    this._apiService.getinfo(this.userData.iduser).subscribe((res: any) => {
      console.log("SUCCESS ==", res);
      this.info = res[0];
      this.verifieForm.patchValue({
        nom: this.info?.nom,
        prenom: this.info?.prenom,
        email: this.info?.email,
      });
      loading.dismiss();
    }, (error: any) => {
      console.log('Erreur de connection avec le serveur veillez reessayer');
      loading.dismiss();
    });

    this.cdr.detectChanges();
  }
}
