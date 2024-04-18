import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParticapationFormationService {

  private BASE_URL2 = 'http://localhost:8080/api/ParticipationFormation';
  
  constructor(private http: HttpClient , private authService: UserAuthService) { }
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
}
