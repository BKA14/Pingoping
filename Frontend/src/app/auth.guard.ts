import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: authService, private router: Router)
  {

  }

  async canActivate(): Promise<boolean> {
    const accessToken = await this.authService.getValidAccessToken();
    const access_app = await this.authService.access_app();

    if (accessToken && access_app !=='non' ) {
      // Si un token valide est présent, l'accès est autorisé
      return true;
    }
    else  if (accessToken && access_app =='non' ) {
      // Si user bloqué, ne peux accedé a l'app
        this.router.navigate(['/login2']);
        alert('il semble que vous avez été bloqué, contactez l/équipe pingoping');
        return false;
    }
    else {
      // Si aucun token n'est présent ou valide, rediriger vers une autre page (ex : page de login)
      this.router.navigate(['/login2']);
      alert('Session terminé, veuillez vous authentifier s/il vous plait')
      return false;
    }
  }
}
