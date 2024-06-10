import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BilanService {

  private BASE_URL2 = 'http://192.168.56.2:8085/api/BilanAnnuel';

  constructor(private http: HttpClient , private authService: UserAuthService) { }

  envoyerBilan(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.post<any>(`${this.BASE_URL2}/envoyer`, null, { headers });
  }

  mesBilansAnnuel(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<any>(
      `${this.BASE_URL2}/mesBilansAnnuel`,
      { headers }
    );
  }
  
  getBilanById(bilanAnnuelId: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL2}/${bilanAnnuelId}`);
  }
  getListeBilanDesCollab(collaborateurId: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL2}/collaborateur/${collaborateurId}`);
  }

  mettreAJourBilanAnnuel(bilanAnnuelId: number, bilanAnnuelMiseAJour: any): Observable<any> {
    const authToken = this.authService.getToken(); // Assurez-vous que authService est injecté correctement
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json' // Ajoutez ceci pour spécifier le type de contenu JSON
    });
    headers.delete('Content-Type');
    return this.http.put<any>(`${this.BASE_URL2}/mettreAJour/${bilanAnnuelId}`, bilanAnnuelMiseAJour, { headers });
  }
  mettreAJouretEnvoyeBilanAnnuel(bilanAnnuelId: number, bilanAnnuelMiseAJour: any): Observable<any> {
    const authToken = this.authService.getToken(); // Assurez-vous que authService est injecté correctement
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json' // Ajoutez ceci pour spécifier le type de contenu JSON
    });
    headers.delete('Content-Type');
    return this.http.put<any>(`${this.BASE_URL2}/mettreAJouretEnvoyer/${bilanAnnuelId}`, bilanAnnuelMiseAJour, { headers });
  }

 }
