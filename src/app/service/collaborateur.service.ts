import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  private api_url = 'http://localhost:8080/api/Collaborateur';

  constructor(private http: HttpClient ,  private authService: UserAuthService) { }

updateProfile(projectData: FormData): Observable<any> {
  const authToken = this.authService.getToken();

// Ajoutez le jeton d'authentification aux en-têtes de la requête
const headers = new HttpHeaders({
  'Authorization': `Bearer ${authToken}`
});
  return this.http.put<any>(`${this.api_url}/updateProfileCollaborateur`, projectData , { headers });
}
updateCollaborateurBio(projectData: FormData): Observable<any> {
  const authToken = this.authService.getToken();

// Ajoutez le jeton d'authentification aux en-têtes de la requête
const headers = new HttpHeaders({
  'Authorization': `Bearer ${authToken}`
});
  return this.http.put<any>(`${this.api_url}/updateCollaborateurBio`, projectData , { headers });
}
updateCollaborateurResume(projectData: FormData): Observable<any> {
  const authToken = this.authService.getToken();

// Ajoutez le jeton d'authentification aux en-têtes de la requête
const headers = new HttpHeaders({
  'Authorization': `Bearer ${authToken}`
});
  return this.http.put<any>(`${this.api_url}/updateCollaborateurResume`, projectData , { headers });
}
updateCompetence(projectData: FormData): Observable<any> {
  const authToken = this.authService.getToken();

// Ajoutez le jeton d'authentification aux en-têtes de la requête
const headers = new HttpHeaders({
  'Authorization': `Bearer ${authToken}`
});
  return this.http.put<any>(`${this.api_url}/ajoutCompetenceCollaborateur`, projectData , { headers });
}
getCollaborateurInfo(): Observable<any> {
  const authToken = this.authService.getToken();

  // Ajoutez le jeton d'authentification aux en-têtes de la requête
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });
  return this.http.get<any>(`${this.api_url}/collaborateur/info`,  { headers });
}
createCollaborateur(formData: FormData): Observable<User> {
  return this.http.post<User>(`${this.api_url}/registerCollaborateur`, formData);
} }
  

