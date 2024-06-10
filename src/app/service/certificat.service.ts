import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {
  private baseUrl = 'http://192.168.56.2:8085/api/certif';

  constructor(private http: HttpClient) { }
  create(idgroupe: number , formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/Generer/${idgroupe}`, formData);
  } 
  deleteCertificatesForGroup(groupId: number) {
    const url = `${this.baseUrl}/Supprimer/${groupId}`;
    return this.http.delete(url);
  }
  update(groupId: number, value: FormData): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ModifierCertificats/${groupId}`, value);
  }
  getUserCertificates(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/UserCertificates/${userId}`;
    return this.http.get<any[]>(url);
  }
  
  getUserCertificatesFormationNames(userId: number): Observable<string[]> {
    const url = `${this.baseUrl}/UserCertificatesFormation/${userId}`;
    return this.http.get<string[]>(url);
  }
}
