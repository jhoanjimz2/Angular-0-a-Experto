import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../services/graficas.service';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {


  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: []
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private graficasService: GraficasService
  ) { }

  ngOnInit(): void {

    this.graficasService.getUsuariosRedesSocialesDonaData().subscribe( ( { labels, values } )=> {
      /* 
      const labels = Object.keys(data);
      const values = Object.values(data);
      this.doughnutChartData.labels = labels;
      this.doughnutChartData.datasets.push( { data: values } ); */

      this.doughnutChartData.labels = labels;
      this.doughnutChartData.datasets.push( { data: values } );

    });

  }

}
