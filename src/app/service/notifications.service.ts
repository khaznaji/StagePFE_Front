import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private BASE_URL2 = 'http://localhost:8080/api/Notifications/notifications';

  constructor(private http: HttpClient, private authService: UserAuthService) {}
  getUserNotifications(): Observable<any[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.get<any[]>(this.BASE_URL2, { headers });
  }
  markNotificationAsSeen(notificationId: number): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    headers.delete('Content-Type');
    return this.http.put<any>(`${this.BASE_URL2}/markAsSeen`, notificationId, {
      headers,
    });
  }
}
