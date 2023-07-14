import { Component, ViewChild, OnInit } from '@angular/core';
import { SalaryGraphModel, TopTalentEdmModel } from '@app/@shared/dataModels';
import { ApiService } from '@app/@shared/service/api.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-salary-graph',
  templateUrl: './salary-graph.component.html',
  styleUrls: ['./salary-graph.component.scss'],
})
export class SalaryGraphComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  graphdata!: any;
  currencySymbol = '$';
  chartDataSet = [];
  barChartOptions!: ChartConfiguration['options'];
  barChartData!: ChartData<'bar'>
  barChartType: ChartType = 'bar';

  constructor(private apiService: ApiService) { }
  
  ngOnInit() {
    this.getSalaryGraph();
  }


  drawChart() {
    this.barChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          min: 10,
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    this.barChartData = {
      labels: ['0-15000', '16000-25000', '100-110k', '120-130k', '140-150k'],
      datasets: [
        {
          data: this.chartDataSet,
          backgroundColor: [
            'rgba(210, 210, 210, 1)',
            '#AA1D35',
            'rgba(210, 210, 210, 1)',
            'rgba(210, 210, 210, 1)',
            'rgba(210, 210, 210, 1)',
          ],
        },
      ],
    };
  }
 




  // events
  chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }

  randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }


  getSalaryGraph() {
    this.apiService
      .getAPI({
        url: `/api/jobinsights/SalaryComparison?roleId=2311&locationId=192004&subClassificationId=0&countryId=249`,
        model: SalaryGraphModel,
      })
      .subscribe({
        next: (res) => {
          this.graphdata = res.data;
          this.currencySymbol = this.graphdata.currency.symbol;
          this.chartDataSet = this.graphdata.chartData.map((e: any) => {
            return e.quantity;
          });
          this.drawChart();
          // this.barChartData.datasets.data = this.graphdata.
            console.log('salary graph data:', res);
        },
        error: (error) => {
        },
      });
  }

 

}
