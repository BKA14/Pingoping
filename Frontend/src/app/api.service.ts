import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry ,catchError, timeout} from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class ApiService {

headers : HttpHeaders;
  adr_web: string='http://localhost:80';
  adr_mobile: string='http://192.168.1.74:80';
  time: any = 10000
  base_url = this.adr_web;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nError: ${JSON.stringify(error.error)}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


rafraichissement_token(data) {
    return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/rafraichissement_token.php',data)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    get_time() {
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/serveur_time.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

addentreprise(data) {
return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/create.php',data)
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}

addpub(formData: FormData) {
return this.http.post(this.base_url + '/Projet_ Lokaliser/Backend/addpub.php', formData)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
}

addentreprises(data) {
return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//create.php',data)
.pipe(timeout(this.time))
}

signalisation(formData) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//signalisation.php',formData)
  .pipe(timeout(this.time))
  }

sendcomment(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//sendcomment.php',data)
  .pipe(timeout(this.time))
  }

sendmessage(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//sendmessage.php',data)
  .pipe(timeout(this.time))
  }

  repondrecommentaire(data) {
    return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//repondrecommentaire.php',data)
    .pipe(timeout(this.time))
    }

    signalercommentaire(data) {
      return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//signalercommentaire.php',data)
      .pipe(timeout(this.time))
      }

      verifie(data) {
        return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//verifie.php',data)
        .pipe(timeout(this.time))
        }

addetatlikes(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//addetatlikes.php',data)
  .pipe(timeout(this.time))
  }

addcategorie(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//createcategorie.php',data)
  .pipe(timeout(this.time))
}

add_numero(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend//add_numero.php',data)
  .pipe(timeout(this.time))
}

getentreprises(){
return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getentreprises.php')
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}


getapropos(){
return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getapropos.php')
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}

loadalert(page: number, limit: number) {
  return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/loadalert.php?page=${page}&limit=${limit}`)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
}



    loadalert_id(id, page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/loadalert_id.php?page=${page}&limit=${limit}&id=${id}`)
      .pipe(
        timeout(this.time), // Timeout de 15 secondes
        retry(0), // Nombre de tentatives de retry en cas d'échec
        catchError(this.handleError) // Gestion des erreurs
      );
      }


      loadalert_search(term, page: number, limit: number): Observable<any> {
        return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/search_alert.php?page=${page}&limit=${limit}&term=${term}`)
        .pipe(
          timeout(this.time), // Timeout de 15 secondes
          retry(0), // Nombre de tentatives de retry en cas d'échec
          catchError(this.handleError) // Gestion des erreurs
        );
        }



        load_signalement_search(term, page: number, limit: number): Observable<any> {
        return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/load_signalement_search.php?page=${page}&limit=${limit}&term=${term}`)
        .pipe(
          timeout(this.time), // Timeout de 15 secondes
          retry(0), // Nombre de tentatives de retry en cas d'échec
          catchError(this.handleError) // Gestion des erreurs
        );
        }



        loadalert_search_all(startDate: string, endDate: string, selectedStatus: string, service: string, ville: string, page: number, limit: number): Observable<any> {
          let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

          if (startDate) params = params.set('datedeb', startDate);
          if (endDate) params = params.set('datefin', endDate);
          if (selectedStatus) params = params.set('categorie', selectedStatus);
          if (ville) params = params.set('ville', ville);
          if (service) params = params.set('service', service);

          return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/search_all_alert.php`, { params })
            .pipe(
              timeout(this.time),
              retry(0),
              catchError(this.handleError)
            );
        }


        loadalert_search_all_user(startDate: string, endDate: string, selectedStatus: string, service: string, page: number, limit: number, id): Observable<any> {
          let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('id', id.toString());

          if (startDate) params = params.set('datedeb', startDate);
          if (endDate) params = params.set('datefin', endDate);
          if (selectedStatus) params = params.set('categorie', selectedStatus);
          if (service) params = params.set('service', service);


          return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/search_all_alert_user.php`, { params })
            .pipe(
              timeout(this.time),
              retry(0),
              catchError(this.handleError)
            );
        }


        loadsignalement_search_all(startDate: string, endDate: string, traitement: string, page: number, limit: number): Observable<any> {
          let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())

          if (startDate) params = params.set('datedeb', startDate);
          if (endDate) params = params.set('datefin', endDate);
          if (traitement) params = params.set('traitement', traitement);



          return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/loadsignalement_search_all.php`, { params })
            .pipe(
              timeout(this.time),
              retry(0),
              catchError(this.handleError)
            );
        }



    numero_id(id){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/numero_id.php?id='+id)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

    getpub(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/getpub.php?page=${page}&limit=${limit}`)
        .pipe(
          timeout(this.time), // Timeout de 15 secondes
          retry(0), // Nombre de tentatives de retry en cas d'échec
          catchError(this.handleError) // Gestion des erreurs
        );
      }

getinfo(id){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getinfo.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

getpubid(id){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getpubid.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(1), catchError(this.handleError))
}


loadcommentairepub(id, page: number, limit: number): Observable<any> {
  return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/getcomment.php?page=${page}&limit=${limit}&id=${id}`)
  .pipe(
    timeout(this.time), // Timeout de 15 secondes
    retry(0), // Nombre de tentatives de retry en cas d'échec
    catchError(this.handleError) // Gestion des erreurs
  );
  }


getlivraison(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getlivraison.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

getpmu(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getpmu.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

    getmessage(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/getmessage.php?page=${page}&limit=${limit}`)
      .pipe(
      timeout(this.time), // Timeout de 15 secondes
      retry(0), // Nombre de tentatives de retry en cas d'échec
      catchError(this.handleError) // Gestion des erreurs
      );
      }

loadsignalement(page: number, limit: number): Observable<any> {
return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/loadsignalement.php?page=${page}&limit=${limit}`)
.pipe(
timeout(this.time), // Timeout de 15 secondes
retry(0), // Nombre de tentatives de retry en cas d'échec
catchError(this.handleError) // Gestion des erreurs
);
}


getpubvideo(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getpubvideo.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getservice(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getservice.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    getville(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getville.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

getcategorie(){
return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getcategorie.php')
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}

getgrade(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getgrade.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }


    getuser(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/Projet_ Lokaliser/Backend/getuser.php?page=${page}&limit=${limit}`)
      .pipe(
        timeout(this.time), // Timeout de 15 secondes
        retry(0), // Nombre de tentatives de retry en cas d'échec
        catchError(this.handleError) // Gestion des erreurs
      );
      }

getentreprisess(){
return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getentreprisess.php')
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}

getfastfood(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getfastfood.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getformation(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getformation.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


presentAlert(id){
return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/deleteEntreprise.php?id='+id)
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError))
}

supprimer_numero(id){
  return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/supprimer_numero.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }

presentAlertpub(id){
  return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/deletePub.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }

presentAlertcommentaire(id){
  return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/deletecommentaire.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }

presentAlertpubvideo(id){
    return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/deletePubvideo.php?id='+id)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError))
    }

presentAlert2(id){
  return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/delete2Entreprise.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }


  presentAlert3(id){
    return this.http.delete(this.base_url+'/Projet_ Lokaliser/Backend/delete3categorie.php?id='+id)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError))
    }
getcoupon(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsinglecoupon.php?id=')
  .pipe(timeout(10000))
  .pipe(retry(1), catchError(this.handleError))
}


getentreprisee(id){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsingleEntreprise.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

getpub2(id){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsinglepub.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getcategorie3(id){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getsinglecategorie.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getmenuisier(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getmenuisier.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

getvente(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getvente.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getcoiffeur(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getcoiffeur.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getmanagement(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getmanagement.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getclimatiseur(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getclimatiseur.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

  getelectricien(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getelectricien.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


getuser1(id){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getusersingle.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}
getdepotretrait(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getdepotretrait.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

gettaxi(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/gettaxi.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }


getgateau(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getgateau.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getetat(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getetat.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    getetat2(data){
      return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/getetat2.php',data)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError))
    }


    get_genie_civil(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/get_genie_civil.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


    getresidence(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getresidence.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

      getplomberie(){
        return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getplomberie.php')
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
        }

        getvin(){
          return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getvin.php')
          .pipe(timeout(this.time))
          .pipe(retry(0), catchError(this.handleError));
          }


  getfestival(){
    return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getfestival.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    gettailleur(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/gettailleur.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

      numero_service(){
        return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/numero_service.php')
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
        }


getalimentation(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getalimentation.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


achatalimentation(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/achatalimentation.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

achatpoule(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/achatpoule.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

terminer_alerte(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/terminer_alerte.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


soumettre_rapport(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/soumettre_rapport.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}



updatefastfood(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatefastfood.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

traitement(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/traitement.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

confirmer(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/confirmer.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

debloquer(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/debloquer.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

usersignaler(){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/usersignaler.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


usersignaler2(id){
  return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/usersignaler2.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateetatlikes(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateetatlikes.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateinfo(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateinfo.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

update_num_service(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/update_num_service.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateetatlikes2(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateetatlikes2.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

disLike(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/disLike.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatecoiffeur(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatecoiffeur.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatelivraison(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatelivraison.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatelikes(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatelikes.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updateplomberie(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateplomberie.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateresidence(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateresidence.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatevin(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatevin.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}



updatedepotretrait(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatedepotretrait.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatealimentation(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatealimentation.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatepmu(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatepmu.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatevente(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatevente.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateentreprise(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateEntreprise.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatepub(id, formData) {
  return this.http.post(`${this.base_url}/Projet_ Lokaliser/Backend/updatepub.php?id=${id}`, formData)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
}

update_apropos(id, formData) {
  return this.http.post(`${this.base_url}/Projet_ Lokaliser/Backend/updateapropos.php?id=${id}`, formData)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
}

updatecategorie(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatecategorie.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatenumero(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatenumero.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatecoupon(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatecoupon.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateformation(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateformation.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updateelectricien(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateelectricien.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateclimatiseur(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateclimatiseur.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatetailleur(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatetailleur.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

update_genie_civil(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/update_genie_civil.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatefestival(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatefestival.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatemenuisier(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatemenuisier.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updategateau(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updategateau.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatemanagement(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatemanagement.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatetaxi(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updatetaxi.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updateuser(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/updateuser.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

modifierCommentaire(id,data){
  return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/modifierCommentaire.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


inscription(data) {
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/inscription.php',data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

login(data){
  return this.http.post(this.base_url+'/Projet_ Lokaliser/Backend/login.php',data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getlogin(data){
    return this.http.put(this.base_url+'/Projet_ Lokaliser/Backend/getlogin.php',data)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    getcategorie1(){
      return this.http.get(this.base_url+'/Projet_ Lokaliser/Backend/getcategorie1.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

}
