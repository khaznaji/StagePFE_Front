import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Entretien } from '../model/entretien.model';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class EntretienService {
  private baseUrl = 'http://localhost:8080/api/entretien';

  constructor(private http: HttpClient, private authService: UserAuthService) {}

  createEntretien(
    postId: number,
    candidatureId: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string
  ): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/create?postId=${postId}&candidatureId=${candidatureId}&dateEntretien=${dateEntretien}&heureDebut=${heureDebut}&heureFin=${heureFin}`;

    return this.http.post<string>(url, {}, { headers: headers });
  }
  updateEntretien(
    id: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string
  ): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${id}/update?dateEntretien=${dateEntretien}&heureDebut=${heureDebut}&heureFin=${heureFin}`;

    return this.http.put<string>(url, {}, { headers: headers });
  }
  noter(id: number, note: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${id}/noter?note=${note}`;

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
  deleteEntretienAnnuel(id: number): Observable<void> {
    const url = `${this.baseUrl}/deleteAnnuel/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
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
    return this.http.get<any>(`${this.baseUrl}/managerService`, { headers });
  }
  EntretiensSpecifiques(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/EntretiensSpecifiques/${posteId}`
    );
  }
  createEntretienAnnuel(
    collaborateurId: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string
  ): Observable<string> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json' 
    });
    headers.delete('Content-Type');
    const url = `${this.baseUrl}/ajoutAnnuel?collaborateurId=${collaborateurId}&dateEntretien=${dateEntretien}&heureDebut=${heureDebut}&heureFin=${heureFin}`;

    return this.http.post<string>(url, {}, { headers: headers });
  }
  updateEntretienAnnuel(
    entretienId: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string
  ): Observable<string> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json' 
    });
    headers.delete('Content-Type');
        const url = `${this.baseUrl}/updateAnnuel/${entretienId}?dateEntretien=${dateEntretien}&heureDebut=${heureDebut}&heureFin=${heureFin}`;

    return this.http.put<string>(url, {}, { headers: headers });
  }
  getEntretiensAnnuelDuManagerConnecte(): Observable<any> {
    const authToken = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<any>(`${this.baseUrl}/entretiens/annuel`, { headers });
  }
  getEntretiensAnnuelDuCollabConnecte(): Observable<any> {
    const authToken = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get<any>(`${this.baseUrl}/entretiensCollab/annuel`, { headers });
  }
  getEntretienannuelbyId(entretienId: number): Observable<any[]> {
    const url = `${this.baseUrl}/annuelbyId/${entretienId}`;
    return this.http.get<any[]>(url);
  }
}
