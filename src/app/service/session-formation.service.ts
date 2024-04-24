import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionFormationService {

  private baseUrl = 'http://localhost:8080/api/session';

  constructor(private http: HttpClient) {}
  createSession(
    formationId : number, 
    groupId: number,
    dateDebut: string,
    dateFin: string,
  ): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/add/${formationId}?groupId=${groupId}&dateDebut=${dateDebut}&dateFin=${dateFin}`;

    return this.http.post<string>(url, {}, { headers: headers });
  }
  updateSession(
    sessionId: number,
    groupId: number,
    dateDebut: string,
    dateFin: string,
): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/update/${sessionId}?groupId=${groupId}&dateDebut=${dateDebut}&dateFin=${dateFin}`;

    return this.http.put<string>(url, {}, { headers: headers });
  }
  getAllSessionsByFormation(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allsession/${formationId}`);
  }
  getSessionById(sessionId: number): Observable<any[]> {
    const url = `${this.baseUrl}/get/${sessionId}`;
    return this.http.get<any[]>(url);
  }
  deleteSession(id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }}
