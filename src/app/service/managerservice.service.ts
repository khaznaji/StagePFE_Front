import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserAuthService } from './user-auth.service';
@Injectable({
  providedIn: 'root',
})
export class ManagerserviceService {
  private BASE_URL2 = 'http://localhost:8080/api/ManagerService';

  constructor(private http: HttpClient, private authService: UserAuthService) {}
  createManagerService(formData: FormData): Observable<User> {
    return this.http.post<User>(
      `${this.BASE_URL2}/registerManagerService`,
      formData
    );
  }
  getCollaborateurInfo(): Observable<any> {
    const authToken = this.authService.getToken();
  
    // Ajoutez le jeton d'authentification aux en-têtes de la requête
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<any>(`${this.BASE_URL2}/manager/info`,  { headers });
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
  getTopThreeCompetences(): Observable<{ [key: string]: string[] }> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<{ [key: string]: string[] }>(`${this.BASE_URL2}/top-three-competences`, {
      headers,
    });
  }
  getPostesWithCandidatureCount(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<any>(`${this.BASE_URL2}/postesWithCandidatureCount`, {
      headers
  }); } 
  getNombreCollaborateurs(): Observable<number> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<number>(`${this.BASE_URL2}/collaborateurs/count`, {
      headers,
    });
  }

  getNombrePostesPublies(): Observable<number> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<number>(`${this.BASE_URL2}/postesPublies/count`, {
      headers,
    });
  }

  getNombreDemandesFormation(): Observable<number> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<number>(`${this.BASE_URL2}/demandesFormation/count`, {
      headers,
    });
  }

  getNombrePostesApprouves(): Observable<number> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<number>(`${this.BASE_URL2}/postesApprouves/count`, {
      headers,
    });
  }
}
