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
  addCollaborateursToGroup(formationId: number , groupId: number, collaborateursId: number[]): Observable<any> {
    const url = `${this.baseUrl2}/ajouterCollaborateursAuGroupe/${groupId}/${formationId}`;
    const params = {
      collaborateursId: collaborateursId
    };
    return this.http.post<any>(url, null, { params: params });
  }
  
  getGroupesByFormation(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/groupesParFormation/${formationId}`);
  }
  getGroupesByFormationNonCertifie(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/groupesParFormationNonCertifie/${formationId}`);
  }
  
  editGroupName(groupId: number, nom: string): Observable<any> {

    const body = {
      nom: nom
    };
    return this.http.put<any>(`${this.baseUrl2}/editerNomGroupe/${groupId}?nom=${nom}`, body);
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // Vous pouvez ajouter d'autres en-têtes selon les besoins, comme l'authentification
      })
    };
  }
  getGroupesDetails(groupId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/detailsGroupe/${groupId}`);
  }
  removeUserFromGroup(groupId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl2}/supprimerUtilisateurDuGroupe/${groupId}/${userId}`);
  }
  deleteGroup(groupId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl2}/supprimerGroupe/${groupId}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
