import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

import { UtilService } from './util.service';
import { ApiResponse } from './api-response';
import { Unstoring } from './unstoring';

@Injectable({
  providedIn: 'root'
})
export class UnstoringService {

  private apiBaseUrl = `${environment.apiBaseUrl}/unstorings`;
  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) { }

  create(unstoring: Unstoring): Promise<Unstoring> {
    
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}`, unstoring)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Unstoring
              })
              .catch(this.utilService.handleApiError);
  }

  destroy(id: string): Promise<Unstoring> {
    return this.http.delete<ApiResponse>(`${this.apiBaseUrl}/${id}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Unstoring
              })
              .catch(this.utilService.handleApiError);
  }

}
