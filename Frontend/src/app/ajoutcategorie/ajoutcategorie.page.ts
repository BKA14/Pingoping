import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-ajoutcategorie',
  templateUrl: './ajoutcategorie.page.html',
  styleUrls: ['./ajoutcategorie.page.scss'],
})
export class AjoutcategoriePage implements OnInit {

  verifieForm: FormGroup;

  id:any;
 nomcategorie:any;
 
 entreprises: any = [];


 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private _apiService : ApiService,
  private loadingCtrl: LoadingController,
  public loadingController: LoadingController
) { 

  }

  async addcategorie(){
    let data = {
     nomcategorie: this.nomcategorie,
   
    }

    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
     spinner:'lines',
    // showBackdrop:false,
      cssClass: 'custom-loading',
    });
    loading.present();

    this._apiService.addcategorie(data).subscribe((res:any) => {
     console.log("SUCCESS ===",res);
      this.nomcategorie ='';
      //window.location.reload();
      loading.dismiss();
      this.router.navigateByUrl('/categorie');
      alert(' ajouté avec success');
    },(error: any) => {
      loading.dismiss();
     alert('Erreur de connection catégorie non enregistre');
     console.log("ERROR ===",error);
    })
   }

ngOnInit() {
  
  this.verifieForm = new FormGroup({
  name: new FormControl('', [
Validators.required,
Validators.minLength(2),
  ]),
    
  });
  
  

}

}
