import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule }    from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { SellersResolve } from './sellers.resolve';

import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { RequestInterceptorService } from './request-interceptor.service';
import { SellerService } from './seller.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { SellerNewComponent } from './seller-new/seller-new.component';
import { SellerIndexComponent } from './seller-index/seller-index.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Error404Component,
    LoginComponent,
    SellerNewComponent,
    SellerIndexComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, 
    HttpClientModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    AuthGuard,
    UtilService,
    AuthService,
    SellerService,
    SellersResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
