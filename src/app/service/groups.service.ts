import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private baseUrl = 'http://localhost:8080/api/groups/ajouterGroupe';
  private baseUrl2 = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}

  addGroupWithFormationAndCollaborateurs(formationId: number, nom: string, collaborateursId: number[]): Observable<any> {
    const url = `${this.baseUrl}/${formationId}`;
    const params = {
      nom: nom,
      collaborateursId: collaborateursId
    };
    return this.http.post<any>(url, null, { params: params });
  }
  getGroupesByFormation(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/groupesParFormation/${formationId}`);
  }
}
