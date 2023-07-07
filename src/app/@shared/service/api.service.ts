import { HttpClient } from '@angular/common/http';
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
}
