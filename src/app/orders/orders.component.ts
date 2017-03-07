import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orderList = [];
  order = {};

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList(){
       this.orderService.getOrderList().subscribe(
        response => {
          this.orderList = response;
          console.log(this.orderList);
        },
        error => console.log(error)
      );
  }

  updateStatus(order: any){
    this.order = order;
    console.log(order);
  }

}