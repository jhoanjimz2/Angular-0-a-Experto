import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styles: [
  ]
})
export class GraficaBarraComponent {

  @Input() horizontal: boolean = false;


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'] = { responsive: true };
  public barChartType: ChartType = 'bar';


  @Input() barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A', backgroundColor: '#5C3CFA', hoverBackgroundColor: 'blue' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B', backgroundColor: '#3547DE', hoverBackgroundColor: 'blue' },
      { data: [ 18, 14, 30, 29, 16, 37, 20 ], label: 'Series C', backgroundColor: '#4685F5', hoverBackgroundColor: 'blue' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    if ( this.horizontal ) {
      this.barChartType = 'bar';
    }
  }

}
