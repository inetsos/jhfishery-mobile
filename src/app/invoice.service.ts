import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

import { UtilService } from './util.service';
import { ApiResponse } from './api-response';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiBaseUrl = `${environment.apiBaseUrl}/invoices`;

  constructor( private http: HttpClient, private utilService: UtilService) { }

  getlist(storeName:string): Promise<Invoice[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/getlist/${storeName}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Invoice[]
              })
              .catch(this.utilService.handleApiError);
  }
}
