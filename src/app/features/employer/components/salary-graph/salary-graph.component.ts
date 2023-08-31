import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { SalaryGraphModel, TopTalentEdmModel } from '@app/@shared/dataModels';
import { ApiService } from '@app/@shared/service/api.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {BreakpointObserver} from '@angular/cdk/layout';
@Component({
  selector: 'app-salary-graph',
  templateUrl: './salary-graph.component.html',
  styleUrls: ['./salary-graph.component.scss'],
})
export class SalaryGraphComponent implements OnInit{
  @Input() countryId!: any;
  @Input() roleId!: any;
  @Input() locationId!: any;
  @Input() subClassificationId!: any;
  isError=false;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  graphdata!: any;
  currencySymbol = '$';
  chartDataSet = [];
  salaryRangeData = [];
  backgroundColors = [];
  barChartOptions!: ChartConfiguration['options'];
  barChartData!: ChartData<'bar'>
  barChartType: ChartType = 'bar';
  isMobile = false;

  constructor(private apiService: ApiService, breakpointObserver: BreakpointObserver) { 
    this.isMobile = breakpointObserver.isMatched('(max-width: 768px)');
  }
  
  ngOnInit() {
    this.getSalaryGraph();
  }


  drawChart() {
    this.barChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          // ticks: {
          //   maxTicksLimit:this.isMobile? 3:6
          // }
        },
        
        y: {
          min: 0,
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
      labels: this.isMobile?this.salaryRangeData.slice(0, 6): this.salaryRangeData.slice(0, 6),
      datasets: [
        {
          data: this.isMobile?this.chartDataSet.slice(0, 6) : this.chartDataSet.slice(0, 6),
          backgroundColor: this.backgroundColors,
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
        url: `/api/jobinsights/SalaryComparison?roleId=${this.roleId}&locationId=${this.locationId}&subClassificationId=${this.subClassificationId}&countryId=${this.countryId}`,
        model: SalaryGraphModel,
      })
      .subscribe({
        next: async (res) => {
          this.graphdata = res.data;
          this.currencySymbol = this.graphdata.currency.symbol;

          let sortChartData:any = await this.graphdata.chartData.sort((a: any, b: any) => { return a.minSalary - b.minSalary });

          this.chartDataSet = sortChartData.map((e: any) => {
            return e.quantity;
          });

          console.log(this.chartDataSet);

          this.salaryRangeData = sortChartData.map((e: any) => {
            return `$${e.minSalary}- $${e.maxSalary}`
          });

          this.backgroundColors = sortChartData.map((e: any) => {
            return e.isAverageSalary ? '#AA1D35' : 'rgba(210, 210, 210, 1)';
          });

          this.isError=false;
          this.drawChart();
         
          // this.barChartData.datasets.data = this.graphdata.
            console.log('salary graph data:', res);
        },
        error: (error) => {
          console.log("@@@@")
          this.isError=true;
        },
      });
  }

 

}
