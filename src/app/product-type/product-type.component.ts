import { Component, OnInit } from '@angular/core';
import {ProductTypeService} from '../services/productType.service'
import { ProductType } from './productType';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

categoryList = [];
parentCategoryList = [];
formAction ="";
selectedProduct = {};
formShow = "hidden";
deletedProduct: ProductType;

message = {
  class:"hidden",
  text:""
}

 constructor(private ProductTypeService: ProductTypeService) {}

  ngOnInit() {

     this.ProductTypeService.getCategoryData()
      .subscribe(
        response => this.categoryList = response,
        error => console.log(error)
      );

      this.getParentCategories();
    
    console.log(this.categoryList);
  }

  editProductType(productType: ProductType) {
    console.log("Product edited:", productType);
    this.selectedProduct = productType;
    this.formAction = "Update";
    this.getParentCategories();
    this.showForm();
  }

  onSubmit(form: NgForm) {
    if(this.formAction =="Update" ){
    this.ProductTypeService.updateProductType(form.value).subscribe(
      data => {console.log(data);
         this.message.class="alert-success show";
         this.message.text="Success! Data has been successfully updated.";
         this.getCategories();} ,
      error => {console.error(error);
                this.message.class="alert-dange show";
                this.message.text="Error! Problem has occurred while updating.Please contact System Admin.";
           }
    );
  }else if (this.formAction =="Save"){
    this.ProductTypeService.createProductType(form.value).subscribe(
      data => {console.log(data);
        this.message.class="alert-success show";
        this.message.text="Success! Data has been successfully inserted.";
        this.getCategories();},
      error => {console.error(error);
                this.message.class="alert-dange show";
                this.message.text="Error! Problem has occurred while inserting.Please contact System Admin.";
      }
    );

  }
     
  }

  hideForm() {
    this.formShow = "hidden";
  }

  showForm() {
    this.formShow = "show";
  }

  addProductType() {
    console.log("new");
    this.selectedProduct = {};
    this.formAction = "Save";
    this.showForm();
  }

  deleteProductType() {
    this.ProductTypeService.deleteProductType(this.deletedProduct).subscribe(
      data => { console.log(data);
        this.message.class="alert-success show";
         this.message.text="Success! Data has been successfully deleted.";
         this.getCategories();} ,
      error => {
        console.error(error);
        this.message.class="alert-dange show";
        this.message.text="Error! Problem has occurred while deleting.Please contact System Admin.";
      }
    );
    console.log("Product deleted:", this.deletedProduct);
    this.deletedProduct = null;
  }
  getParentCategories() {
    this.ProductTypeService.getParentCategoryData().subscribe(
      data => this.parentCategoryList = data,
      error => console.log(error)
    );
  }

  getCategories(){
    this.ProductTypeService.getCategoryData()
      .subscribe(
        response => this.categoryList = response,
        error => console.log(error)
    );
  }


}
