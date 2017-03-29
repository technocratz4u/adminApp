import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProductTypeService {

  constructor(private http: Http) {
  }

  getCategoryData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost/admin/populateCategory',{headers:headers})
      .map((response: Response) => response.json());
  }

  updateProductType(productType: any) {
    const body = JSON.stringify(productType);
    console.log("datasent for updating",body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost/admin/updateCategory', body, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError);
  }

    createProductType(product: any) {
    const body = JSON.stringify(product);
    console.log("datasent for inserting",body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost/admin/createCategory', body, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError);
  }

    deleteProductType(product: any) {
    const body = JSON.stringify(product);
    console.log("datasent for deletion",body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost/admin/deleteCategory', body, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    console.log("error",error);
    return Observable.throw(error.json());
  }

    getParentCategoryData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost/admin/populateParentCategories',{headers:headers})
      .map((response: Response) => response.json());
  }

  uploadFile(file :any){
      let formData:FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
       headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post("http://localhost/uploadImage", formData, options)
            .map((response: Response) => response.json());
  }
}
