import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //public API = 'http://127.0.0.1:8080';
  public API = 'http://192.168.1.126:8080';

  constructor(private http: HttpClient) { }


    apiGet(endpoint: string): Observable<any> {
      return this.http.get(this.API + endpoint);
    }

    apiPost(endpoint: string, body: any, headers: HttpHeaders): Observable<any> {
      let result: Observable<any>;
      result = this.http.post(this.API + endpoint, body, {headers});
      return result;
    }

    apiPostLogin(endpoint: string, data: any, headers: HttpHeaders): Observable<HttpEvent<string>> {
      let result: Observable<any>;
      result = this.http.post(this.API + endpoint, data, {headers});
      return result;
    }

    apiPut(endpoint: string, body: any, id: number, headers: HttpHeaders): Observable<any>{
      let result: Observable<any>;
      result = this.http.put(this.API + endpoint + '/' + id, body, {headers});
      return result;
    }

    apiDelete(endpoint: string, id: number){
      return this.http.delete(this.API + endpoint + '/' + id);
    }

}
