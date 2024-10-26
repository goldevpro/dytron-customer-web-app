// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' }, // Default route redirects to customers list
  { path: 'customers', component: CustomerListComponent }, // Route to list customers
  { path: 'add-customer', component: CustomerFormComponent }, // Route to add a new customer
  { path: 'edit-customer/:id', component: CustomerFormComponent }, // Route to edit a customer
  { path: '**', redirectTo: '/customers' } // Wildcard route redirects to customer list if path not found
];

export const appRoutingProviders = [provideRouter(routes)];
