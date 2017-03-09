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
  labels = [];
  datasets: any;
  dataPoints = [];
  data: any;
  options: any;

  constructor(private dashboardService: DashboardService) {
    this.data = {
      labels: this.labels,
      datasets: [{
        label: 'Number of Orders',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        data: this.dataPoints
      }]
    };

    this.options = {
      scales: {
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
          if (this.labels.indexOf(entry.monthName) === -1) {
            this.labels.push(entry.monthName);
            this.dataPoints.push(+entry.orderCount);
          }
        }
        this.updateChart();
      },
      error => console.log(error)
    );
  }

  updateChart() {
    this.chart.refresh();
  }


}
