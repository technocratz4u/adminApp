import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class DashboardService {

  constructor(private http: Http) {
  }

  getChartDetails() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost/admin/getChartDetails',{headers:headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUserOrderDetails(userId:any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(userId);
    return this.http.post('http://localhost/admin/getUserOrders',body,{headers:headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
    console.log("error",error);
    return Observable.throw(error.json());
  }
}
