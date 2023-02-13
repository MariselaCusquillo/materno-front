import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieve information from the given server using a given URI.
   * Requests using GET should only retrieve data and should have no other
   * effect on the data.
   * @param service url
   * @param options
   * @returns
   */
  
  get<IResultData>(service: string, options?: any): Observable<Object> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/${service}`;
    return this.http.get(url, {headers:headers});
  }

  /**
   * Used to send data to the server.
   * @param service url
   * @param body
   * @param options
   * @returns
   */
  post(service: string, body: any, options?: any): Observable<Object> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/${service}`;
    return this.http.post(url, body, {headers:headers});
  }

  /**
   * Replaces all the current representations of the target resource with the uploaded content.
   * @param service url
   * @param body
   * @param options
   * @returns
   */
  patch(service: string, body: any, options?: any): Observable<Object> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/${service}`;
    return this.http.patch(url, body, {headers:headers});
  }

  /**
   * Replaces all the current representations of the target resource with the uploaded content.
   * @param service url
   * @param body
   * @param options
   * @returns
   */
   put(service: string, body: any, options?: any): Observable<Object> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/${service}`;
    return this.http.put(url, body, {headers:headers});
  }

  /**
   * Removes all the current representations of the target resource given by URI.
   * @param service url
   * @param options
   * @returns
   */
  delete(service: string, options?: any): Observable<Object> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${token}`);
    const url = `${this.API_URL}/${service}`;
    return this.http.delete(url, {headers:headers});
  }

  /**
   * Retrieve information from the given server using a given URI.
   * Requests using GET should only retrieve data and should have no other
   * effect on the data.
   * @param service url
   * @param options
   * @returns
   */
   getLocation(service: string, options?: any): Observable<Object> {
    return this.http.get<any>(service, options);
  }
}
