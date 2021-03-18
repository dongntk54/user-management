import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/models';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  mode = 'cardView';
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers.map((customer) => {
        customer.fullName = customer.firstName + ' ' + customer.lastName;
        return customer;
      });
    });
  }

  cardMode() {
    this.mode = 'cardView';
  }

  listMode() {
    this.mode = 'listView';
  }

  addNewCustomer() {}

  editUser() {}
}
