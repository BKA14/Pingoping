import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { CustomFilterPipe } from './custom-filter.pipe';


@Component({
selector: 'app-signalement',
templateUrl: './signalement.page.html',
styleUrls: ['./signalement.page.scss'],
})
export class SignalementPage implements OnInit {

signalement : any;
term2;
term;
oui_terminer =  'oui';
non_terminer = 'non';
idusersignaler;
selectedDateOption: any;  // Option par défaut pour la date de début
dateblocage : any;
userbloquer :any;

constructor(
private route: ActivatedRoute,
private router: Router,
private _apiService : ApiService,
private loadingCtrl: LoadingController,
public loadingController: LoadingController,
private alertController: AlertController,
private cdr: ChangeDetectorRef,

)
{
this.loadsignalement();
this.user();
}

ngOnInit() {
}

refreshPage(e){
setTimeout(() => {
this.loadsignalement();
this.user();
console.log('rafraichissement de la page');
e.target.complete();
},500);
}

async loadsignalement() {
try {
const res = await this._apiService.loadsignalement().toPromise();
console.log('SUCCESS ===', res);

this.signalement = res;

} catch (error) {
console.log('erreur de chargement', error);
// Gérez les erreurs de chargement de manière appropriée
}
}

  async traitement(signalement){

    let data = {
      traitement : 'oui',
    }

    this._apiService.traitement(signalement.id ,data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
     alert(' Signalement traité !');
     },(error: any) => {
      console.log("Erreur de connection");
      alert(' Erreur de connection ');
    })
    }

    async terminer(signalement) {
      const alert = await this.alertController.create({
        header: 'Etes-vous sur de vouloir terminer ce signalement ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //this.handlerMessage = 'Alert canceled';
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {

            this.traitement(signalement);

          },
          },
      ],
      });
    return alert.present();
    this.cdr.detectChanges();
    }


// Fonction pour formater l'heure de publication du commentaire
formatCommentTime(time: string): string {
  const commentDate = new Date(time);
  const now = new Date();
  const diffInSeconds = Math.round((now.getTime() - commentDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
  return 'Il y a quelques instants';
  } else if (diffInSeconds < 3600) {
  const minutes = Math.round(diffInSeconds / 60);
  return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
  const hours = Math.round(diffInSeconds / 3600);
  return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
  return commentDate.toLocaleDateString('fr-FR');
  }
  }

// date fin blocage
  updateDate(event: any) {
    this.dateblocage = event.detail.value;
  }

  btn() {
    this.selectedDateOption = !this.selectedDateOption;
   }

   confirmer(signalement){

    let data = {
      datefinblocage : this.dateblocage,
    }

    this._apiService.confirmer(signalement.idusersignaler ,data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
     alert(' blocage effectué  !');
     this.selectedDateOption = ! this.selectedDateOption;
     },(error: any) => {
      console.log("Erreur de connection");
      alert(' Erreur de connection ');
    })

   }


  // filtre pour affichage par catégorie
  transform(signalement: any, term: string, excludes: any = []): any {
    return CustomFilterPipe.filter(signalement, term, excludes);
  }


async user() {
  try {
  const res = await this._apiService.usersignaler().toPromise();
  console.log('SUCCESS ok ===', res);

  this.userbloquer = res;


  } catch (error) {
  console.log('erreur de chargement', error);
  // Gérez les erreurs de chargement de manière appropriée
  }
  }

// Méthode pour trouver la date de fin de blocage correspondante à partir de l'id de l'utilisateur signalé
findDateFinBlocage(idUserSignaler: string): string {
  // Vérifiez si this.userbloquer est défini
  if (this.userbloquer) {
    // Recherchez la correspondance dans this.userbloquer
    const userBloque = this.userbloquer.find(userBloque => userBloque.id === idUserSignaler);
    // Si une correspondance est trouvée, formatez la date et retournez-la
    if (userBloque && userBloque.datefinblocage !=='non') {
      // Créez une nouvelle instance de Date à partir de la chaîne de date
      const dateFinBlocage = new Date(userBloque.datefinblocage);
      // Formatez la date en chaîne lisible
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      };
      return dateFinBlocage.toLocaleDateString('fr-FR', options);
    }
  }
  // Si this.userbloquer est undefined ou si aucune correspondance n'est trouvée, retournez une valeur par défaut
  return 'non';

}


debloquer(signalement){

  let data = {
    datefinblocage : 'non',
  }

  this._apiService.debloquer(signalement.idusersignaler ,data).subscribe((res:any) => {
    console.log("SUCCESS ===",res);
   alert(' deblocage effectué  !');
   },(error: any) => {
    console.log("Erreur de connection");
    alert(' Erreur de connection ');
  })

 }

}
