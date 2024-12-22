import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Permet d'injecter le service dans toute l'application
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Ajouter le token à l'en-tête de chaque requête
    const token = localStorage.getItem('access_token');
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Gérer les erreurs (par ex. redirection en cas de 401/403)
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          // Redirection vers la page de connexion
          this.router.navigate(['/login2']);
        }
        throw error;
      })
    );
  }
}
