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
          this.vatCharge = this.chargeList["vat"]["charge_value"];
          this.vatChargeUnit = this.chargeList["vat"]["charge_value_unit"];
          this.shippingCharge = this.chargeList["shipping"]["charge_value"];
          this.shippingChargeUnit = this.chargeList["shipping"]["charge_value_unit"];
        },
        error => console.log(error)
      );
  }

  onSubmit(form: NgForm) {
    this.chargeList["vat"]["charge_value"] = form.value.vat;
    this.chargeList["shipping"]["charge_value"] = form.value.shipping;
    console.log(this.chargeList);

    this.chargeService.updateCharge(this.chargeList).subscribe(
      data => {
        console.log(data);
         this.message.class="alert-success show";
         this.message.text="Success! Data has been successfully updated.";
         this.getChargeList();
      },
      error => {
        console.error(error);
         this.message.class="alert-dange show";
        this.message.text="Error! Problem has occurred while updating.Please contact System Admin.";

      }
    );
  }

}
