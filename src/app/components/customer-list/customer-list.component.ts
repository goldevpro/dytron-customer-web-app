import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = []; // Array of Customer objects
  selectedCustomer: Customer | null = null; // Holds the currently selected Customer object

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
    this.loadSelectedCustomer();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        console.log('Customers fetched successfully', data);
        this.customers = data;
      }, 
      (error) => {
        console.error('Error fetching customers', error);
      }
    );
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    sessionStorage.setItem('selectedCustomer', JSON.stringify(customer));
  }

  loadSelectedCustomer(): void {
    const customerData = sessionStorage.getItem('selectedCustomer');
    if (customerData) {
      this.selectedCustomer = JSON.parse(customerData);
    }
  }

  deleteCustomer(id: number): void {
    if(!confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(
        () => {
          this.customers = this.customers.filter((c) => c.Id !== id); // Update the customer list locally
          if (this.selectedCustomer?.Id === id) {
            this.selectedCustomer = null; // Clear selected customer if it was deleted
            sessionStorage.removeItem('selectedCustomer');
          }
        },
        (error) => {
          console.error('Error deleting customer', error);
        }
      );
    }
  }

  editCustomer(customerId: number): void {
    this.router.navigate(['/edit-customer', customerId]);}
}
