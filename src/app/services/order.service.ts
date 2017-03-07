import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class OrderService {

  constructor(private http: Http) {
  }

  getOrderList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost/admin/populateOpenOrders',{headers:headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  } 

  private handleError (error: any) {
    console.log("error",error);
    return Observable.throw(error.json());
  }
}
