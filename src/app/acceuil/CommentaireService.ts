import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private sanitizer: DomSanitizer) { }
  sanitize(commentaire: string): SafeHtml {
    // Remplacez les occurrences de liens dans le commentaire par des liens stylisés
    const commentaireAvecLiens = commentaire.replace(
      /((https?:\/\/[^\s]+)|(www\.[^\s]+)|(ftp:\/\/[^\s]+)|(mailto:[^\s]+))/g,
      '<a href="$1" target="_blank" class="stylish-link">Cliquer ici</a>'
    );

    // Appliquez la désinfection pour permettre les balises HTML
    return this.sanitizer.bypassSecurityTrustHtml(commentaireAvecLiens);
  }

}
