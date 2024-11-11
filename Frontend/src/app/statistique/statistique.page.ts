import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.page.html',
  styleUrls: ['./statistique.page.scss'],
})
export class StatistiquePage implements OnInit, OnDestroy {
  alert: any;
  oldalert: any;
  villeStats: {};
  serviceStats: {};

  private entrepriseChart: Chart | null = null;
  private statChart: Chart | null = null;

  constructor(
    private _apiService: ApiService,
    private loadingCtrl: LoadingController,
  ) {
     // Enregistrer les composants nécessaires de Chart.js
     Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadalert();
  }

  ngOnDestroy() {
    // Détruire les instances de graphique existantes pour libérer la mémoire
    if (this.entrepriseChart) {
      this.entrepriseChart.destroy();
      this.entrepriseChart = null;
    }
    if (this.statChart) {
      this.statChart.destroy();
      this.statChart = null;
    }
  }

  async loadalert() {
    this.oldalert = this.alert;
    const loading = await this.loadingCtrl.create({
      message: 'Rechargement...',
      spinner: 'lines',
      cssClass: 'custom-loading',
    });

    await loading.present();

    try {
      const res: any = await this._apiService.loadalert_statistique().toPromise();
    //   console.log('SUCCESS ===', res);

      if (res && res.length > 0) {
        this.alert = res;

        // Organiser les données pour les statistiques
        this.villeStats = {};
        this.serviceStats = {};

        res.forEach((alert: any) => {
          const ville = alert.ville.trim().toLowerCase().replace(/\s+/g, ' ');
          const service = alert.service.trim().toLowerCase().replace(/\s+/g, ' ');

          // Statistiques par ville
          this.villeStats[ville] = (this.villeStats[ville] || 0) + 1;

          // Statistiques par service
          this.serviceStats[service] = (this.serviceStats[service] || 0) + 1;
        });

      } else {
        this.alert = 'aucune_alerte';
      }

      loading.dismiss();
    } catch (error) {
      if (this.oldalert && this.oldalert.length > 0) {
        this.alert = this.oldalert;
      } else {
        this.alert = 'erreur_chargement';
      }
      // console.log('Erreur de chargement', error);
      loading.dismiss();
    }
    this.createChart();
    this.createBarChart();
    // console.log('fonction char appelé');
  }

  createBarChart() {
    // Vérifier et détruire l'instance précédente si elle existe
    if (this.entrepriseChart) {
      this.entrepriseChart.destroy();
    }

    const ctx = document.getElementById('entrepriseChart') as HTMLCanvasElement;
    if (ctx) {
      this.entrepriseChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(this.villeStats),
          datasets: [{
            label: '',
            data: Object.values(this.villeStats),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createChart() {
    // Vérifier et détruire l'instance précédente si elle existe
    if (this.statChart) {
      this.statChart.destroy();
    }

    const ctx = document.getElementById('statChart') as HTMLCanvasElement;
    if (ctx) {
      this.statChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.serviceStats),
          datasets: [{
            label: '',
            data: Object.values(this.serviceStats),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  async refreshPage(e: any) {
    await this.loadalert();
    //  console.log('Rafraîchissement de la page');
    e.target.complete();
  }
}
