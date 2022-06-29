import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    public http: HttpClient
  ) { }

  /**
   * Method GET
   * @param url
   * @returns
   */
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  /**
   * Method POST
   * @param url
   * @param body
   * @returns
   */
  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  /**
   * Method PUT
   * @param url
   * @param body
   * @returns
   */
  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  /**
   * Method DELETE
   * @param url
   * @returns
   */
  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
