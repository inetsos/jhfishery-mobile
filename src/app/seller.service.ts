import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

import { UtilService } from './util.service';
import { ApiResponse } from './api-response';
import { Seller } from './seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiBaseUrl = `${environment.apiBaseUrl}/sellers`;
  
  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) { }

  index() : Promise<Seller[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Seller[]
              })
              .catch(this.utilService.handleApiError);
  }

  show(userID: string): Promise<Seller> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/${userID}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Seller
              })
              .catch(this.utilService.handleApiError);
  }

  create(seller: Seller): Promise<Seller> {
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}`, seller)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Seller
              })
              .catch(this.utilService.handleApiError);
  }

  update(userID: string, seller: Seller): Promise<Seller> {
    return this.http.put<ApiResponse>(`${this.apiBaseUrl}/${userID}`, seller)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Seller
              })
              .catch(this.utilService.handleApiError);
  }

  destroy(userID: string): Promise<Seller> {
    return this.http.delete<ApiResponse>(`${this.apiBaseUrl}/${userID}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Seller
              })
              .catch(this.utilService.handleApiError);
  }

}
