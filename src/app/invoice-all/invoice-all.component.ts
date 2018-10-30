import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { UtilService } from '../util.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-invoice-all',
  templateUrl: './invoice-all.component.html',
  styleUrls: ['./invoice-all.component.css']
})
export class InvoiceAllComponent implements OnInit {

  invoices: Invoice[];
  sellerNo: number;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService,
    private invoiceService: InvoiceService, private utilService: UtilService) {

      if (!this.authService.getCurrentUser()) {
        this.authService.me()
          .then((seller) => {
            this.sellerNo = seller.sellerNo;
            this.ngOnInit();
          })
          .catch((err) => console.log(err));
      } else {
        this.sellerNo = this.authService.getCurrentUser().sellerNo;
      }
    }

  ngOnInit() {
    this.invoiceService.getlistAll(this.sellerNo).
      then((data) => {
        this.invoices = data as Invoice[];
        // this.router.navigate(['/invoices', 'all'], { queryParams: { sellerNo: this.sellerNo }});
      })
      .catch(response => null);
  }

  getTotalSum(invoice: string) {

    let sum = 0;

    for (let i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].invoice === invoice) {
        sum += this.invoices[i].out_sum;
      }
    }

    return sum;
  }

}
