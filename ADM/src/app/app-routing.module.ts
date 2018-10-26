import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersInsertComponent } from './users-insert/users-insert.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

const appRoutes: Routes = [
  { path: 'users', component: UsersListComponent},
  { path: 'users/insert', component: UsersInsertComponent},
  { path: 'users/edit/:id', component: UsersEditComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }
export const routingComponents = [ UsersListComponent, UsersInsertComponent, UsersEditComponent ]
