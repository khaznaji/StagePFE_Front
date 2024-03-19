import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  private api_url = 'http://localhost:8080/api/Collaborateur';

  constructor(private http: HttpClient ,  private authService: UserAuthService) { }
//   updateProfile(bio: string, competences: any[], evaluations: number[], resume: File): Observable<any> {
//     const authToken = this.authService.getToken();

//   // Ajoutez le jeton d'authentification aux en-têtes de la requête
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${authToken}`
//   });

//     const formData = new FormData();
//     formData.append('bio', bio);

//     // Ajouter chaque compétence individuellement
//     for (let i = 0; i < competences.length; i++) {
//       formData.append(`competences[${i}].id`, competences[i].id.toString());
//       formData.append(`competences[${i}].nom`, competences[i].nom);

//       // Ajoutez d'autres champs de compétence au besoin
//     }
  
//     // Ajouter chaque évaluation individuellement
//   // Ajouter chaque évaluation individuellement
// for (let i = 0; i < evaluations.length; i++) {
//   // Vérifier si l'évaluation est définie avant de la convertir en chaîne
//   if (evaluations[i] !== undefined) {
//     formData.append(`evaluations[${i}]`, evaluations[i].toString());
//   }
// }

  
//     // Ajouter le fichier de CV
//     formData.append('resume', resume);
  
//     return this.http.put<any>(`${this.api_url}updateProfileCollaborateur`, formData , { headers });
//   }
updateProfile(projectData: FormData): Observable<any> {
  const authToken = this.authService.getToken();

// Ajoutez le jeton d'authentification aux en-têtes de la requête
const headers = new HttpHeaders({
  'Authorization': `Bearer ${authToken}`
});
  return this.http.put<any>(`${this.api_url}/updateProfileCollaborateur`, projectData , { headers });
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
}}
  

