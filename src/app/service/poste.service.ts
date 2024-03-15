import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { Poste } from '../model/poste.model';
import { Candidature } from '../model/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class PosteService {
  private BASE_URL2 = 'http://localhost:8080/api/Poste';
  constructor(private http: HttpClient , private authService: UserAuthService) { }
  createPoste(formData: FormData): Observable<Poste> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  
    // Remove the 'Content-Type' header to allow the browser to set it automatically
    headers.delete('Content-Type');
  
    return this.http.post<Poste>(`${this.BASE_URL2}/create`, formData, { headers });
  }
  getAllPostes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.BASE_URL2}/getAll`);
  }
  getApprovedAndNotAppliedPostes(): Observable<Poste[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  
    // Remove the 'Content-Type' header to allow the browser to set it automatically
    headers.delete('Content-Type');
    return this.http.get<Poste[]>(`${this.BASE_URL2}/getApprovedAndNotAppliedPostes` , { headers } );
  } 
  getMesPostulations(): Observable<Candidature[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  
    // Remove the 'Content-Type' header to allow the browser to set it automatically
    headers.delete('Content-Type');
    return this.http.get<Candidature[]>(`${this.BASE_URL2}/postulations` , { headers } );
  } 
  getPosteById(postId: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.BASE_URL2}/getPosteById/${postId}`);
  }
  updateApproval(postId: number): Observable<any> {
    return this.http.put(`${this.BASE_URL2}/updateApproval/${postId}`, {});
 }
 updateRefus(postId: number): Observable<any> {
  return this.http.put(`${this.BASE_URL2}/updateRefus/${postId}`, {});
}
deletePoste(postId: number): Observable<any> {
  const url = `${this.BASE_URL2}/delete/${postId}`;
  return this.http.delete(url);
}
getApprovedPostes(): Observable<any> {
  return this.http.get<any>(`${this.BASE_URL2}/getApprovedPostes`);
}
postuler(postId: number): Observable<string> {
  const authToken = this.authService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });

  // Remove the 'Content-Type' header to allow the browser to set it automatically
  headers.delete('Content-Type');
  return this.http.post<string>(`${this.BASE_URL2}/postuler/${postId}`, {headers});
}
mespostes(): Observable<any> {
  const authToken = this.authService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });

  // Remove the 'Content-Type' header to allow the browser to set it automatically
  headers.delete('Content-Type');
  return this.http.get<any>(`${this.BASE_URL2}/AllPostesByManagerService`, {headers});
}
}
