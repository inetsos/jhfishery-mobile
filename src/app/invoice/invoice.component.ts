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
  storeName : string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService,
    private invoiceService: InvoiceService, private utilService: UtilService) { 
      //this.invoices = this.route.snapshot.data['invoices'];
      //console.log(localStorage.getItem('currentUser'));

      if(!this.authService.getCurrentUser()) {
        this.authService.me()
          .then((seller) => {
            this.storeName = seller.storeName;
            this.ngOnInit();
          })
          .catch((err) => console.log(err));
      } else 
        this.storeName = this.authService.getCurrentUser().storeName;
    }

  ngOnInit() {
    //this.storeName = '(주)해창트레이딩';
    this.invoiceService.getlist(this.storeName).
      then((data) => {
        this.invoices = data as Invoice[]; 
        this.router.navigate(['/invoices'], { queryParams: { storeName: this.storeName }});
      })
      .catch(response => null);
  }

}
