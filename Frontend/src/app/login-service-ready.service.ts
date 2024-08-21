import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceReadyService {
  private loginPageReady = new BehaviorSubject<boolean>(false);

  isLoginPageReady$ = this.loginPageReady.asObservable();

  setLoginPageReady(ready: boolean) {
    this.loginPageReady.next(ready);
  }

}
