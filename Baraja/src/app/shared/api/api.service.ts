import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API = 'http://192.168.1.126:8080';

  constructor(private http: HttpClient) { }


    apiGet(endpoint: string): Observable<any> {
      return this.http.get(this.API + endpoint);
    }

    apiPost(endpoint: string, baraja: any, headers: HttpHeaders): Observable<any> {
      let result: Observable<Object>;
      result = this.http.post(this.API + endpoint, baraja, {headers});
      return result;
    }

    apiPut(endpoint: string, baraja: any, id: number, headers: HttpHeaders): Observable<any>{
      let result: Observable<Object>;
      result = this.http.put(this.API + endpoint + "/" + id, baraja, {headers});
      return result;
    }

    apiDelete(endpoint: string, id: number){
      return this.http.delete(this.API + endpoint + "/" + id);
    }

}
