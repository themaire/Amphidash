import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-observation-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-black/10">
            <th class="py-4 px-2 text-[10px] uppercase tracking-widest opacity-40 font-sans font-bold">Date</th>
            <th class="py-4 px-2 text-[10px] uppercase tracking-widest opacity-40 font-sans font-bold">Espèce</th>
            <th class="py-4 px-2 text-[10px] uppercase tracking-widest opacity-40 font-sans font-bold">Commune</th>
            <th class="py-4 px-2 text-[10px] uppercase tracking-widest opacity-40 font-sans font-bold">Stade</th>
            <th class="py-4 px-2 text-[10px] uppercase tracking-widest opacity-40 font-sans font-bold text-right">Nombre</th>
          </tr>
        </thead>
        <tbody>
          @for (obs of dataService.allObservations().slice(0, 10); track $index) {
            <tr class="border-b border-black/5 hover:bg-black/[0.02] transition-colors group">
              <td class="py-4 px-2 font-mono text-xs opacity-60">{{ obs.date | date:'dd/MM/yyyy' }}</td>
              <td class="py-4 px-2">
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ obs.nomFrancais || 'Inconnu' }}</span>
                  <span class="text-[10px] italic opacity-50">{{ obs.nomScientifique }}</span>
                </div>
              </td>
              <td class="py-4 px-2 text-sm opacity-70">{{ obs.commune }} ({{ obs.departement }})</td>
              <td class="py-4 px-2">
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-black/5 uppercase tracking-tighter">{{ obs.stade || 'N/A' }}</span>
              </td>
              <td class="py-4 px-2 text-right font-mono font-bold">{{ obs.denombrement }}</td>
            </tr>
          }
        </tbody>
      </table>
      @if (dataService.allObservations().length === 0) {
        <div class="py-12 text-center italic opacity-30">Aucune donnée chargée</div>
      }
    </div>
  `
})
export class ObservationListComponent {
  protected dataService = inject(DataService);
}
