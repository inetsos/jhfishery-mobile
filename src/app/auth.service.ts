import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UtilService } from './util.service';
import { ApiResponse } from './api-response';
import { Seller } from './seller';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBaseUrl = `${environment.apiBaseUrl}/auth/seller`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilService: UtilService,
  ) { }

  login(userID: string, password: string): Promise<any> {
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}/login`,{userID:userID, password:password})
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
    		        localStorage.setItem('token', response.data);
              })
              .catch(this.utilService.handleApiError);
  }

  me(): Promise<Seller> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/me`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                //console.log(response);
    		        localStorage.setItem('currentUser', JSON.stringify(response.data));
                return response.data as Seller
              })
              .catch(response =>{
                this.logout();
                return this.utilService.handleApiError(response);
              });
  }

  refresh(): Promise<any> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/refresh`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                localStorage.setItem('token', response.data);
                if(!this.getCurrentUser()) return this.me();
              })
              .catch(response =>{
                this.logout();
                return this.utilService.handleApiError(response);
              });
  }

  getToken(): string{ //4
    return localStorage.getItem('token');
  }

  getCurrentUser(): Seller{
    return JSON.parse(localStorage.getItem('currentUser')) as Seller;
  }

  isLoggedIn(): boolean {
    var token = localStorage.getItem('token');
    if(token) return true;
    else return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
