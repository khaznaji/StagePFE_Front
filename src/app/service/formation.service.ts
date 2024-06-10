import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from '../model/formation.model';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private BASE_URL2 = 'http://192.168.56.2:8085/api/Formation';
  
  constructor(private http: HttpClient , private authService: UserAuthService) { }

  addProject(formData: FormData) {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.post<Formation>(`${this.BASE_URL2}/create`, formData, {
      headers,
    });  }
    update(formationId: number , formData: FormData) {
      const authToken = this.authService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });
      headers.delete('Content-Type');
      return this.http.put<Formation>(`${this.BASE_URL2}/edit/${formationId}`, formData, {
        headers,
      });  }
      deleteFormation(formationId: number): Observable<any> {
        return this.http.delete(`${this.BASE_URL2}/delete/${formationId}`);
      }
    mesformations(): Observable<any> {
      const authToken = this.authService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });
      headers.delete('Content-Type');
      return this.http.get<any>(
        `${this.BASE_URL2}/mesformations`,
        { headers }
      );
    }
    formationCollab(): Observable<any> {
      const authToken = this.authService.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });
      headers.delete('Content-Type');
      return this.http.get<any>(
        `${this.BASE_URL2}/formationsCollaborateur`,
        { headers }
      );
    }
    FormationDisponible(): Observable<Formation[]> {
  
      return this.http.get<Formation[]>(`${this.BASE_URL2}/allAvailable`);
    }

    getFormationById(formationId: number): Observable<Formation> {
      return this.http.get<Formation>(`${this.BASE_URL2}/${formationId}`);
    }
    getFormationByIdForCollab(formationId: number): Observable<Formation> {
      return this.http.get<Formation>(`${this.BASE_URL2}/getFormationByIdForCollab/${formationId}`);
    }
 
}
