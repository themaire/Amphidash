import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from 'papaparse';
import { Observation } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private observations = signal<Observation[]>([]);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  // Selectors
  readonly allObservations = this.observations.asReadonly();
  readonly isLoading = this.loading.asReadonly();
  readonly errorMessage = this.error.asReadonly();

  // Computed stats
  readonly totalObservations = computed(() => this.observations().length);
  readonly totalIndividuals = computed(() => 
    this.observations().reduce((acc, obs) => acc + (obs.denombrement || 0), 0)
  );
  readonly speciesCount = computed(() => 
    new Set(this.observations().map(obs => obs.nomScientifique)).size
  );

  constructor(private http: HttpClient) {}

  loadData(csvUrl: string) {
    this.loading.set(true);
    this.error.set(null);

    this.http.get(csvUrl, { responseType: 'text' }).subscribe({
      next: (csvData) => {
        parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as any[];
            const mapped: Observation[] = data.map(row => ({
              date: row.date_observation || row.date,
              observateur: row.observateur,
              departement: row.departement,
              commune: row.commune,
              nomScientifique: row.nom_scientifique || row.sc_name,
              nomFrancais: row.nom_francais || row.fr_name,
              stade: row.stade_de_vie || row.stade,
              denombrement: Number(row.nombre_individus || row.count || 0),
              typeDenombrement: row.type_denombrement,
              annee: new Date(row.date_observation || row.date).getFullYear(),
              mois: new Date(row.date_observation || row.date).getMonth() + 1,
              saison: this.getSaison(new Date(row.date_observation || row.date).getMonth() + 1)
            }));
            this.observations.set(mapped);
            this.loading.set(false);
          },
          error: (err: any) => {
            this.error.set('Erreur lors du parsing du CSV: ' + err.message);
            this.loading.set(false);
          }
        });
      },
      error: (err) => {
        this.error.set('Erreur lors du chargement du fichier: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  private getSaison(mois: number): string {
    if (mois >= 3 && mois <= 5) return 'Printemps';
    if (mois >= 6 && mois <= 8) return 'Été';
    if (mois >= 9 && mois <= 11) return 'Automne';
    return 'Hiver';
  }
}
