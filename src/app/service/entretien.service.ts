import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Entretien } from '../model/entretien.model';

@Injectable({
  providedIn: 'root',
})
export class EntretienService {
  private baseUrl = 'http://localhost:8080/api/entretien';

  constructor(private http: HttpClient) {}

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
  getEntretiensByPosteId(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/poste/${posteId}`);
  }
  getEntretienById(entretienId: number): Observable<any[]> {
    const url = `${this.baseUrl}/${entretienId}`;
    return this.http.get<any[]>(url);
  }
  deleteEntretien(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
  
}
