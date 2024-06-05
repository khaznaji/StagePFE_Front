import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private api_url = 'http://localhost:8080/api/Formateur';

  constructor(private http: HttpClient ,  private authService: UserAuthService) { }
  createFormateur(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.api_url}/registerFormateur`, formData);
  }
  getAllFormateur(): Observable<any> {
    return this.http.get(`${this.api_url}/formateur`);
  }
  getCollaborateurInfo(): Observable<any> {
    const authToken = this.authService.getToken();
  
    // Ajoutez le jeton d'authentification aux en-têtes de la requête
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<any>(`${this.api_url}/formateur/info`,  { headers });
  }
}
