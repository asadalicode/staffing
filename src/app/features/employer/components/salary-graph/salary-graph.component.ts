import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-salary-graph',
  templateUrl: './salary-graph.component.html',
  styleUrls: ['./salary-graph.component.scss'],
})
export class SalaryGraphComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
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
  barChartType: ChartType = 'bar';
  //  barChartPlugins = [
  //   DataLabelsPlugin
  // ];

  barChartData: ChartData<'bar'> = {
    labels: ['60-70k', '80-90k', '100-110k', '120-130k', '140-150'],
    datasets: [
      {
        data: [28, 48, 30, 45, 50],
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
}
