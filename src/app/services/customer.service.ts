import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getCustomers(skip: number, top: number): Observable<Customer[]> {
    return this.http.get(
      this.baseUrl + `api/customers/page/${skip * top}/${top}`
    ) as Observable<Customer[]>;
  }
}
