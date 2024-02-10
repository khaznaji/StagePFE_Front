import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8080/User';

  constructor(private http: HttpClient) { }
  Register(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/register`, events);
  } 
}
