import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, catchError } from 'rxjs';
import { Poste } from '../model/poste.model';
import { Candidature } from '../model/candidature.model';
import { throwError } from 'rxjs';
import { EtatPostulation } from '../model/etatpostulation.model';
@Injectable({
  providedIn: 'root',
})
export class PosteService {
  private BASE_URL2 = 'http://192.168.56.2:8085/api/Poste';
  constructor(private http: HttpClient, private authService: UserAuthService) {}

  createPoste(formData: FormData): Observable<Poste> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.post<Poste>(`${this.BASE_URL2}/create`, formData, {
      headers,
    });
  }
  editPoste(postId: number, postData: FormData): Observable<Poste> {
    const url = `${this.BASE_URL2}/edit/${postId}`;
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');

    return this.http.put<Poste>(url, postData, { headers });
  }
  updateCandidatureState(
    candidatId: string,
    newState: string
  ): Observable<any> {
    const params = new HttpParams().set('newState', newState);
    return this.http.put(`${this.BASE_URL2}/updateState/${candidatId}`, null, {
      params,
    });
  }
  modifierEtat(
    collaborateurId: number,
    posteId: number,
    newState: string
  ): Observable<Candidature> {
    const url = `${this.BASE_URL2}/modifierEtat/${collaborateurId}/${posteId}/${newState}`;
    return this.http.put<Candidature>(url, null); // null est passé comme corps de requête car vous n'avez pas de données à envoyer
  }
  updateStateEntretien(collaborateurId: string): Observable<Candidature> {
    const url = `${this.BASE_URL2}/updateStateEntretien/${collaborateurId}`;
    return this.http.put<Candidature>(url, null); // null est passé comme corps de requête car vous n'avez pas de données à envoyer
  }
  updateStateRefus(collaborateurId: string): Observable<Candidature> {
    const url = `${this.BASE_URL2}/updateStateRefus/${collaborateurId}`;
    return this.http.put<Candidature>(url, null); // null est passé comme corps de requête car vous n'avez pas de données à envoyer
  }
  getAllCandidatures(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL2}/AllCandidature/${posteId}`);
  }
  AllCandidaturePreselectionne(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.BASE_URL2}/CandidaturesSpecifiques/${posteId}`
    );
  }
  getCandidatureDates(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL2}/${posteId}/datesentretien`);
  }
  getAllPostes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.BASE_URL2}/getAll`);
  }
  getDemandesEnCours(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.BASE_URL2}/demandesEnCours`);
  }

  getPostePulie(): Observable<Poste[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<Poste[]>(`${this.BASE_URL2}/postepublie`, { headers });
  }
  getPostePulieCoteManagerRh(): Observable<Poste[]> {
    return this.http.get<Poste[]>(
      `${this.BASE_URL2}/getPostePublieCoteManagerRh`
    );
  }
  getApprovedAndNotAppliedPostes(): Observable<Poste[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<Poste[]>(
      `${this.BASE_URL2}/getApprovedAndNotAppliedPostes`,
      { headers }
    );
  }

  getMesPostulations(): Observable<Candidature[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<Candidature[]>(`${this.BASE_URL2}/postulations`, {
      headers,
    });
  }
  getMesTestTechnique(): Observable<Candidature[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<Candidature[]>(
      `${this.BASE_URL2}/testsForConnectedCollaborator`,
      { headers }
    );
  }
  updateScore(candidatureId: number, newScore: number) {
    return this.http.put(
      `${this.BASE_URL2}/${candidatureId}/score?score=${newScore}`,
      {}
    );
  }
  updateEtatQuizz(candidatureId: number): Observable<any> {
    return this.http.put(`${this.BASE_URL2}/updateEtatQuizz/${candidatureId}`, null);
  }

  getPosteById(postId: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.BASE_URL2}/getPosteById/${postId}`);
  }

  updateApproval(postId: number): Observable<any> {
    return this.http.put(`${this.BASE_URL2}/updateApproval/${postId}`, {});
  }
  PubliePoste(postId: number): Observable<any> {
    return this.http.put(`${this.BASE_URL2}/publieposte/${postId}`, {});
  }
  ArchiverPoste(postId: number): Observable<any> {
    return this.http.put(`${this.BASE_URL2}/archivePoste/${postId}`, {});
  }
  updateRefus(postId: number): Observable<any> {
    return this.http.put(`${this.BASE_URL2}/updateRefus/${postId}`, {});
  }

  deletePoste(postId: number): Observable<any> {
    const url = `${this.BASE_URL2}/delete/${postId}`;
    return this.http.delete(url);
  }
  deletePosteByCompetence(
    postId: number,
    competenceId: number
  ): Observable<any> {
    const url = `${this.BASE_URL2}/deleteCompetence/${postId}/${competenceId}`;
    return this.http.delete(url);
  }
  addCompetencesToPoste(
    postId: number,
    competenceIds: number[]
  ): Observable<any> {
    const url = `${this.BASE_URL2}/${postId}/competences`;
    return this.http.post(url, competenceIds).pipe(
      catchError((error) => {
        // Gérer les erreurs ici
        return throwError(error);
      })
    );
  }
  getApprovedPostes(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL2}/getApprovedPostes`);
  }

  postuler(postId: number): Observable<string> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.post<string>(`${this.BASE_URL2}/postuler/${postId}`, {
      headers,
    });
  }

  PosteEncoursRefuse(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<any>(
      `${this.BASE_URL2}/PostesEnCoursRefuseByManagerService`,
      { headers }
    );
  }
  PosteArchive(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<any>(
      `${this.BASE_URL2}/posteArchive`,
      { headers }
    );
  }
  PosteApprouve(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<any>(
      `${this.BASE_URL2}/AllPostesApprouveByManagerService`,
      { headers }
    );
  }

  deletePosteByManagerService(postId: number): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    const url = `${this.BASE_URL2}/deletePosteByManagerService/${postId}`;
    return this.http.delete(url, { headers });
  }
  updatePosteCompetence(postId: number, postData: FormData): Observable<Poste> {
    const url = `${this.BASE_URL2}/editPosteComptence/${postId}`;
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.put<Poste>(url, postData, { headers });
  }
  getCandidatsByPosteId(postId: number): Observable<any[]> {
    const url = `${this.BASE_URL2}/getCandidatsByPosteId/${postId}`;
    return this.http.get<any[]>(url);
  }
  getCandidatsByPosteIdEnAttenteEntretien(postId: number): Observable<any[]> {
    const url = `${this.BASE_URL2}/getCandidatsByPosteIdEnAttenteEntretien/${postId}`;
    return this.http.get<any[]>(url);
  }
  getCandidatsByPosteIdEnAttenteEntretienRh(postId: number): Observable<any[]> {
    const url = `${this.BASE_URL2}/getCandidatsByPosteIdEnAttenteEntretienRh/${postId}`;
    return this.http.get<any[]>(url);
  }
  countCollaborateursEnAttente(postId: number): Observable<number> {
    return this.http.get<number>(
      `${this.BASE_URL2}/countCollaborateursEnAttente/${postId}`
    );
  }

  
  getCertifUser(collaborateurId: number): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL2}/userscertif/info/${collaborateurId}`
    );
  }
  getCollaborateurInfoById(collaborateurId: number): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL2}/collaborateur/info/${collaborateurId}`
    );
  }
  getUsersInfoById(collaborateurId: number): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL2}/users/info/${collaborateurId}`
    );
  }
  countCollaborateursAcceptees(postId: number): Observable<number> {
    return this.http.get<number>(
      `${this.BASE_URL2}/countCollaborateursAcceptees/${postId}`
    );
  }

  countCollaborateursRefusees(postId: number): Observable<number> {
    return this.http.get<number>(
      `${this.BASE_URL2}/countCollaborateursRefusees/${postId}`
    );
  }
  CandidatsVersEntretienRh(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.BASE_URL2}/CandidatsVersEntretienRh/${posteId}`
    );
  }
  CandidatsEntretienRh(posteId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.BASE_URL2}/CandidatsEntretienRh/${posteId}`
    );
  }
  accepterCandidature(candidatureIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL2}/candidatures/accepter`, candidatureIds);
  }
  updateCandidaturesEtatToEnAttente(candidatureIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL2}/updateEtatToEnAttente`, candidatureIds);
  }
}
