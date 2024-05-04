import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { Evaluation } from '../model/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private api_url = 'http://localhost:8080/api/Evaluation';

  constructor(private http: HttpClient ,  private authService: UserAuthService) { }
  getEvaluation(): Observable<Evaluation[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    headers.delete('Content-Type');
    return this.http.get<Evaluation[]>(`${this.api_url}/evaluations` , { headers } );
  } 
  getEvaluationCollab(collaborateurId : number): Observable<Evaluation[]> {
  
    return this.http.get<Evaluation[]>(`${this.api_url}/evaluations/${collaborateurId}` );
  } 
  updateEvaluationById(evaluationId: number, newEvaluationValue: number): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    const body = {
      evaluation: newEvaluationValue
    };
    return this.http.put<any>(`${this.api_url}/evaluation/${evaluationId}?evaluation=${newEvaluationValue}`, body, { headers });
  }
  updateEvaluationByIdForCollab(evaluationId: number, newEvaluationValue: number , collaborateurId : number): Observable<any> {
  
    const body = {
      evaluation: newEvaluationValue
    };
    return this.http.put<any>(`${this.api_url}/evaluation/${evaluationId}/${collaborateurId}?evaluation=${newEvaluationValue}`, body);
  }
  deleteEvaluation(evaluationId: number): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    headers.delete('Content-Type');
    const url = `${this.api_url}/evaluation/${evaluationId}`;
    return this.http.delete(url , { headers } );
    }
    deleteEvaluationForCollab(evaluationId: number , collaborateurId: number): Observable<any> {
    
      const url = `${this.api_url}/evaluation/${evaluationId}/${collaborateurId}`;
      return this.http.delete(url );
      }
    addEvaluation(competenceId: number, evaluationValue: number): Observable<any> {
      const authToken = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
     
      const params = {
        competenceId: competenceId.toString(),
        evaluationValue: evaluationValue.toString()
      };
      return this.http.post<any>(`${this.api_url}/evaluation?competenceId=${competenceId}&evaluationValue=${evaluationValue}`, params ,  { headers });
    }
    addEvaluationForCollab(collaborateurId : number , competenceId: number, evaluationValue: number): Observable<any> {
      const params = {
        competenceId: competenceId.toString(),
        evaluationValue: evaluationValue.toString()
      };
      return this.http.post<any>(`${this.api_url}/evaluation/${collaborateurId}?competenceId=${competenceId}&evaluationValue=${evaluationValue}`, params );
    }
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
}
