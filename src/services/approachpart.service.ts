import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApproachpartService {
  baseApiUrl: string= 'https://localhost:44380/'
  constructor(private http: HttpClient) { }

  getBehaviorFrame(req:any, controller: string, route: string): Observable<any>{
    return this.http.post<any>(this.baseApiUrl+controller+ '/'+ route,req)
  }
  
}
