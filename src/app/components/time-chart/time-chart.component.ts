import { Component, inject, ElementRef, ViewChild, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-time-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer class="w-full h-[300px]"></div>`
})
export class TimeChartComponent implements AfterViewInit {
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
    const timeData = d3.rollups(
      data,
      v => v.length,
      d => d.annee
    ).sort((a, b) => a[0] - b[0]);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
      .domain(timeData.map(d => d[0].toString()))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(timeData, d => d[1]) || 0])
      .range([height, 0]);

    const line = d3.line<any>()
      .x(d => x(d[0].toString())!)
      .y(d => y(d[1]))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(timeData)
      .attr('fill', 'none')
      .attr('stroke', '#1A1A1A')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll('circle')
      .data(timeData)
      .enter()
      .append('circle')
      .attr('cx', d => x(d[0].toString())!)
      .attr('cy', d => y(d[1]))
      .attr('r', 4)
      .attr('fill', 'white')
      .attr('stroke', '#1A1A1A')
      .attr('stroke-width', 2);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-family', 'JetBrains Mono')
      .style('font-size', '10px');

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .style('font-family', 'JetBrains Mono')
      .style('font-size', '10px');
  }
}
