import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private apiUrl = environment.api_url;

  controller: string = "";

  _http!: HttpService;

  constructor(
    public http: HttpService
  ) {
    this._http = http;
  }

  /**
   * get api url
   * @returns apiUrl
   */
  getApiUrl() {
    return this.apiUrl;
  }

  /**
   * Get All
   * @param endpoint
   * @returns
   */
  getAll(endpoint: string = ""): Observable<ServiceResult> {
    const url = `${this.apiUrl}/${this.controller}/${endpoint}`;
    return this.http.get<ServiceResult>(url);
  }

  /**
   * Lấy dữ liệu paging
   * @param endpoint
   * @param paginationRequest
   * @returns
   */
  getPaging(endpoint: string = "", paginationRequest: PaginationRequest): Observable<ServiceResult> {
    if (paginationRequest == null) {
      throw new Error(`Parameter paginationRequest cannot be null`);
    }

    if (endpoint.isNullOrEmpty()) {
      endpoint = "get-grid-paging";
    }

    const url = `${this.apiUrl}/${this.controller}/${endpoint}`;
    return this.http.post<ServiceResult>(url, paginationRequest);
  }

  /**
   * Get detail by id
   * @param endpoint
   * @param id
   * @returns
   */
  getByID(endpoint: string = "", id: any) {

    if (endpoint.isNullOrEmpty()) {
      endpoint = `get-by-id?id=${id}`;
    }

    const url = `${this.apiUrl}/${this.controller}/${endpoint}`;
    return this.http.get<ServiceResult>(url);
  }
}
