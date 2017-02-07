import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

selectedProduct={};

  product1 = {
    name: "RCT1",
    description: "RCT 1",
    type: "Ruby",
    quantity: 1000
  };
  product2 = {
    name: "RCT2",
    description: "RCT 2",
    type: "Ruby",
    quantity: 5500
  };

  productList = [this.product1, this.product2];

  constructor() { }

  ngOnInit() {
    console.log(this.productList);
  }

  editProduct(product: string) {
    console.log("Product edited:", product);
    this.selectedProduct = product;
  }

  onSubmit(form: NgForm) {
    console.log("Form submitted...");
    console.log(form.value);
  }

  resetForm(form: NgForm) {
    form.reset();
  }

}
