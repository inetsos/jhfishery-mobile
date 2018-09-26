import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Seller } from '../seller';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-seller-show',
  templateUrl: './seller-show.component.html',
  styleUrls: ['./seller-show.component.css']
})
export class SellerShowComponent implements OnInit {

  seller: Seller;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
  ) {
    this.seller = this.route.snapshot.data['seller'];
  }

  ngOnInit() {
  }

}
