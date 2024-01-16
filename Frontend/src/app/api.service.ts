import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry ,catchError, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers : HttpHeaders;
   adr_web: string='http://localhost:80';
   adr_mobile: string='http://192.168.1.68:80';

   base_url = this.adr_web;
   constructor(public http: HttpClient)
   {

  this.headers = new HttpHeaders();
  this.headers.append("Accept", 'application/json');
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', '*');;
  this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

   }

handleError(error:HttpErrorResponse){
  if (error.error instanceof ErrorEvent) {
    console.error('Error: ', error.error.message)
  }else{
    console.error("Erreur! defaut de connection: " + error.status + " Reessayez: " + error.error)
  }

  return throwError('Server Error')
}

addentreprise(data) {
return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/create.php',data)
.pipe(timeout(15000))
.pipe(retry(0), catchError(this.handleError));
}

addpub(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/addpub.php',data)
  .pipe(timeout(15000))
  .pipe(retry(0), catchError(this.handleError));
  }


addentreprises(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//create.php',data)
  .pipe(timeout(15000))
  }

  addetatlikes(data) {
    return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//addetatlikes.php',data)
    .pipe(timeout(15000))
    }

  addcategorie(data) {
    return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//createcategorie.php',data)
    .pipe(timeout(15000))
  }

getentreprises(){
return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getentreprises.php')
.pipe(timeout(15000))
.pipe(retry(0), catchError(this.handleError));
}

getapropos(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getapropos.php')
  .pipe(timeout(15000))
  .pipe(retry(0), catchError(this.handleError));
  }


getpub(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getpub.php')
  .pipe(timeout(15000))
  .pipe(retry(0), catchError(this.handleError));
  }

  getlivraison(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getlivraison.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

 getpmu(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getpmu.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

  getpubvideo(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getpubvideo.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

getcategorie(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getcategorie.php')
  .pipe(timeout(15000))
  .pipe(retry(0), catchError(this.handleError));
  }

  getgrade(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getgrade.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

    getuser(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getuser.php')
      .pipe(timeout(15000))
      .pipe(retry(0), catchError(this.handleError));
      }

getentreprisess(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getentreprisess.php')
  .pipe(timeout(15000))
  .pipe(retry(0), catchError(this.handleError));
  }

  getfastfood(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getfastfood.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

    getformation(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getformation.php')
      .pipe(timeout(15000))
      .pipe(retry(0), catchError(this.handleError));
      }


presentAlert(id){
  return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/deleteEntreprise.php?id='+id)
  .pipe(timeout(15000))
  .pipe(retry(1), catchError(this.handleError))
  }

  presentAlertpub(id){
    return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/deletePub.php?id='+id)
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
    }

  presentAlertpubvideo(id){
      return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/deletePubvideo.php?id='+id)
      .pipe(timeout(15000))
      .pipe(retry(1), catchError(this.handleError))
      }

  presentAlert2(id){
    return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/delete2Entreprise.php?id='+id)
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
    }
    presentAlert3(id){
      return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/delete3categorie.php?id='+id)
      .pipe(timeout(15000))
      .pipe(retry(1), catchError(this.handleError))
      }
  getcoupon(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsinglecoupon.php?id=')
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
}



  getentreprisee(id){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsingleEntreprise.php?id='+id)
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
  }

  getpub2(id){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsinglepub.php?id='+id)
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
  }

  getcategorie3(id){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsinglecategorie.php?id='+id)
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
  }


  getmenuisier(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getmenuisier.php')
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
  }

  getvente(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getvente.php')
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
  }



  getcoiffeur(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getcoiffeur.php')
    .pipe(timeout(15000))
    .pipe(retry(1), catchError(this.handleError))
  }


  getmanagement(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getmanagement.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

    getclimatiseur(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getclimatiseur.php')
      .pipe(timeout(15000))
      .pipe(retry(0), catchError(this.handleError));
      }

    getelectricien(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getelectricien.php')
      .pipe(timeout(15000))
      .pipe(retry(0), catchError(this.handleError));
      }


  getuser1(id){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getusersingle.php?id='+id)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }
  getdepotretrait(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getdepotretrait.php?id=')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  gettaxi(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/gettaxi.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }


  getgateau(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getgateau.php')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

    getetat(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getetat.php')
      .pipe(timeout(15000))
      .pipe(retry(0), catchError(this.handleError));
      }

     get_genie_civil(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/get_genie_civil.php')
      .pipe(timeout(15000))
      .pipe(retry(0), catchError(this.handleError));
      }


      getresidence(){
        return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getresidence.php')
        .pipe(timeout(15000))
        .pipe(retry(0), catchError(this.handleError));
        }

        getplomberie(){
          return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getplomberie.php')
          .pipe(timeout(15000))
          .pipe(retry(0), catchError(this.handleError));
          }

          getvin(){
            return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getvin.php')
            .pipe(timeout(15000))
            .pipe(retry(0), catchError(this.handleError));
            }


    getfestival(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getfestival.php')
      .pipe(timeout(15000))
      .pipe(retry(0), catchError(this.handleError));
      }

      gettailleur(){
        return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/gettailleur.php')
        .pipe(timeout(15000))
        .pipe(retry(0), catchError(this.handleError));
        }


  getalimentation(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getalimentation.php?id=')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  achatalimentation(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/achatalimentation.php?id=')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  achatpoule(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/achatpoule.php?id=')
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatefastfood(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatefastfood.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updateetatlikes(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateetatlikes.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updateetatlikes2(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateetatlikes2.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatecoiffeur(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatecoiffeur.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updatelivraison(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatelivraison.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updatelikes(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatelikes.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updateplomberie(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateplomberie.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updateresidence(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateresidence.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatevin(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatevin.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }



  updatedepotretrait(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatedepotretrait.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatealimentation(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatealimentation.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatepmu(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatepmu.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updatevente(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatevente.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updateentreprise(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateEntreprise.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatepub(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatepub.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatecategorie(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatecategorie.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatecoupon(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatecoupon.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updateformation(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateformation.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updateelectricien(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateelectricien.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updateclimatiseur(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateclimatiseur.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatetailleur(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatetailleur.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  update_genie_civil(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/update_genie_civil.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updatefestival(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatefestival.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updatemenuisier(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatemenuisier.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updategateau(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updategateau.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatemanagement(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatemanagement.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  updatetaxi(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatetaxi.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }


  updateuser(id,data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateuser.php?id='+id,data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError))
  }

  inscription(data) {
    return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/inscription.php',data)
    .pipe(timeout(15000))
    .pipe(retry(0), catchError(this.handleError));
    }

  login(data){
    return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/login.php',data)
    .pipe(timeout(18000))
    .pipe(retry(1), catchError(this.handleError));
    }
    getlogin(data){
      return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/getlogin.php',data)
      .pipe(timeout(15000))
      .pipe(retry(1), catchError(this.handleError));
      }

      getcategorie1(){
        return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getcategorie1.php')
        .pipe(timeout(15000))
        .pipe(retry(0), catchError(this.handleError));
        }

}
