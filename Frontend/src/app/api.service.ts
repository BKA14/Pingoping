import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry ,catchError, timeout} from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class ApiService {

headers : HttpHeaders;
  adr_web: string='http://localhost:80/Projet_ Lokaliser/Backend';
  adr_mobile: string='http://192.168.1.79:80/Projet_ Lokaliser/Backend';
  time: any = 6000
  base_url = this.adr_mobile;

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

  sendtoken(data) {
    return this.http.post(this.base_url+'/sendtoken.php',data)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    isread(id: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.base_url}/isread.php?id=${id}`)
        .pipe(
          timeout(this.time),
          retry(0), // Essaye 1 fois en cas d'échec, ajustez selon vos besoins
          catchError(this.handleError)
        );
    }


    user_connecter(): Observable<any> {
      return this.http.get(`${this.base_url}/user_connecter.php`)
        .pipe(
          timeout(this.time),
          retry(0),
          catchError(this.handleError)
        );
    }

    update_activity(id): Observable<any> {
      return this.http.get(`${this.base_url}/update_activity.php?id=${id}`)
        .pipe(
          timeout(this.time),
          retry(0),
          catchError(this.handleError)
        );
    }

    deconnexion(id): Observable<any> {
      return this.http.get(`${this.base_url}/deconnexion.php?id=${id}`)
        .pipe(
          timeout(this.time),
          retry(0),
          catchError(this.handleError)
        );
    }


    notification_lu(data) {
    return this.http.post(this.base_url+'/notification_lu.php',data)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

      reinitialise(data) {
        return this.http.post(this.base_url + '/reinitialise.php', data, {
          withCredentials: true, // Ajoutez cette ligne
          headers: this.headers // Si vous utilisez des en-têtes personnalisés
        })
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
      }


    verifie_code(data) {
      return this.http.post(this.base_url + '/verify-code.php', data, {
        withCredentials: true, // Ajoutez cette ligne
        headers: this.headers // Si vous utilisez des en-têtes personnalisés
      })
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
    }

    verifie_code_two(data) {
      return this.http.post(this.base_url + '/verifie_code_two.php', data, {
        withCredentials: true, // Ajoutez cette ligne
        headers: this.headers // Si vous utilisez des en-têtes personnalisés
      })
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
    }

    verifie_code_password(data) {
      return this.http.post(this.base_url + '/verifie_code_password.php', data, {
        withCredentials: true, // Ajoutez cette ligne
        headers: this.headers // Si vous utilisez des en-têtes personnalisés
      })
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
    }



  sendNotification(data) {
    return this.http.post(this.base_url+'/sendnotification.php',data)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

  rafraichissement_token(data) {
      return this.http.post(this.base_url+'/rafraichissement_token.php',data)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

    get_time() {
      return this.http.get(this.base_url+'/serveur_time.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

addentreprise(data) {
return this.http.post(this.base_url+'/create.php',data)
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}

addpub(formData: FormData) {
return this.http.post(this.base_url + '/addpub.php', formData)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
}

add_resto(formData: FormData) {
  return this.http.post(this.base_url + '/add_resto.php', formData)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
  }

  add_plat(formData: FormData) {
    return this.http.post(this.base_url + '/add_plat.php', formData)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
    }

    add_commande(formData: FormData) {
      return this.http.post(this.base_url + '/add_commande.php', formData)
        .pipe(
          timeout(this.time),
          retry(0), // Réessaie 0 fois en cas d'échec
          catchError(this.handleError)
        );
    }

addentreprises(data) {
return this.http.post(this.base_url+'//create.php',data)
.pipe(timeout(this.time))
}

signalisation(formData) {
  return this.http.post(this.base_url+'//signalisation.php',formData)
  .pipe(timeout(this.time))
  }

  sendcomment(data) {
    return this.http.post(this.base_url+'//sendcomment.php',data)
    .pipe(timeout(this.time))
    }

  sendmessage(data) {
    return this.http.post(this.base_url+'//sendmessage.php',data)
    .pipe(timeout(this.time))
    }

    repondrecommentaire(data) {
      return this.http.post(this.base_url+'//repondrecommentaire.php',data)
      .pipe(timeout(this.time))
      }

    signalercommentaire(data) {
      return this.http.post(this.base_url+'//signalercommentaire.php',data)
      .pipe(timeout(this.time))
      }

    verifie(data) {
      return this.http.post(this.base_url+'//verifie.php',data)
      .pipe(timeout(this.time))
      }



    addetatlikes(data) {
      return this.http.post(this.base_url+'//addetatlikes.php',data)
      .pipe(timeout(this.time))
      }

      addetatlikes_resto(data) {
        return this.http.post(this.base_url+'//addetatlikes_resto.php',data)
        .pipe(timeout(this.time))
        }

    addcategorie(data) {
      return this.http.post(this.base_url+'//createcategorie.php',data)
      .pipe(timeout(this.time))
    }

    add_numero(data) {
      return this.http.post(this.base_url+'//add_numero.php',data)
      .pipe(timeout(this.time))
    }

    add_cart(data) {
      return this.http.post(this.base_url+'//add_panier.php',data)
      .pipe(timeout(this.time))
    }

    getentreprises(){
    return this.http.get(this.base_url+'/getentreprises.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


    getapropos(){
    return this.http.get(this.base_url+'/getapropos.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    loadalert(page: number, limit: number) {
      return this.http.get(`${this.base_url}/loadalert.php?page=${page}&limit=${limit}`)
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
    }

    restaurant(page: number, limit: number) {
      return this.http.get(`${this.base_url}/get_restaurant.php?page=${page}&limit=${limit}`)
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
    }

    getCart(id) {
      return this.http.get(`${this.base_url}/get_panier.php?id=${id}`)
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
    }

    plat_resto(id, page: number, limit: number) {
      return this.http.get(`${this.base_url}/get_plat.php?id=${id}&page=${page}&limit=${limit}`)
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
    }

    get_commande(page: number, limit: number) {
      return this.http.get(`${this.base_url}/load_commande.php?page=${page}&limit=${limit}`)
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
    }

    get_commande_user(id, page: number, limit: number) {
      return this.http.get(`${this.base_url}/load_commande_user.php?id=${id}&page=${page}&limit=${limit}`)
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
    }

    loadalert_statistique() {
      return this.http.get(`${this.base_url}/loadalert_statistique.php`)
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
    }


    loadalert_id(id, page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/loadalert_id.php?page=${page}&limit=${limit}&id=${id}`)
      .pipe(
        timeout(this.time), // Timeout de 15 secondes
        retry(0), // Nombre de tentatives de retry en cas d'échec
        catchError(this.handleError) // Gestion des erreurs
      );
      }




      loadalert_search(term, page: number, limit: number): Observable<any> {
        return this.http.get(`${this.base_url}/search_alert.php?page=${page}&limit=${limit}&term=${term}`)
        .pipe(
          timeout(this.time), // Timeout de 15 secondes
          retry(0), // Nombre de tentatives de retry en cas d'échec
          catchError(this.handleError) // Gestion des erreurs
        );
        }


        load_search_resto(term, page: number, limit: number): Observable<any> {
          return this.http.get(`${this.base_url}/load_search_resto.php?page=${page}&limit=${limit}&term=${term}`)
          .pipe(
            timeout(this.time), // Timeout de 15 secondes
            retry(0), // Nombre de tentatives de retry en cas d'échec
            catchError(this.handleError) // Gestion des erreurs
          );
          }


          load_message_search(term, page: number, limit: number): Observable<any> {
            return this.http.get(`${this.base_url}/load_message_search.php?page=${page}&limit=${limit}&term=${term}`)
            .pipe(
              timeout(this.time), // Timeout de 15 secondes
              retry(0), // Nombre de tentatives de retry en cas d'échec
              catchError(this.handleError) // Gestion des erreurs
            );
            }


        load_search_commande(term, page: number, limit: number): Observable<any> {
          return this.http.get(`${this.base_url}/load_search_commande.php?page=${page}&limit=${limit}&term=${term}`)
          .pipe(
            timeout(this.time), // Timeout de 15 secondes
            retry(0), // Nombre de tentatives de retry en cas d'échec
            catchError(this.handleError) // Gestion des erreurs
          );
          }


        load_signalement_search(term, page: number, limit: number): Observable<any> {
        return this.http.get(`${this.base_url}/load_signalement_search.php?page=${page}&limit=${limit}&term=${term}`)
        .pipe(
          timeout(this.time), // Timeout de 15 secondes
          retry(0), // Nombre de tentatives de retry en cas d'échec
          catchError(this.handleError) // Gestion des erreurs
        );
        }

        load_numero_search(term, page: number, limit: number): Observable<any> {
          return this.http.get(`${this.base_url}/load_numero_search.php?page=${page}&limit=${limit}&term=${term}`)
          .pipe(
            timeout(this.time),
            retry(0),
            catchError(this.handleError)
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

          return this.http.get(`${this.base_url}/search_all_alert.php`, { params })
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


          return this.http.get(`${this.base_url}/search_all_alert_user.php`, { params })
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



          return this.http.get(`${this.base_url}/loadsignalement_search_all.php`, { params })
            .pipe(
              timeout(this.time),
              retry(0),
              catchError(this.handleError)
            );
        }



    numero_id(id){
      return this.http.get(this.base_url+'/numero_id.php?id='+id)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

    getpub(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/getpub.php?page=${page}&limit=${limit}`)
        .pipe(
          timeout(this.time), // Timeout de 15 secondes
          retry(0), // Nombre de tentatives de retry en cas d'échec
          catchError(this.handleError) // Gestion des erreurs
        );
      }

      getpub_evenement(page: number, limit: number): Observable<any> {
        return this.http.get(`${this.base_url}/get_pub_evenement.php?page=${page}&limit=${limit}`)
          .pipe(
            timeout(this.time), // Timeout de 15 secondes
            retry(0), // Nombre de tentatives de retry en cas d'échec
            catchError(this.handleError) // Gestion des erreurs
          );
        }

getinfo(id){
  return this.http.get(this.base_url+'/getinfo.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

getpubid(id){
  return this.http.get(this.base_url+'/getpubid.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(1), catchError(this.handleError))
}


loadcommentairepub(id, page: number, limit: number): Observable<any> {
  return this.http.get(`${this.base_url}/getcomment.php?page=${page}&limit=${limit}&id=${id}`)
  .pipe(
    timeout(this.time), // Timeout de 15 secondes
    retry(0), // Nombre de tentatives de retry en cas d'échec
    catchError(this.handleError) // Gestion des erreurs
  );
  }


getlivraison(){
  return this.http.get(this.base_url+'/getlivraison.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

getpmu(){
  return this.http.get(this.base_url+'/getpmu.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

    getmessage(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/getmessage.php?page=${page}&limit=${limit}`)
      .pipe(
      timeout(this.time), // Timeout de 15 secondes
      retry(0), // Nombre de tentatives de retry en cas d'échec
      catchError(this.handleError) // Gestion des erreurs
      );
      }

loadsignalement(page: number, limit: number): Observable<any> {
return this.http.get(`${this.base_url}/loadsignalement.php?page=${page}&limit=${limit}`)
.pipe(
timeout(this.time), // Timeout de 15 secondes
retry(0), // Nombre de tentatives de retry en cas d'échec
catchError(this.handleError) // Gestion des erreurs
);
}


getpubvideo(){
  return this.http.get(this.base_url+'/getpubvideo.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getservice(){
    return this.http.get(this.base_url+'/getservice.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    getville(){
      return this.http.get(this.base_url+'/getville.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

getcategorie(){
return this.http.get(this.base_url+'/getcategorie.php')
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}

getgrade(){
  return this.http.get(this.base_url+'/getgrade.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }


    getuser(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.base_url}/getuser.php?page=${page}&limit=${limit}`)
      .pipe(
        timeout(this.time), // Timeout de 15 secondes
        retry(0), // Nombre de tentatives de retry en cas d'échec
        catchError(this.handleError) // Gestion des erreurs
      );
      }

getentreprisess(){
return this.http.get(this.base_url+'/getentreprisess.php')
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError));
}

getfastfood(){
  return this.http.get(this.base_url+'/getfastfood.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getformation(){
    return this.http.get(this.base_url+'/getformation.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


presentAlert(id){
return this.http.delete(this.base_url+'/deleteEntreprise.php?id='+id)
.pipe(timeout(this.time))
.pipe(retry(0), catchError(this.handleError))
}

supprimer_numero(id){
  return this.http.delete(this.base_url+'/supprimer_numero.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }

  supprimer_resto(id){
    return this.http.delete(this.base_url+'/supprimer_restaurant.php?id='+id)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError))
    }

    delete_all_cart(id){
      return this.http.delete(this.base_url+'/supprimer_panier.php?id='+id)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError))
      }

    delete_cart(id){
      return this.http.delete(this.base_url+'/supprimer_du_panier.php?id='+id)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError))
      }

    supprimer_plat(id){
      return this.http.delete(this.base_url+'/supprimer_plat.php?id='+id)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError))
      }

presentAlertpub(id){
  return this.http.delete(this.base_url+'/deletePub.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }

presentAlertcommentaire(id){
  return this.http.delete(this.base_url+'/deletecommentaire.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }

presentAlertpubvideo(id){
    return this.http.delete(this.base_url+'/deletePubvideo.php?id='+id)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError))
    }

presentAlert2(id){
  return this.http.delete(this.base_url+'/delete2Entreprise.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
  }


  presentAlert3(id){
    return this.http.delete(this.base_url+'/delete3categorie.php?id='+id)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError))
    }
getcoupon(){
  return this.http.get(this.base_url+'/getsinglecoupon.php?id=')
  .pipe(timeout(10000))
  .pipe(retry(1), catchError(this.handleError))
}


getentreprisee(id){
  return this.http.get(this.base_url+'/getsingleEntreprise.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

getpub2(id){
  return this.http.get(this.base_url+'/getsinglepub.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getresto(id){
  return this.http.get(this.base_url+'/get_single_resto.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

getplat(id){
  return this.http.get(this.base_url+'/get_single_plat.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

getcategorie3(id){
  return this.http.get(this.base_url+'/getsinglecategorie.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getmenuisier(){
  return this.http.get(this.base_url+'/getmenuisier.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

getvente(){
  return this.http.get(this.base_url+'/getvente.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getcoiffeur(){
  return this.http.get(this.base_url+'/getcoiffeur.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


getmanagement(){
  return this.http.get(this.base_url+'/getmanagement.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getclimatiseur(){
    return this.http.get(this.base_url+'/getclimatiseur.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

  getelectricien(){
    return this.http.get(this.base_url+'/getelectricien.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


getuser1(id){
  return this.http.get(this.base_url+'/getusersingle.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}
getdepotretrait(){
  return this.http.get(this.base_url+'/getdepotretrait.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

gettaxi(){
  return this.http.get(this.base_url+'/gettaxi.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }


getgateau(){
  return this.http.get(this.base_url+'/getgateau.php')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getetat(){
    return this.http.get(this.base_url+'/getetat.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    getetat2(data){
      return this.http.post(this.base_url+'/getetat2.php',data)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError))
    }

    get_etat_resto(data){
      return this.http.post(this.base_url+'/get_etat_resto.php',data)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError))
    }



    get_genie_civil(){
    return this.http.get(this.base_url+'/get_genie_civil.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


    getresidence(){
      return this.http.get(this.base_url+'/getresidence.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

      getplomberie(){
        return this.http.get(this.base_url+'/getplomberie.php')
        .pipe(timeout(this.time))
        .pipe(retry(0), catchError(this.handleError));
        }

        getvin(){
          return this.http.get(this.base_url+'/getvin.php')
          .pipe(timeout(this.time))
          .pipe(retry(0), catchError(this.handleError));
          }


  getfestival(){
    return this.http.get(this.base_url+'/getfestival.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

  gettailleur(){
    return this.http.get(this.base_url+'/gettailleur.php')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }


  numero_service(page: number, limit: number) {
    return this.http.get(`${this.base_url}/numero_service.php?page=${page}&limit=${limit}`)
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
  }

  getalimentation(){
    return this.http.get(this.base_url+'/getalimentation.php?id=')
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError))
  }


achatalimentation(){
  return this.http.get(this.base_url+'/achatalimentation.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

achatpoule(){
  return this.http.get(this.base_url+'/achatpoule.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

terminer_alerte(id,data){
  return this.http.put(this.base_url+'/terminer_alerte.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


soumettre_rapport(id,data){
  return this.http.put(this.base_url+'/soumettre_rapport.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

marquer_lu_message(id,data){
  return this.http.put(this.base_url+'/update_message.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatefastfood(id,data){
  return this.http.put(this.base_url+'/updatefastfood.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

traitement(id,data){
  return this.http.put(this.base_url+'/traitement.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

confirmer(id,data){
  return this.http.put(this.base_url+'/confirmer.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

debloquer(id,data){
  return this.http.put(this.base_url+'/debloquer.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

usersignaler(){
  return this.http.get(this.base_url+'/usersignaler.php?id=')
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


usersignaler2(id){
  return this.http.get(this.base_url+'/usersignaler2.php?id='+id)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateetatlikes(id,data){
  return this.http.put(this.base_url+'/updateetatlikes.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateinfo(id,data){
  return this.http.put(this.base_url+'/updateinfo.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatepmu(id,data){
  return this.http.put(this.base_url+'/updatepmu.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

update_commande(id: number, data: any) {
  return this.http.post(`${this.base_url}/update_commande.php`, data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
}

update_num_service(id,data){
  return this.http.put(this.base_url+'/update_num_service.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateetatlikes2(id,data){
  return this.http.put(this.base_url+'/updateetatlikes2.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

disLike(id,data){
  return this.http.put(this.base_url+'/disLike.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

disLike_resto(id,data){
  return this.http.put(this.base_url+'/disLike_resto.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatecoiffeur(id,data){
  return this.http.put(this.base_url+'/updatecoiffeur.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatelivraison(id,data){
  return this.http.put(this.base_url+'/updatelivraison.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatelikes(id,data){
  return this.http.put(this.base_url+'/updatelikes.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updateplomberie(id,data){
  return this.http.put(this.base_url+'/updateplomberie.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateresidence(id,data){
  return this.http.put(this.base_url+'/updateresidence.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatevin(id,data){
  return this.http.put(this.base_url+'/updatevin.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}



updatedepotretrait(id,data){
  return this.http.put(this.base_url+'/updatedepotretrait.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatealimentation(id,data){
  return this.http.put(this.base_url+'/updatealimentation.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}




updatevente(id,data){
  return this.http.put(this.base_url+'/updatevente.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateentreprise(id,data){
  return this.http.put(this.base_url+'/updateEntreprise.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatepub(id, formData) {
  return this.http.post(`${this.base_url}/updatepub.php?id=${id}`, formData)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
}

update_resto(id, formData) {
  return this.http.post(`${this.base_url}/update_resto.php?id=${id}`, formData)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
}

update_plat(id, formData) {
  return this.http.post(`${this.base_url}/update_plat.php?id=${id}`, formData)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
}

update_apropos(id, formData) {
  return this.http.post(`${this.base_url}/updateapropos.php?id=${id}`, formData)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
}

updatecategorie(id,data){
  return this.http.put(this.base_url+'/updatecategorie.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatenumero(id,data){
  return this.http.put(this.base_url+'/updatenumero.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatecoupon(id,data){
  return this.http.put(this.base_url+'/updatecoupon.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateformation(id,data){
  return this.http.put(this.base_url+'/updateformation.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updateelectricien(id,data){
  return this.http.put(this.base_url+'/updateelectricien.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updateclimatiseur(id,data){
  return this.http.put(this.base_url+'/updateclimatiseur.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatetailleur(id,data){
  return this.http.put(this.base_url+'/updatetailleur.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

update_genie_civil(id,data){
  return this.http.put(this.base_url+'/update_genie_civil.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatefestival(id,data){
  return this.http.put(this.base_url+'/updatefestival.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updatemenuisier(id,data){
  return this.http.put(this.base_url+'/updatemenuisier.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updategateau(id,data){
  return this.http.put(this.base_url+'/updategateau.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatemanagement(id,data){
  return this.http.put(this.base_url+'/updatemanagement.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

updatetaxi(id,data){
  return this.http.put(this.base_url+'/updatetaxi.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


updateuser(id,data){
  return this.http.put(this.base_url+'/updateuser.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}

modifierCommentaire(id,data){
  return this.http.put(this.base_url+'/modifierCommentaire.php?id='+id,data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError))
}


inscription(data) {
  return this.http.post(this.base_url + '/inscription2.php', data, {
    withCredentials: true, // Ajoutez cette ligne
    headers: this.headers // Si vous utilisez des en-têtes personnalisés
  })
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
}

renvoyer_code() {
  return this.http.get(this.base_url + '/renvoyer_otp.php', {
    withCredentials: true, // Ajoutez cette ligne
    headers: this.headers // Si vous utilisez des en-têtes personnalisés
  })
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
}


renvoyer_otp_two() {
  return this.http.get(this.base_url + '/renvoyer_otp_two.php', {
    withCredentials: true, // Ajoutez cette ligne
    headers: this.headers // Si vous utilisez des en-têtes personnalisés
  })
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
}


login(data){
  return this.http.post(this.base_url+'/login.php',data)
  .pipe(timeout(this.time))
  .pipe(retry(0), catchError(this.handleError));
  }

  getlogin(data){
    return this.http.put(this.base_url+'/getlogin.php',data)
    .pipe(timeout(this.time))
    .pipe(retry(0), catchError(this.handleError));
    }

    getcategorie1(){
      return this.http.get(this.base_url+'/Backend/getcategorie1.php')
      .pipe(timeout(this.time))
      .pipe(retry(0), catchError(this.handleError));
      }

}
