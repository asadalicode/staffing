import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';

interface IAPI {
  url: string;
  model: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAPI(params: IAPI): Observable<any> {
    return this.http
      .get(params.url)
      .pipe(map((items: any) => params.model.adapt(items)));
  }


  sendContactForm(body: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(`/api/staffing/contact-us`, body, httpOptions); 
  }
}
