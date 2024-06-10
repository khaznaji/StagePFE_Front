import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { Formation } from '../model/formation.model';

@Injectable({
  providedIn: 'root',
})
export class ParticapationFormationService {
  private BASE_URL2 = 'http://192.168.56.2:8085/api/ParticipationFormation';

  constructor(private http: HttpClient, private authService: UserAuthService) {}

  inscription(formationId: number) {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.post<any>(`${this.BASE_URL2}/inscription/${formationId}`, {
      headers,
    });
  }

  getMesFormations(): Observable<Formation[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<Formation[]>(
      `${this.BASE_URL2}/mesdemandesdeFormations`,
      {
        headers,
      }
    );
  }

  getFormationsPourManager(): Observable<any[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<any[]>(`${this.BASE_URL2}/mesFormationsPourManager`, {
      headers,
    });
  }

  getFormationsAccepte(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL2}/demandeAccepte/${id}`);
  }
  getFormationsConfirme(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL2}/demandeConfirme/${id}`);
  }
  updateEtatParticipationAccepte(participationId: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL2}/updateEtatAccepte/${participationId}`,
      {}
    );
  }

  updateEtatParticipationConfime(participationId: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL2}/updateEtatConfirme/${participationId}`,
      {}
    );
  }

  updateEtatParticipationRefusee(participationId: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL2}/updateEtatRefusee/${participationId}`,
      {}
    );
  }
}
