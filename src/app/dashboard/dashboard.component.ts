import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { UIChart } from 'primeng/primeng';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;
  monthlySalesLabels = [];
  monthlySalesDatasets= [];
  dataPoints = [];
  monthlySalesData: any;
  options: any;

  constructor(private dashboardService: DashboardService) {
    this.monthlySalesData = {
      labels: this.monthlySalesLabels,
      datasets: this.monthlySalesDatasets
    };

    this.options = {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Monthly Sales'
      },
      legend: {
        position: 'bottom'
      }
    }

  }

  ngOnInit() {
    this.getMonthlySales();
  }

  getMonthlySales() {
    this.dashboardService.getChartDetails().subscribe(
      response => {
        console.log(response);

        for (let entry of response) {
          if (this.monthlySalesLabels.indexOf(entry.monthName) === -1) {
            this.monthlySalesLabels.push(entry.monthName);
            this.dataPoints.push(+entry.orderCount);
          }
        }
        this.monthlySalesDatasets.push({
          label: 'Number of Orders',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.dataPoints
        });
        this.updateChart();
      },
      error => console.log(error)
    );
  }

  updateChart() {
    this.chart.refresh();
  }


}
