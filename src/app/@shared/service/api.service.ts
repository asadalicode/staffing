import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface IAPI {
  url: string;
  model: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  setFavouritesFlag= new BehaviorSubject<boolean>(false);
  setAllFavouritesFlag= new BehaviorSubject<boolean>(false);

  getFavouriteFlag():Observable<boolean> {
    return this.setFavouritesFlag.asObservable();
  }

  getAllFavouriteCandidatesFlag():Observable<boolean> {
    return this.setAllFavouritesFlag.asObservable();
  }


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
