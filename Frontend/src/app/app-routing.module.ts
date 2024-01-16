
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'login2',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'update-entreprise/:id',
    loadChildren: () => import('./update-entreprises/update-entreprise.module').then( m => m.UpdateEntreprisePageModule)
  },
  {
    path: 'ajouter-entreprise',
    loadChildren: () => import('./ajouter-entreprise/ajouter-entreprise.module').then( m => m.AjouterEntreprisePageModule)
  },

  {
    path: 'infoentreprise',
    loadChildren: () => import('./infoentreprise/infoentreprise.module').then( m => m.InfoentreprisePageModule)
  },
  {
    path: 'info-user/:id',
    loadChildren: () => import('./info-user/info-user.module').then( m => m.InfoUserPageModule)
  },
  {
    path: 'welcome2',
    loadChildren: () => import('./welcome2/welcome2.module').then( m => m.Welcome2PageModule)
  },
  {
    path: 'welcome3',
    loadChildren: () => import('./welcome3/welcome3.module').then( m => m.Welcome3PageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then( m => m.Login2PageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'liste-user',
    loadChildren: () => import('./liste-user/liste-user.module').then( m => m.ListeUserPageModule)
  },
  {
    path: 'update-user/:id',
    loadChildren: () => import('./update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'categorie',
    loadChildren: () => import('./categorie/categorie.module').then( m => m.CategoriePageModule)
  },
  {
    path: 'ajoutcategorie',
    loadChildren: () => import('./ajoutcategorie/ajoutcategorie.module').then( m => m.AjoutcategoriePageModule)
  },
  {
    path: 'update-categorie/:id',
    loadChildren: () => import('./update-categorie/update-categorie.module').then( m => m.UpdateCategoriePageModule)
  },
  {
    path: 'apropos',
    loadChildren: () => import('./apropos/apropos.module').then( m => m.AproposPageModule)
  },
  {
    path: 'mot-de-passe-oublie',
    loadChildren: () => import('./mot-de-passe-oublie/mot-de-passe-oublie.module').then( m => m.MotDePasseOubliePageModule)
  },
  {
    path: 'acceuil',
    loadChildren: () => import('./acceuil/acceuil.module').then( m => m.AcceuilPageModule)
  },

  {
    path: 'ajouterpub',
    loadChildren: () => import('./ajouterpub/ajouterpub.module').then( m => m.AjouterpubPageModule)
  },
  {
    path: 'updatepub/:id',
    loadChildren: () => import('./updatepub/updatepub.module').then( m => m.UpdatepubPageModule)
  },
  {
    path: 'ping',
    loadChildren: () => import('./ping/ping.module').then( m => m.PingPageModule)
  },
  {
    path: 'updatecoupon',
    loadChildren: () => import('./updatecoupon/updatecoupon.module').then( m => m.UpdatecouponPageModule)
  },
  {
    path: 'fastfood',
    loadChildren: () => import('./fastfood/fastfood.module').then( m => m.FastfoodPageModule)
  },
  {
    path: 'modiffasfood',
    loadChildren: () => import('./modiffasfood/modiffasfood.module').then( m => m.ModiffasfoodPageModule)
  },
  {
    path: 'pmu',
    loadChildren: () => import('./pmu/pmu.module').then( m => m.PmuPageModule)
  },
  {
    path: 'modifpmu',
    loadChildren: () => import('./modifpmu/modifpmu.module').then( m => m.ModifpmuPageModule)
  },
  {
    path: 'depot-retrait',
    loadChildren: () => import('./depot-retrait/depot-retrait.module').then( m => m.DepotRetraitPageModule)
  },
  {
    path: 'modif-depot-retrait',
    loadChildren: () => import('./modif-depot-retrait/modif-depot-retrait.module').then( m => m.ModifDepotRetraitPageModule)
  },
  {
    path: 'achatalimentation',
    loadChildren: () => import('./achatalimentation/achatalimentation.module').then( m => m.AchatalimentationPageModule)
  },
  {
    path: 'modifalimentation',
    loadChildren: () => import('./modifalimentation/modifalimentation.module').then( m => m.ModifalimentationPageModule)
  },
  {
    path: 'achatpoule',
    loadChildren: () => import('./achatpoule/achatpoule.module').then( m => m.AchatpoulePageModule)
  },
  {
    path: 'updateachatpoule',
    loadChildren: () => import('./updateachatpoule/updateachatpoule.module').then( m => m.UpdateachatpoulePageModule)
  },
  {
    path: 'formation-informatique',
    loadChildren: () => import('./formation-informatique/formation-informatique.module').then( m => m.FormationInformatiquePageModule)
  },
  {
    path: 'modif-formation',
    loadChildren: () => import('./modif-formation/modif-formation.module').then( m => m.ModifFormationPageModule)
  },
  {
    path: 'artiste',
    loadChildren: () => import('./artiste/artiste.module').then( m => m.ArtistePageModule)
  },
  {
    path: 'modif-artiste',
    loadChildren: () => import('./modif-artiste/modif-artiste.module').then( m => m.ModifArtistePageModule)
  },
  {
    path: 'menuisier',
    loadChildren: () => import('./menuisier/menuisier.module').then( m => m.MenuisierPageModule)
  },
  {
    path: 'modif-menuisier',
    loadChildren: () => import('./modif-menuisier/modif-menuisier.module').then( m => m.ModifMenuisierPageModule)
  },
  {
    path: 'coiffeur',
    loadChildren: () => import('./coiffeur/coiffeur.module').then( m => m.CoiffeurPageModule)
  },
  {
    path: 'modif-coiffeur',
    loadChildren: () => import('./modif-coiffeur/modif-coiffeur.module').then( m => m.ModifCoiffeurPageModule)
  },
  {
    path: 'livraison',
    loadChildren: () => import('./livraison/livraison.module').then( m => m.LivraisonPageModule)
  },
  {
    path: 'modif-livraison',
    loadChildren: () => import('./modif-livraison/modif-livraison.module').then( m => m.ModifLivraisonPageModule)
  },
  {
    path: 'vente-informatique',
    loadChildren: () => import('./vente-informatique/vente-informatique.module').then( m => m.VenteInformatiquePageModule)
  },
  {
    path: 'modif-vente-informatique',
    loadChildren: () => import('./modif-vente-informatique/modif-vente-informatique.module').then( m => m.ModifVenteInformatiquePageModule)
  },
  {
    path: 'gateau',
    loadChildren: () => import('./gateau/gateau.module').then( m => m.GateauPageModule)
  },
  {
    path: 'modif-gateau',
    loadChildren: () => import('./modif-gateau/modif-gateau.module').then( m => m.ModifGateauPageModule)
  },
  {
    path: 'taxi',
    loadChildren: () => import('./taxi/taxi.module').then( m => m.TaxiPageModule)
  },
  {
    path: 'modif-taxi',
    loadChildren: () => import('./modif-taxi/modif-taxi.module').then( m => m.ModifTaxiPageModule)
  },
  {
    path: 'electricien',
    loadChildren: () => import('./electricien/electricien.module').then( m => m.ElectricienPageModule)
  },
  {
    path: 'modif-electricien',
    loadChildren: () => import('./modif-electricien/modif-electricien.module').then( m => m.ModifElectricienPageModule)
  },
  {
    path: 'modif-festival',
    loadChildren: () => import('./modif-festival/modif-festival.module').then( m => m.ModifFestivalPageModule)
  },
  {
    path: 'festival',
    loadChildren: () => import('./festival/festival.module').then( m => m.FestivalPageModule)
  },
  {
    path: 'genie-civil',
    loadChildren: () => import('./genie-civil/genie-civil.module').then( m => m.GenieCivilPageModule)
  },
  {
    path: 'modif-genie-civil',
    loadChildren: () => import('./modif-genie-civil/modif-genie-civil.module').then( m => m.ModifGenieCivilPageModule)
  },
  {
    path: 'climatiseur',
    loadChildren: () => import('./climatiseur/climatiseur.module').then( m => m.ClimatiseurPageModule)
  },
  {
    path: 'modif-climatiseur',
    loadChildren: () => import('./modif-climatiseur/modif-climatiseur.module').then( m => m.ModifClimatiseurPageModule)
  },
  {
    path: 'tailleur',
    loadChildren: () => import('./tailleur/tailleur.module').then( m => m.TailleurPageModule)
  },
  {
    path: 'modif-tailleur',
    loadChildren: () => import('./modif-tailleur/modif-tailleur.module').then( m => m.ModifTailleurPageModule)
  },
  {
    path: 'plomberie',
    loadChildren: () => import('./plomberie/plomberie.module').then( m => m.PlomberiePageModule)
  },
  {
    path: 'residence',
    loadChildren: () => import('./residence/residence.module').then( m => m.ResidencePageModule)
  },
  {
    path: 'modif-residence',
    loadChildren: () => import('./modif-residence/modif-residence.module').then( m => m.ModifResidencePageModule)
  },
  {
    path: 'modif-plomberie',
    loadChildren: () => import('./modif-plomberie/modif-plomberie.module').then( m => m.ModifPlomberiePageModule)
  },
  {
    path: 'vin',
    loadChildren: () => import('./vin/vin.module').then( m => m.VinPageModule)
  },
  {
    path: 'modif-vin',
    loadChildren: () => import('./modif-vin/modif-vin.module').then( m => m.ModifVinPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
