import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { Poste } from '../model/poste.model';

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
  getPosteById(postId: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.BASE_URL2}/getPosteById/${postId}`);
  }
  updateApproval(postId: number): Observable<any> {
    return this.http.put(`${this.BASE_URL2}/updateApproval/${postId}`, {});
 }
 updateRefus(postId: number): Observable<any> {
  return this.http.put(`${this.BASE_URL2}/updateRefus/${postId}`, {});
}
}