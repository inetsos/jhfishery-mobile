import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice';

@Injectable()
export class InvoicesResolve implements Resolve<Invoice[]> {

  constructor(
    private invoiceService: InvoiceService,
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.invoiceService.getlist(route.queryParams['storeName']).catch(response => null);
  }
}