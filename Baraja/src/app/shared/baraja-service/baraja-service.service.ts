import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarajaServiceService {

  public API = 'http://192.168.1.175:8080';

  constructor(private http: HttpClient) { }

  
    getAllBarajas(): Observable<any> {
      return this.http.get(this.API + '/getBarajas');
    }


}
