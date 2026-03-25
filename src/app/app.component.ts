import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  template: `
    <div class="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-serif">
      <header class="border-b border-black/10 py-6 px-8 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 class="text-3xl font-light tracking-tight italic">AmphiDash</h1>
          <p class="text-xs uppercase tracking-widest opacity-60">Observatoire des Amphibiens — SINP Data</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xs font-mono bg-black text-white px-2 py-1 rounded">v1.0.0</span>
        </div>
      </header>

      <main class="p-8">
        <app-dashboard></app-dashboard>
      </main>

      <footer class="border-t border-black/10 py-8 px-8 mt-12 text-center">
        <p class="text-sm opacity-50 italic">Données d'observation naturalistes — Format SINP</p>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {}
