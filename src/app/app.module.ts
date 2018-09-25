import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule }    from './app-routing.module';

import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { RequestInterceptorService } from './request-interceptor.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Error404Component,
    LoginComponent
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
    UtilService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
