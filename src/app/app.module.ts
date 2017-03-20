import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ChartModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { ProductsComponent } from './products/products.component';

import { routing } from "./app.routing";
import { DashboardComponent } from './dashboard/dashboard.component';

import {ProductService} from './services/product.service';
import {ProductTypeService} from './services/productType.service';
import {OrderService} from './services/order.service';
import {DashboardService} from './services/dashboard.service';
import { OrdersComponent } from './orders/orders.component';
import { ChargesComponent } from './charges/charges.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarComponent,
    ProductTypeComponent,
    MainBodyComponent,
    ProductsComponent,
    DashboardComponent,
    OrdersComponent,
    ChargesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ChartModule
  ],
  providers: [ProductService,ProductTypeService,OrderService,DashboardService],

  bootstrap: [AppComponent]
})
export class AppModule { }
