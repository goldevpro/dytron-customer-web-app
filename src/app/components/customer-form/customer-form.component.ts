import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [MatLabel, MatFormField, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      createdDate: [{value: new Date(), disabled: true}],
      lastUpdatedDate: [{value: new Date(), disabled: true}],  
      
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('id'));
      this.isEditMode = !!this.customerId;
      if (this.isEditMode) {
        this.loadCustomerData(this.customerId);
      }
    });
  }

  loadCustomerData(id: number): void {
    this.customerService.getCustomer(id).subscribe((customer) => {
      this.customerForm.patchValue({
        firstName: customer.FirstName,
        lastName: customer.LastName,
        email: customer.Email,
        createdDate: customer.CreatedDate,
        lastUpdatedDate: customer.LastUpdatedDate,
      });
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;

    const customerData: Customer = {
      ...this.customerForm.getRawValue()
    };

    if (this.isEditMode && this.customerId) {
      this.customerService.updateCustomer(this.customerId, customerData).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.customerService.createCustomer(customerData).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }

}
