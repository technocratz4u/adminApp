import { RouterModule, Routes } from '@angular/router';

import { ProductTypeComponent } from "./product-type/product-type.component";
import { ProductsComponent } from "./products/products.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrdersComponent } from "./orders/orders.component";
import { ChargesComponent } from "./charges/charges.component";

const APP_ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'productType', component: ProductTypeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'charges', component: ChargesComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
