
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { authService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { AuthAdminGuardService  } from './auth-admin.guard.service';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'login2',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    data: { preload: true },
    canActivate: [AuthGuard] //  AuthGuard pour les liens ne necessitant pas le grade admin
  },
  {
    path: 'update-entreprise/:id',
    loadChildren: () => import('./update-entreprises/update-entreprise.module').then( m => m.UpdateEntreprisePageModule),
    canActivate: [AuthAdminGuardService] //  AuthGuard pour les liens  necessitant  le grade admin
  },
  {
    path: 'ajouter-entreprise',
    loadChildren: () => import('./ajouter-entreprise/ajouter-entreprise.module').then( m => m.AjouterEntreprisePageModule),
    canActivate: [AuthAdminGuardService]
  },

  {
    path: 'infoentreprise',
    loadChildren: () => import('./infoentreprise/infoentreprise.module').then( m => m.InfoentreprisePageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'info-user/:id',
    loadChildren: () => import('./info-user/info-user.module').then( m => m.InfoUserPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'welcome2',
    loadChildren: () => import('./welcome2/welcome2.module').then( m => m.Welcome2PageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'welcome3',
    loadChildren: () => import('./welcome3/welcome3.module').then( m => m.Welcome3PageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then( m => m.Login2PageModule),

  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'liste-user',
    loadChildren: () => import('./liste-user/liste-user.module').then( m => m.ListeUserPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'update-user/:id',
    loadChildren: () => import('./update-user/update-user.module').then( m => m.UpdateUserPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'categorie',
    loadChildren: () => import('./categorie/categorie.module').then( m => m.CategoriePageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'ajoutcategorie',
    loadChildren: () => import('./ajoutcategorie/ajoutcategorie.module').then( m => m.AjoutcategoriePageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'update-categorie/:id',
    loadChildren: () => import('./update-categorie/update-categorie.module').then( m => m.UpdateCategoriePageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'apropos',
    loadChildren: () => import('./apropos/apropos.module').then( m => m.AproposPageModule),
   // data: { preload: true },
   canActivate: [AuthGuard] // Utilisez AuthGuard ici

  },
  {
    path: 'mot-de-passe-oublie',
    loadChildren: () => import('./mot-de-passe-oublie/mot-de-passe-oublie.module').then( m => m.MotDePasseOubliePageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'acceuil',
    loadChildren: () => import('./acceuil/acceuil.module').then( m => m.AcceuilPageModule),
    //data: { preload: true }
    canActivate: [AuthGuard] // Utilisez AuthGuard ici
  },

  {
    path: 'ajouterpub',
    loadChildren: () => import('./ajouterpub/ajouterpub.module').then( m => m.AjouterpubPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'updatepub/:id',
    loadChildren: () => import('./updatepub/updatepub.module').then( m => m.UpdatepubPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'ping',
    loadChildren: () => import('./ping/ping.module').then( m => m.PingPageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'updatecoupon',
    loadChildren: () => import('./updatecoupon/updatecoupon.module').then( m => m.UpdatecouponPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'fastfood',
    loadChildren: () => import('./fastfood/fastfood.module').then( m => m.FastfoodPageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'modiffasfood',
    loadChildren: () => import('./modiffasfood/modiffasfood.module').then( m => m.ModiffasfoodPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'pmu',
    loadChildren: () => import('./pmu/pmu.module').then( m => m.PmuPageModule),
   // canActivate: [AuthenticationService]
  },
  {
    path: 'modifpmu',
    loadChildren: () => import('./modifpmu/modifpmu.module').then( m => m.ModifpmuPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'depot-retrait',
    loadChildren: () => import('./depot-retrait/depot-retrait.module').then( m => m.DepotRetraitPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-depot-retrait',
    loadChildren: () => import('./modif-depot-retrait/modif-depot-retrait.module').then( m => m.ModifDepotRetraitPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'achatalimentation',
    loadChildren: () => import('./achatalimentation/achatalimentation.module').then( m => m.AchatalimentationPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'modifalimentation',
    loadChildren: () => import('./modifalimentation/modifalimentation.module').then( m => m.ModifalimentationPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'achatpoule',
    loadChildren: () => import('./achatpoule/achatpoule.module').then( m => m.AchatpoulePageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'updateachatpoule',
    loadChildren: () => import('./updateachatpoule/updateachatpoule.module').then( m => m.UpdateachatpoulePageModule),
    //  canActivate: [AuthenticationService]
  },
  {
    path: 'formation-informatique',
    loadChildren: () => import('./formation-informatique/formation-informatique.module').then( m => m.FormationInformatiquePageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-formation',
    loadChildren: () => import('./modif-formation/modif-formation.module').then( m => m.ModifFormationPageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'artiste',
    loadChildren: () => import('./artiste/artiste.module').then( m => m.ArtistePageModule),
      //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-artiste',
    loadChildren: () => import('./modif-artiste/modif-artiste.module').then( m => m.ModifArtistePageModule),
    //  canActivate: [AuthenticationService]
  },
  {
    path: 'menuisier',
    loadChildren: () => import('./menuisier/menuisier.module').then( m => m.MenuisierPageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-menuisier',
    loadChildren: () => import('./modif-menuisier/modif-menuisier.module').then( m => m.ModifMenuisierPageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'coiffeur',
    loadChildren: () => import('./coiffeur/coiffeur.module').then( m => m.CoiffeurPageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-coiffeur',
    loadChildren: () => import('./modif-coiffeur/modif-coiffeur.module').then( m => m.ModifCoiffeurPageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'livraison',
    loadChildren: () => import('./livraison/livraison.module').then( m => m.LivraisonPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-livraison',
    loadChildren: () => import('./modif-livraison/modif-livraison.module').then( m => m.ModifLivraisonPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'vente-informatique',
    loadChildren: () => import('./vente-informatique/vente-informatique.module').then( m => m.VenteInformatiquePageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-vente-informatique',
    loadChildren: () => import('./modif-vente-informatique/modif-vente-informatique.module').then( m => m.ModifVenteInformatiquePageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'gateau',
    loadChildren: () => import('./gateau/gateau.module').then( m => m.GateauPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-gateau',
    loadChildren: () => import('./modif-gateau/modif-gateau.module').then( m => m.ModifGateauPageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'taxi',
    loadChildren: () => import('./taxi/taxi.module').then( m => m.TaxiPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-taxi',
    loadChildren: () => import('./modif-taxi/modif-taxi.module').then( m => m.ModifTaxiPageModule),
    //  canActivate: [AuthenticationService]
  },
  {
    path: 'electricien',
    loadChildren: () => import('./electricien/electricien.module').then( m => m.ElectricienPageModule),
     //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-electricien',
    loadChildren: () => import('./modif-electricien/modif-electricien.module').then( m => m.ModifElectricienPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-festival',
    loadChildren: () => import('./modif-festival/modif-festival.module').then( m => m.ModifFestivalPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'festival',
    loadChildren: () => import('./festival/festival.module').then( m => m.FestivalPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'genie-civil',
    loadChildren: () => import('./genie-civil/genie-civil.module').then( m => m.GenieCivilPageModule),
      //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-genie-civil',
    loadChildren: () => import('./modif-genie-civil/modif-genie-civil.module').then( m => m.ModifGenieCivilPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'climatiseur',
    loadChildren: () => import('./climatiseur/climatiseur.module').then( m => m.ClimatiseurPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-climatiseur',
    loadChildren: () => import('./modif-climatiseur/modif-climatiseur.module').then( m => m.ModifClimatiseurPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'tailleur',
    loadChildren: () => import('./tailleur/tailleur.module').then( m => m.TailleurPageModule),
    //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-tailleur',
    loadChildren: () => import('./modif-tailleur/modif-tailleur.module').then( m => m.ModifTailleurPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'plomberie',
    loadChildren: () => import('./plomberie/plomberie.module').then( m => m.PlomberiePageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'residence',
    loadChildren: () => import('./residence/residence.module').then( m => m.ResidencePageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-residence',
    loadChildren: () => import('./modif-residence/modif-residence.module').then( m => m.ModifResidencePageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-plomberie',
    loadChildren: () => import('./modif-plomberie/modif-plomberie.module').then( m => m.ModifPlomberiePageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'vin',
    loadChildren: () => import('./vin/vin.module').then( m => m.VinPageModule),
   //  canActivate: [AuthenticationService]
  },
  {
    path: 'modif-vin',
    loadChildren: () => import('./modif-vin/modif-vin.module').then( m => m.ModifVinPageModule),
  //  canActivate: [AuthenticationService]
  },
  {
    path: 'update-apropos',
    loadChildren: () => import('./update-apropos/update-apropos.module').then( m => m.UpdateAproposPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'paiement',
    loadChildren: () => import('./paiement/paiement.module').then( m => m.PaiementPageModule),
  },
  {
    path: 'commentaire',
    loadChildren: () => import('./commentaire/commentaire.module').then( m => m.CommentairePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signalement',
    loadChildren: () => import('./signalement/signalement.module').then( m => m.SignalementPageModule),
    canActivate: [AuthAdminGuardService]

  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'signalisation',
    loadChildren: () => import('./signalisation/signalisation.module').then( m => m.SignalisationPageModule),
    canActivate: [AuthGuard] // Utilisez AuthGuard ici
  },
  {
    path: 'alerte',
    loadChildren: () => import('./alerte/alerte.module').then( m => m.AlertePageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'alert-user',
    loadChildren: () => import('./alert-user/alert-user.module').then( m => m.AlertUserPageModule),
    canActivate: [AuthGuard] // Utilisez AuthGuard ici
  },
  {
    path: 'numero-service',
    loadChildren: () => import('./numero-service/numero-service.module').then( m => m.NumeroServicePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'ajouter-numero',
    loadChildren: () => import('./ajouter-numero/ajouter-numero.module').then( m => m.AjouterNumeroPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'update-numero/:id',
    loadChildren: () => import('./update-numero/update-numero.module').then( m => m.UpdateNumeroPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'message-user',
    loadChildren: () => import('./message-user/message-user.module').then( m => m.MessageUserPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'message-admin',
    loadChildren: () => import('./message-admin/message-admin.module').then( m => m.MessageAdminPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'send-notification',
    loadChildren: () => import('./send-notification/send-notification.module').then( m => m.SendNotificationPageModule),
    canActivate: [AuthAdminGuardService]
  },
  {
    path: 'statistique',
    loadChildren: () => import('./statistique/statistique.module').then( m => m.StatistiquePageModule),
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
