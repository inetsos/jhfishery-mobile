import { Component, OnInit } from '@angular/core';

import { Seller } from '../seller';

import { SellerService } from '../seller.service';

@Component({
  selector: 'app-seller-index',
  templateUrl: './seller-index.component.html',
  styleUrls: ['./seller-index.component.css']
})
export class SellerIndexComponent implements OnInit {

  sellers: Seller[];

  constructor( private sellerService: SellerService ) {
    this.sellerService.index()
      .then(sellers => this.sellers = sellers)
      .catch(response => null);
  }

  ngOnInit() {
  }

}
