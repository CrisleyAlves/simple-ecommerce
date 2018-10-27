import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersInsertComponent } from './users/users-insert/users-insert.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsInsertComponent } from './products/products-insert/products-insert.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';

const appRoutes: Routes = [
  { path: 'users', component: UsersListComponent},
  { path: 'users/insert', component: UsersInsertComponent},
  { path: 'users/edit/:id', component: UsersEditComponent},
  { path: 'products', component: ProductsListComponent},
  { path: 'products/insert', component: ProductsInsertComponent},
  { path: 'products/edit/:id', component: ProductsEditComponent},
  { path: 'orders', component: OrdersListComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }
export const routingComponents = [ 
  UsersListComponent, UsersInsertComponent, UsersEditComponent,
  ProductsListComponent, ProductsInsertComponent, ProductsEditComponent,
  OrdersListComponent
 ]
