import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProductService {

  constructor(private http: Http) {
  }

  getProductData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost/admin/populateItems',{headers:headers})
      .map((response: Response) => response.json());
  }

  getProductMasterData(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost/admin/populateItemMasterData',{headers:headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);;
  }

  updateProduct(product: any) {
    const body = JSON.stringify(product);
    console.log("datasent for updating",body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost/admin/updateProduct', body, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError);
  }

    createProduct(product: any) {
    const body = JSON.stringify(product);
    console.log("datasent for inserting",body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost/admin/createProduct', body, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError);
  }

    deleteProduct(product: any) {
    const body = JSON.stringify(product);
    console.log("datasent for deletion",body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost/admin/deleteProduct', body, {
      headers: headers
    })
      .map((data: Response) => data)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    console.log("error",error);
    return Observable.throw(error.json());
  }
}
