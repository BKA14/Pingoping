import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authService } from '../services/auth.service';


@Component({
  selector: 'app-pmu',
  templateUrl: './pmu.page.html',
  styleUrls: ['./pmu.page.scss'],
})
export class PmuPage implements OnInit {


  id: any;
  commentaire1:any;
  numdujour: any;
  num2:any;
  commentaire2:any;
  nbrpartant:any;
  typecourse:any;
  pmu: any = [];
  grade: any;

  verifieForm: FormGroup;
  userData: any;
  isEditingCommentaire1 = false;
  isEditingNum2 = false;
  isEditingNbrpartant = false;
  isEditingTypecourse = false;
  isEditingNumdujour = false;
  isEditingCommentaire2 = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService : ApiService,
    private loadingCtrl: LoadingController,
    public loadingController: LoadingController,
    private authService: authService,
  )
   {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      // console.log(this.id);
      this.getpmu();
    })
  }


  ngOnInit() {

  // S'abonner aux changements de données utilisateur
  this.authService.userData$.subscribe(data => {
    this.userData = data;
  });

  this.getsession();

  this.verifieForm = new FormGroup({
    commentaire1: new FormControl(this.pmu?.commentaire1, [Validators.required]),
    numdujour: new FormControl(this.pmu?.numdujour, [Validators.required]),
    num2: new FormControl(this.pmu?.num2, [Validators.required]),
    commentaire2: new FormControl(this.pmu?.commentaire2, [Validators.required]),
    nbrpartant: new FormControl(this.pmu?.nbrpartant, [Validators.required]),
    typecourse: new FormControl(this.pmu?.typecourse, [Validators.required])
  });

      }


  getsession(){

    this.grade= (localStorage.getItem('grade'));

     }


    refreshPage(e){

    setTimeout(() => {
      this.getpmu();

      // console.log('rafraichissement de la page');
      e.target.complete();
    },500);

    }


  async getpmu(){

  const loading = await this.loadingCtrl.create({
   message:'Chargement...',
   spinner:'lines',
   duration:10000,
   cssClass:'custom-loading',
  });

  loading.present();

  this._apiService.getpmu().subscribe((res: any) => {
    loading.dismiss();
    // console.log("SUCCESS ===", res);
    this.pmu = res[0];

    // Update form with API data
    this.verifieForm.patchValue({
      commentaire1: this.pmu.commentaire1,
      numdujour: this.pmu.numdujour,
      num2: this.pmu.num2,
      commentaire2: this.pmu.commentaire2,
      nbrpartant: this.pmu.nbrpartant,
      typecourse: this.pmu.typecourse
    });

    // console.log('comment', this.pmu.commentaire1);

  }, (error: any) => {
    loading.dismiss();
    // console.log("Erreur de connection ===", error);
    // Add user-friendly error message here
  });

  }


resetEditing() {

  this.isEditingCommentaire1 = false;
  this.isEditingCommentaire2 = false;
  this.isEditingNum2 = false;

  this.isEditingNbrpartant = false;
  this.isEditingTypecourse = false;
  this.isEditingNumdujour = false;

}


editField(field: string) {

  this.resetEditing();
  switch(field) {
    case 'commentaire1':
      this.isEditingCommentaire1 = true;
      break;
    case 'commentaire2':
      this.isEditingCommentaire2 = true;
      break;
    case 'num2':
      this.isEditingNum2 = true;
      break;

    case 'nbrpartant':
      this.isEditingNbrpartant = true;
      break;
    case 'typecourse':
      this.isEditingTypecourse = true;
      break;
    case 'numdujour':
      this.isEditingNumdujour = true;
      break;
  }
}

async modifier() {
  if (this.verifieForm.invalid) {
    // Display a message or alert indicating form is invalid
    return;
  }

  let data = {
    commentaire1: this.verifieForm.get('commentaire1').value,
    numdujour: this.verifieForm.get('numdujour').value,
    num2: this.verifieForm.get('num2').value,
    commentaire2: this.verifieForm.get('commentaire2').value,
    nbrpartant: this.verifieForm.get('nbrpartant').value,
    typecourse: this.verifieForm.get('typecourse').value
  };


  this.loadingCtrl.create({
    message: 'Rechargement...',
    spinner: 'lines',
    cssClass: 'custom-loading',
  }).then(loading => {
    loading.present();

    this._apiService.updatepmu(this.userData.iduser, data).subscribe(
      (res: any) => {
        loading.dismiss();
       //  console.log("SUCCESS ===", res);
        this.getpmu();
      },
      (error: any) => {
        loading.dismiss();
        console.error("Erreur de connection", error);
        // Display user-friendly error message
      }
    );
  });

  this.resetEditing();
}


}
