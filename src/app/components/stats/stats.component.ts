import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
        <p class="text-xs uppercase tracking-widest opacity-50 font-sans font-semibold mb-2">Observations</p>
        <div class="flex items-baseline gap-2">
          <span class="text-5xl font-light">{{ dataService.totalObservations() }}</span>
          <span class="text-sm opacity-40 italic">fiches</span>
        </div>
      </div>

      <div class="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
        <p class="text-xs uppercase tracking-widest opacity-50 font-sans font-semibold mb-2">Individus</p>
        <div class="flex items-baseline gap-2">
          <span class="text-5xl font-light">{{ dataService.totalIndividuals() }}</span>
          <span class="text-sm opacity-40 italic">comptés</span>
        </div>
      </div>

      <div class="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
        <p class="text-xs uppercase tracking-widest opacity-50 font-sans font-semibold mb-2">Espèces</p>
        <div class="flex items-baseline gap-2">
          <span class="text-5xl font-light">{{ dataService.speciesCount() }}</span>
          <span class="text-sm opacity-40 italic">taxons</span>
        </div>
      </div>
    </div>
  `
})
export class StatsComponent {
  protected dataService = inject(DataService);
}
