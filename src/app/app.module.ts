import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {    
  MatProgressBarModule,  
  MatButtonModule,      
  MatMenuModule,      
  MatToolbarModule,      
  MatIconModule,      
  MatCardModule,      
  MatFormFieldModule,      
  MatInputModule,      
  MatDatepickerModule,      
  MatDatepicker,      
  MatNativeDateModule,      
  MatRadioModule,      
  MatSelectModule,      
  MatOptionModule,      
  MatSlideToggleModule,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher      
} from '@angular/material';      
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }    from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { SellersResolve } from './sellers.resolve';
import { SellerResolve } from './seller.resolve';
import { InvoicesResolve } from './invoices.resolve';

import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { RequestInterceptorService } from './request-interceptor.service';
import { SellerService } from './seller.service';
import { UnstoringService } from './unstoring.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { SellerNewComponent } from './seller-new/seller-new.component';
import { SellerIndexComponent } from './seller-index/seller-index.component';
import { SellerEditComponent } from './seller-edit/seller-edit.component';
import { SellerShowComponent } from './seller-show/seller-show.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceUnstoringComponent } from './invoice-unstoring/invoice-unstoring.component';
import { InvoiceAllComponent } from './invoice-all/invoice-all.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Error404Component,
    LoginComponent,
    SellerNewComponent,
    SellerIndexComponent,
    SellerEditComponent,
    SellerShowComponent,
    InvoiceComponent,
    InvoiceUnstoringComponent,
    InvoiceAllComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, 
    HttpClientModule, FormsModule, ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,      
    MatMenuModule,      
    MatToolbarModule,      
    MatIconModule,      
    MatCardModule,      
    BrowserAnimationsModule,      
    MatFormFieldModule,      
    MatInputModule,      
    MatDatepickerModule,      
    MatNativeDateModule,      
    MatRadioModule,      
    MatSelectModule,      
    MatOptionModule,      
    MatSlideToggleModule   
  ],
  exports: [      
    MatButtonModule,      
    MatMenuModule,      
    MatToolbarModule,      
    MatIconModule,      
    MatCardModule,      
    BrowserAnimationsModule,      
    MatFormFieldModule,      
    MatInputModule,      
    MatDatepickerModule,      
    MatNativeDateModule,      
    MatRadioModule,      
    MatSelectModule,      
    MatOptionModule,      
    MatSlideToggleModule      
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    {
      provide: ErrorStateMatcher, 
      useClass: ShowOnDirtyErrorStateMatcher
    },
    AuthGuard,
    UtilService,
    AuthService,
    SellerService,
    SellersResolve,
    SellerResolve,
    InvoicesResolve,
    UnstoringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
