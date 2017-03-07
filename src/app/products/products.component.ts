import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './product';
import {ProductImage} from './productImage';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


selectedProduct = {};
formShow = "hidden";
formImageShow = "hidden";
showClass = "show";
hideClass = "hidden";
formEditImageLink = "Edit Product Images";
productList = [];
formAction ="";
masterdataList = [];
categoryList = [];
originList = [];
treatmentList = [];
deletedProduct: Product;
productImage:ProductImage;
file:File;
frontimageUrl = "http://localhost";
rightimageUrl = "http://localhost";
leftimageUrl = "http://localhost";
backimageUrl = "http://localhost";
message = {
  class:"hidden",
  text:""
}

imageMessage = "hidden";
editImageclass = "hidden";

productImageJson = {
  productId:'',
  type:'',
  imageFile:''
}

  //product1: Product = new Product("RCT1","RCT 1","Ruby",1000);
  //product2: Product = new Product("RCT2","RCT 2","Ruby",7080);
  
/*productList = [{"productId":"1","productCode":"RCT-1","productName":"Ruby Cut","shape":"Round","quantity":"17","dimensions":"8 mm","caratWeight":"10.00000","color":"Red","meanRating":"4.5","price":"500.000","currency":"USD"
,"is_deleted":"N"},{"productId":"2","productCode":"SCT-1","productName":"Sapphire Cut","shape":"Square"
,"quantity":"20","dimensions":"2.5 - 3.2 mm","caratWeight":"30.00000","color":"Green","meanRating":"4.4","price":"450.000","currency":"USD","is_deleted":"N"},{"productId":"3","productCode":"RCB","productName":"Ruby Cabochon","shape":"Oval\/Pears","quantity":"8","dimensions":"7x5 mm","caratWeight":"5.00000","color":"Red","meanRating":"4.2","price":"200.000","currency":"USD","is_deleted":"N"},{"productId":"4","productCode":"SCB","productName":"Sapphire Cabochon","shape":"Oval","quantity":"17","dimensions":"8x6 mm","caratWeight":"20.00000","color":"Green","meanRating":"4.5","price":"200.000","currency":"USD","is_deleted":"N"},
{"productId":"5","productCode":"PER 1","productName":"Peridot Faceted","shape":"Donut","quantity":"20"
,"dimensions":"8 cm","caratWeight":"600.00000","color":"Light Green","meanRating":"4.5","price":"500.000","currency":"USD","is_deleted":"N"},{"productId":"6","productCode":"PER 2","productName":"PeridotFaceted","shape":"Square","quantity":"17","dimensions":"8 cm","caratWeight":"300.00000","color":"Light Green","meanRating":"4.4","price":"450.000","currency":"USD","is_deleted":"N"},{"productId":"7","productCode":"PER 3","productName":"Peridot Faceted","shape":"Oval\/Pears","quantity":"20","dimensions":"8 cm","caratWeight":"500.00000","color":"Light Green","meanRating":"4.2","price":"300.000","currency":"USD","is_deleted":"N"},{"productId":"8","productCode":"PER 4","productName":"Peridot Faceted","shape":"Oval","quantity":"20","dimensions":"8 cm","caratWeight":"800.00000","color":"Light Green","meanRating":"4.5","price":"200.000","currency":"USD","is_deleted":"N"}]
;*/
    constructor(private productService: ProductService) {}

  ngOnInit() {

    this.productService.getProductData().subscribe(
        response => {this.productList = response; console.log(response);
          
        },
        error => console.log(error)
      );
   // this.getProductMasterData();
    
    console.log(this.productList);
  }

  getProductList(){
       this.productService.getProductData().subscribe(
        response => {this.productList = response; console.log(response);
          
        },
        error => console.log(error)
      );
  }

  editProduct(product: Product) {
    console.log("Product edited:", product);
    this.selectedProduct = product;
    this.formAction = "Update";
    this.showForm();
    this.editImageclass = "show";
    this.imageMessage = "hidden";
    console.log(this.frontimageUrl);
  }

  editProductImages() {
    console.log("Product images edited:");
    if(this.formImageShow == this.showClass){
      this.formImageShow = this.hideClass;
      this.formEditImageLink = "Edit Product Images";
    }else if(this.formImageShow == this.hideClass){
      this.formImageShow = this.showClass;
      this.formEditImageLink = "Hide Product Images";
    }
    
  }

  onSubmit(form: NgForm) {
    if(this.formAction =="Update" ){
    this.productService.updateProduct(form.value).subscribe(
      data => {
        console.log(data);
         this.message.class="alert-success show";
         this.message.text="Success! Data has been successfully updated.";
         this.getProductList();
      },
      error => {
        console.error(error);
         this.message.class="alert-dange show";
        this.message.text="Error! Problem has occurred while updating.Please contact System Admin.";

      }
    );
  }else if (this.formAction =="Save"){
    this.productService.createProduct(form.value).subscribe(
      data => {
        console.log(data);
         this.message.class="alert-success show";
         this.message.text="Success! Data has been successfully inserted.";
         this.getProductList();
      },
      error => {
        console.error(error);
         this.message.class="alert-dange show";
        this.message.text="Error! Problem has occurred while updating.Please contact System Admin.";

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

  addProduct() {
    console.log("new");
    this.selectedProduct = {};
    this.formAction = "Save";
    this.showForm();
    this.imageMessage = "show";
    
  }


  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(      data => {
        console.log(data);
         this.message.class="alert-success show";
         this.message.text="Success! Data has been successfully deleted.";
         this.getProductList();
      },
      error => {
        console.error(error);
         this.message.class="alert-dange show";
        this.message.text="Error! Problem has occurred while updating.Please contact System Admin.";

      }
    );
    console.log("Product deleted:", product);
  }
  
  getProductMasterData(){
    this.productService.getProductMasterData().subscribe(
      response => {
        this.masterdataList = response;
        this.categoryList = this.masterdataList["category"];
        this.originList = this.masterdataList["origin"];
        this.treatmentList = this.masterdataList["treatment"];
      },
      error => console.log(error)
    );

  }

 fileChangeEvent(fileInput: any,type: any,id:any){
      let fileList: FileList = fileInput.target.files;
      if(fileList.length > 0){
        this.file = fileList[0];
      }
        this.productImageJson.type = type;
        this.productImageJson.productId=id;
     }

  upload(){
          this.productService.uploadFile(this.productImageJson,this.file).subscribe(
            response => {
            this.getProductList();
            this.frontimageUrl += this.selectedProduct["images"].image_url.front+'?random+\=' + Math.random();
            this.rightimageUrl += this.selectedProduct["images"].image_url.right+'?random+\=' + Math.random();
            this.leftimageUrl += this.selectedProduct["images"].image_url.left+'?random+\=' + Math.random();
            this.backimageUrl += this.selectedProduct["images"].image_url.back+'?random+\=' + Math.random();
            },
            error => console.log(error)
            );
              console.log(this.productImageJson);
  }

  



}
