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
  @ViewChild('userchart') userchart:UIChart;

  monthlySalesLabels = [];
  salesDatasets= [];
  topfiveUserLabels = [];
  topfiveUserSalesDatasets= [];
  tableShow = "hidden";
  dataPoints = [];
  dataPointsNumberOfOrders = [];
  salesDataPoints = [];
  ordersDataPoints = [];
  currentYearSalesData: any;
  fivetopUsersalesData: any;
  options: any;
  optionsUserchart:any;
  userdateArr = [];
  userDataJson = {};
  ordersList = [];
  backgroundColors= [
                "#524f96",
                "#a8a6dd",
                "#c9c9cc",
                "#5f5f6b",
                "#166066",
                "#e4cbf4",
                "#5f347a",
                "#330c4c",
                "#dbbed9",
                "#7c6a7b",
                "#592d56",
                "#d69aa8"
            ];

  constructor(private dashboardService: DashboardService) {
    this.currentYearSalesData = {
      labels: this.monthlySalesLabels,
      datasets: this.salesDatasets
    };

    this.fivetopUsersalesData = {
      labels: this.topfiveUserLabels,
      datasets: this.topfiveUserSalesDatasets
    }



    this.options = {
      scales: {
        xAxes: [{
          stacked: false
        }],
        yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
      },
      title: {
        display: true,
        text: 'Monthly Sales in USD'
      }
    }

    this.optionsUserchart = {
     scales: {
        xAxes: [{
          stacked: false
        }],
        yAxes: [{
        id: 'Total Sales',
        type: 'linear',
        position: 'left',
        scaleLabel: {
        display: true,
        labelString: 'Sales in USD'
      }
      }, {
        id: 'Total Orders',
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true
        }, scaleLabel: {
        display: true,
        labelString: 'Number of Orders'
      }
      }]
      },
      title: {
        display: true,
        text: 'Top Five User Sales Data'
      },
      legend: {
        position: 'bottom'
      }
    }

  }

  ngOnInit() {
    this.getReportData();
  }

  getReportData() {
    this.dashboardService.getChartDetails().subscribe(
      response => {
        console.log(response.currentYearSalesData);
        console.log(response.topfiveUserSalesData)

        /* Current Year Sales */
        for (let entry of response.currentYearSalesData) {
          if (this.monthlySalesLabels.indexOf(entry.monthName) === -1) {
            this.monthlySalesLabels.push(entry.monthName);
            this.dataPoints.push(+entry.totalsales);
          }
        }
        this.salesDatasets.push({
          type: 'line',
          label: 'Current Year Sales',
          fill: false,
          borderColor: '#524f96',
          backgroundColor: '#524f96',
          data: this.dataPoints
        });
        this.updateCharts();

        /* Last Year Sales */
        this.monthlySalesLabels = [];
        this.dataPoints = [];
        for (let entry of response.lastYearSalesData) {
          if (this.monthlySalesLabels.indexOf(entry.monthName) === -1) {
            this.monthlySalesLabels.push(entry.monthName);
            this.dataPoints.push(+entry.totalsales);
          }
        }
        this.salesDatasets.push({
          type: 'line',
          label: 'Last Year Sales',
          fill: false,
          borderColor: '#d69aa8',
          backgroundColor: '#d69aa8',
          data: this.dataPoints
        });
        console.log(this.salesDatasets);
        this.updateCharts();

        /* Top five user sales chart dataset */

        for (let entry of response.topfiveUserSalesData) {
         
          if (this.topfiveUserLabels.indexOf(entry.username) === -1) {
            this.userDataJson[entry.username] = entry.user_id;
            this.topfiveUserLabels.push(entry.username);
            this.salesDataPoints.push(entry.totalsales);
            this.ordersDataPoints.push(entry.totalorders);
            //this.userdateArr.push(this.userDataJson);
          }
        }
        this.topfiveUserSalesDatasets.push({
          label: 'Total Sales',
          yAxisID: 'Total Sales',
          backgroundColor: '#7CB342',
          borderColor: '#7CB342',
          data: this.salesDataPoints
        });
        this.topfiveUserSalesDatasets.push({
          label: 'Total Orders',
          yAxisID: 'Total Orders',
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          data: this.ordersDataPoints
        });

        console.log("userdata",this.userDataJson);
        this.updateCharts();
      },
      error => console.log(error)
    );
  }

  updateCharts() {
    this.chart.refresh();
    this.userchart.refresh();
  }

 selectData(event) {
  console.log(event.element._model.label);
  console.log(this.userDataJson[event.element._model.label]);
  this.dashboardService.getUserOrderDetails(this.userDataJson[event.element._model.label]).subscribe(
      response => {
        console.log(response.orders);
        this.ordersList = response.orders;
        this.tableShow = "show";
      },
      error => console.log(error)
    );

}



}
