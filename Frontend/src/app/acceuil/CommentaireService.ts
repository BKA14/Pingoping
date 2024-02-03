import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private sanitizer: DomSanitizer) { }

  sanitize(commentaire: string): SafeHtml {
    // Remplacez les occurrences de liens dans le commentaire par du texte "Cliquer ici"
    const commentaireAvecTexte = commentaire.replace(
      /((https?:\/\/[^\s]+)|(www\.[^\s]+)|(ftp:\/\/[^\s]+)|(mailto:[^\s]+))/g,
      '<a href="javascript:void(0);" (click)="ouvrirLien()">Cliquer ici</a>'
    );

    // Appliquez la désinfection pour permettre les balises HTML
    return this.sanitizer.bypassSecurityTrustHtml(commentaireAvecTexte);
  }

  ouvrirLien() {
    // Implémentez la logique pour ouvrir le lien ici
    console.log('Lien cliqué !');
  }
}
