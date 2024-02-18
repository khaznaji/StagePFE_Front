import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8080/User';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });


  constructor(private http: HttpClient) { }
  Register(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/register`, events);
  } 
   login(loginData: any) {
    return this.http.post(this.BASE_URL + '/signin', loginData, {
      headers: this.requestHeader,
    });
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/all`);
  }
  checkEmail(email: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/emailExists/${email}`);
  }
  
  checkmatricule(matricule: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/matricule/${matricule}`);
  }
  requestPasswordReset(email: string) {
    return this.http.post('http://localhost:8080/User/request', { email });
  }

}
