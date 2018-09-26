import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SellerService } from './seller.service';
import { Seller } from './seller';

@Injectable()
export class SellerResolve implements Resolve<Seller> {

  constructor( private sellerService: SellerService ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.sellerService.show(route.params['userID']);
  }
}