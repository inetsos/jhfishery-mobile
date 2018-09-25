import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Seller } from '../seller';

@Component({
  selector: 'app-seller-index',
  templateUrl: './seller-index.component.html',
  styleUrls: ['./seller-index.component.css']
})
export class SellerIndexComponent implements OnInit {

  sellers: Seller[];

  constructor( private route: ActivatedRoute ) {
    this.sellers = this.route.snapshot.data['sellers']; 
  }

  ngOnInit() {
  }

}
