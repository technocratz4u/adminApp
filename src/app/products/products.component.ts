import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedProduct = {};
  formShow = "hidden";
  formAction = "";

  product1: Product = new Product("RCT1", "RCT 1", "Ruby", 1000);
  product2: Product = new Product("RCT2", "RCT 2", "Ruby", 7080);

  productList = [this.product1, this.product2];

  constructor() { }

  ngOnInit() {
    console.log(this.productList);
  }

  editProduct(product: Product) {
    console.log("Product edited:", product);
    this.selectedProduct = product;
    this.formAction = "Update";
    this.showForm();
  }

  onSubmit(form: NgForm) {
    console.log("Form submitted...");
    console.log(form.value);
  }

  hideForm() {
    this.formShow = "hidden";
  }

  showForm() {
    this.formShow = "show";
  }

  addProduct() {
    console.log("new");
    this.selectedProduct = {};
    this.formAction = "Save";
    this.showForm();
  }

  deleteProduct(product: Product) {
    console.log("Product deleted:", product);
  }

}
