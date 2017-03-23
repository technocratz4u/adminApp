import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ChargeService} from '../services/charges.service'

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {

  chargeList = [];
  vatCharge = 0;
  vatChargeUnit: string;
  shippingCharge = 0;
  shippingChargeUnit: string;
  message = {
    class:"hidden",
    text:""
  }

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
    this.getChargeList();
  }

  getChargeList(){
       this.chargeService.getChargeDetails().subscribe(
        response => {
          this.chargeList = response;
        },
        error => console.log(error)
      );
  }

  onSubmit(charge:any) {

    this.chargeService.updateCharge(charge).subscribe(
      data => {
         this.message.class="alert-success show";
         this.message.text="Success! Data has been successfully updated.";
      },
      error => {
         this.message.class="alert-dange show";
        this.message.text="Error! Problem has occurred while updating.Please contact System Admin.";

      }
    );
  }

}
