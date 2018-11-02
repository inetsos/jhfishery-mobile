import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { UtilService } from '../util.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices: Invoice[];
  sellerNo: number;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService,
    private invoiceService: InvoiceService, private utilService: UtilService) {
      // this.invoices = this.route.snapshot.data['invoices'];
      // console.log(localStorage.getItem('currentUser'));

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
    this.invoiceService.getlist(this.sellerNo).
      then((data) => {
        this.invoices = data as Invoice[];
        // this.router.navigate(['/invoices'], { queryParams: { sellerNo: this.sellerNo }});
      })
      .catch(response => null);
  }

  getTotalSum(invoice: string): number {

    let sum = 0;
    for (let i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].invoice === invoice) {
        for (let j = 0; j < this.invoices[i].unstoring.length; j++) {
          sum += this.invoices[i].unstoring[j].outSum;
        }
      }
    }
    return sum;
  }
}
