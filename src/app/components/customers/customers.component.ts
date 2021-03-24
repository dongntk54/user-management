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
  filteredCustomers: Customer[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers(0, this.itemsPerPage);
  }

  getCustomers(skip: number, top: number): void {
    this.customerService.getCustomers(skip, top).subscribe((res: any) => {
      this.totalItems = res.totalRecords;
      this.filteredCustomers = this.customers = res.results.map(
        (customer: any) => {
          customer.fullName = customer.firstName + ' ' + customer.lastName;
          return customer;
        }
      );
    });
  }

  cardMode() {
    this.mode = 'cardView';
  }

  listMode() {
    this.mode = 'listView';
  }

  addNewCustomer() {}

  search(value: string) {
    value = value.trim().toLowerCase();
    if (value === '') this.filteredCustomers = [...this.customers];
    this.filteredCustomers = this.customers.filter((customer) => {
      return (
        customer.fullName.toLowerCase().includes(value) ||
        customer.address.toLowerCase().includes(value) ||
        customer.state.name.toLowerCase().includes(value)
      );
    });
  }

  handlePageChange(page: number) {
    this.getCustomers(page, this.itemsPerPage);
  }

  caculateOrderTotal(orders: any): number {
    if (!orders) return 0;
    let total: number = 0;
    orders.forEach((order: { productName: string; itemCost: number }) => {
      total += Number(order.itemCost);
    });
    return Number(total.toFixed(2));
  }
}
