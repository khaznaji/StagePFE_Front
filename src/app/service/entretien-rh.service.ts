import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntretienRhService {
  private baseUrl = 'http://192.168.56.2:8085/api/entretienRh';

  constructor(private http: HttpClient, private authService: UserAuthService) {}

  createEntretien(
    postId: number,
    candidatureId: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string, 
    userId : number
  ): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/create?postId=${postId}&userId=${userId}&candidatureId=${candidatureId}&dateEntretien=${dateEntretien}&heureDebut=${heureDebut}&heureFin=${heureFin}`;

    return this.http.post<string>(url, {}, { headers: headers });
  }
  updateEntretien(
    id: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string , 
    userId : number 
  ): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${id}/update?userId=${userId}&dateEntretien=${dateEntretien}&heureDebut=${heureDebut}&heureFin=${heureFin}`;

    return this.http.put<string>(url, {}, { headers: headers });
  }
  noter(id: number, salaire: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${id}/noter?salaire=${salaire}`;

    return this.http.put<string>(url, {}, { headers: headers });
  }
  getEntretiensByPosteId(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/poste/${posteId}`);
  }
  getEntretienById(entretienId: number): Observable<any[]> {
    const url = `${this.baseUrl}/${entretienId}`;
    return this.http.get<any[]>(url);
  }
  deleteEntretien(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
  getCollaborateurEntretien(): Observable<any> {
    const authToken = this.authService.getToken();

    // Ajoutez le jeton d'authentification aux en-têtes de la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<any>(`${this.baseUrl}/collaborateur`, { headers });
  }
  getManagerEntretien(): Observable<any> {
    const authToken = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<any>(`${this.baseUrl}/managerRh`, { headers });
  }
  EntretiensRhSpecifiques(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/EntretiensSpecifiques/${posteId}`
    );
  }
}
