import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { SellersResolve } from './sellers.resolve';
import { SellerResolve } from './seller.resolve';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SellerNewComponent } from './seller-new/seller-new.component'; 
import { SellerIndexComponent } from './seller-index/seller-index.component';
import { SellerShowComponent } from './seller-show/seller-show.component';
import { SellerEditComponent } from './seller-edit/seller-edit.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sellers/new',  component: SellerNewComponent },
  { path: 'sellers', canActivate: [AuthGuard],
    children: [
      { 
        path: '', component: SellerIndexComponent,      
        resolve: {
          sellers: SellersResolve,
        } 
      },
      { 
        path: ':userID',
        component: SellerShowComponent,
        resolve: {
          seller: SellerResolve
        }
      },
      { 
        path: ':userID/edit',
        component: SellerEditComponent,
        resolve: {
          seller: SellerResolve
        }
      },
    ]
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ 
    RouterModule 
  ],
  declarations: []
})
export class AppRoutingModule { }
