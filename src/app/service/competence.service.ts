import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competence } from '../model/competence.model';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private apiUrl = 'http://localhost:8080/api/Competence';  // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  addCompetence(competence: Competence): Observable<Competence> {
    return this.http.post<Competence>(this.apiUrl, competence);
  }

  getCompetenceById(id: number): Observable<Competence> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Competence>(url);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  getAllCompetences(page: number, pageSize: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  
    return this.http.get<Competence[]>(`${this.apiUrl}`, { params });
  }
  

  updateCompetence(id: number, newCompetence: Competence): Observable<Competence> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Competence>(url, newCompetence);
  }

  deleteCompetence(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getCompetencesByDomain(domain: string): Observable<Competence[]> {
    return this.http.get<Competence[]>(`${this.apiUrl}/byDomain/${domain}`);
  }
}