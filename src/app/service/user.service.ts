import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8080/auth';
  private BASE_URL2 = 'http://localhost:8080/api/User';

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
    return this.http.get(`${this.BASE_URL2}/all`);
  }
  getAllManagerServices(): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/managerServices`);
  }
  getAllCollab(): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/collaborateur`);
  }
  checkEmail(email: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/emailExists/${email}`);
  }
  createManagerService(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL2}/registerManagerService`, formData);
  } 
  createCollab(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL2}/registerCollaborateur`, formData);
  } 
  checkmatricule(matricule: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/matricule/${matricule}`);
  }
  requestPasswordReset(email: string) {
    return this.http.post('http://localhost:8080/api/User/request', { email });
  }
  getUserById(id: any) {
    // Ajoutez les en-têtes à votre requête HTTP
  
    return this.http.get(`${this.BASE_URL2}/finduserbyid/${id}`);
  }
  getUserById2(id: any, headers: any) {
    // Ajoutez les en-têtes à votre requête HTTP
    const options = { headers };
  
    return this.http.get(`${this.BASE_URL2}/finduserbyid/${id}`, options);
  }
  AddManagerService(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL2}/registerManagerService`, events);
  }  
  AddCollab(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL2}/registerCollab`, events);
  } 
  
}
