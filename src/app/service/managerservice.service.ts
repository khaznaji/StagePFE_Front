import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserAuthService } from './user-auth.service';
@Injectable({
  providedIn: 'root'
})
export class ManagerserviceService {
  private BASE_URL2 = 'http://localhost:8080/api/ManagerService';


  constructor(private http: HttpClient , private authService: UserAuthService) { }
    createManagerService(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL2}/registerManagerService`, formData);
  }

  getMembers(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<any>(`${this.BASE_URL2}/members`, {
      headers,
    });
  }
}
