import { Component, inject, ElementRef, ViewChild, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-species-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer class="w-full h-[300px]"></div>`
})
export class SpeciesChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private dataService = inject(DataService);

  constructor() {
    effect(() => {
      const data = this.dataService.allObservations();
      if (data.length > 0 && this.chartContainer) {
        this.createChart();
      }
    });
  }

  ngAfterViewInit() {
    if (this.dataService.allObservations().length > 0) {
      this.createChart();
    }
  }

  private createChart() {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove();

    const data = this.dataService.allObservations();
    const speciesData = d3.rollups(
      data,
      v => v.length,
      d => d.nomFrancais || d.nomScientifique
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

    const margin = { top: 20, right: 20, bottom: 40, left: 120 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(speciesData, d => d[1]) || 0])
      .range([0, width]);

    const y = d3.scaleBand()
      .range([0, height])
      .domain(speciesData.map(d => d[0]))
      .padding(0.2);

    svg.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll('text')
      .style('font-family', 'Inter')
      .style('font-size', '11px')
      .style('opacity', 0.7);

    svg.selectAll('rect')
      .data(speciesData)
      .enter()
      .append('rect')
      .attr('x', x(0))
      .attr('y', d => y(d[0])!)
      .attr('width', d => x(d[1]))
      .attr('height', y.bandwidth())
      .attr('fill', '#1A1A1A')
      .attr('rx', 4);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll('text')
      .style('font-family', 'JetBrains Mono')
      .style('font-size', '10px');
  }
}
