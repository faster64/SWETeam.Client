import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from './base.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService extends BaseService {

  constructor(
    http: HttpService
  ) {
    super(http);
  }

  /**
   * Upload file
   * @param file
   * @returns
   */
  public uploadFile(file: File): Observable<ServiceResult> {
    const url = this.apiUrl + "/Product/ImportData";

    const formData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post(url, { formData });
  }

}
