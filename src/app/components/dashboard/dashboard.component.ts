import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { StatsComponent } from '../stats/stats.component';
import { SpeciesChartComponent } from '../species-chart/species-chart.component';
import { TimeChartComponent } from '../time-chart/time-chart.component';
import { ObservationListComponent } from '../observation-list/observation-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsComponent,
    SpeciesChartComponent,
    TimeChartComponent,
    ObservationListComponent
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-700">
      <!-- Stats Row -->
      <app-stats></app-stats>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Charts -->
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-black/5">
          <h3 class="text-sm uppercase tracking-widest opacity-50 mb-6 font-sans font-semibold">Répartition par Espèce</h3>
          <app-species-chart></app-species-chart>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-black/5">
          <h3 class="text-sm uppercase tracking-widest opacity-50 mb-6 font-sans font-semibold">Évolution Temporelle</h3>
          <app-time-chart></app-time-chart>
        </div>
      </div>

      <!-- List -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-black/5">
        <h3 class="text-sm uppercase tracking-widest opacity-50 mb-6 font-sans font-semibold">Dernières Observations</h3>
        <app-observation-list></app-observation-list>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);

  ngOnInit() {
    // On charge un CSV d'exemple (Picsum n'est pas pour CSV, on simule ou on utilise un vrai lien si possible)
    // Pour la démo, on va générer des données si le CSV échoue ou utiliser un placeholder
    this.dataService.loadData('https://raw.githubusercontent.com/datapackage-examples/sample-csv/master/sample.csv'); 
    // Note: Dans un cas réel, l'utilisateur fournirait son fichier SINP
  }
}
