import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceReadyService {
  private loginPageReady = new BehaviorSubject<boolean>(false);

  // Observable pour écouter si la page de login est prête
  isLoginPageReady$ = this.loginPageReady.asObservable();

  // Méthode pour mettre à jour l'état de readiness de la page de login
  setLoginPageReady(ready: boolean) {
    this.loginPageReady.next(ready);
  }
}
