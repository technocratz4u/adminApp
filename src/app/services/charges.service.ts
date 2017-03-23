import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ChargeService {

  constructor(private http: Http) {
  }

  getChargeDetails() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost/admin/populateCharges',{headers:headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateCharge(charge: any) {
    const body = JSON.stringify(charge);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost/admin/updateCharge', body, {
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
