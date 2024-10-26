import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:5057';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/GetCustomers`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/GetCustomerById?id=${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    console.log('customerObject customer service', customer);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Customer>(`${this.apiUrl}/AddCustomer`, customer, {
      headers,
    });
  }

  updateCustomer(customerId: number, customer: Customer): Observable<Customer> {
    console.log('customerObject customer service', customerId);
    customer.Id = customerId;
    return this.http.put<Customer>(`${this.apiUrl}/UpdateCustomer`, customer);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/DeleteCustomer/${id}`);
  }
}
