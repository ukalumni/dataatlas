import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {

  private apiUrl = 'http://localhost:8000/api/db-connect';

  constructor(private http: HttpClient) { }

  submitDbParams(dbParams: any): Observable<any> {
    return this.http.post(this.apiUrl, dbParams);
  }
}
