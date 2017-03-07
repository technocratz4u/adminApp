import { RouterModule, Routes } from '@angular/router';

import { ProductTypeComponent } from "./product-type/product-type.component";
import { ProductsComponent } from "./products/products.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrdersComponent } from "./orders/orders.component";

const APP_ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'productType', component: ProductTypeComponent},
  {path: 'products', component: ProductsComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
