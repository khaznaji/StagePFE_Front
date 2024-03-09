import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../model/user.model';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8080/auth';
  private BASE_URL2 = 'http://localhost:8080/api/User';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });


  constructor(private http: HttpClient , private authService: UserAuthService) { }
  Register(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/register`, events);
  } 
   login(loginData: any) {
    return this.http.post(this.BASE_URL + '/signin', loginData, {
      headers: this.requestHeader,
    });
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/all`);
  }
  getAllManagerServices(): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/managerServices`);
  }
  deleteAccount(id: any) {
    return this.http.delete(
      `${this.BASE_URL2}/deleteAccount/${id}`
    );
  }

  getAllCollab(): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/collaborateur`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/${id}`);
  }
  
  activateUser(userId: number): Observable<string> {
    const url = `${this.BASE_URL2}/${userId}/activate`;
    
    // Ajoutez l'en-tête pour indiquer que vous attendez une réponse de type texte
    const options = {
      headers: new HttpHeaders({ 'Accept': 'text/plain' }),
      responseType: 'text' as 'json'
    };

    return this.http.put(url, {}, options) as Observable<string>;
  }
// Modifiez votre service Angular pour inclure le token d'authentification dans les en-têtes
updatePassword(oldPassword: string, newPassword: string): Observable<string> 
{
  const url = `${this.BASE_URL2}/updatePassword`;

  // Récupérez le token d'authentification du service approprié (par exemple, votre service d'authentification)
  const authToken = this.authService.getToken();

  // Ajoutez le jeton d'authentification aux en-têtes de la requête
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  });

  // Vous pouvez ajuster les options en fonction de vos besoins
  const options = { headers };

  // Construire le corps de la demande
  const body = {
    oldPassword: oldPassword,
    newPassword: newPassword
  };

  // Effectuer la demande HTTP avec les paramètres dans la chaîne de requête
  return this.http.put<string>(url, body, { params: { oldPassword, newPassword }, headers });
}



  checkEmail(email: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/emailExists/${email}`);
  }
  createManagerService(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL2}/registerManagerService`, formData);
  } 
  createCollab(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL2}/registerCollaborateur`, formData);
  } 
  checkmatricule(matricule: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/matricule/${matricule}`);
  }
  requestPasswordReset(email: string) {
    return this.http.post('http://localhost:8080/api/User/request', { email });
  }
  getUserById(id: any) {
    // Ajoutez les en-têtes à votre requête HTTP
  
    return this.http.get(`${this.BASE_URL2}/finduserbyid/${id}`);
  }
  getUserById2(id: any, headers: any) {
    // Ajoutez les en-têtes à votre requête HTTP
    const options = { headers };
  
    return this.http.get(`${this.BASE_URL2}/finduserbyid/${id}`, options);
  }
  AddManagerService(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL2}/registerManagerService`, events);
  }  
  AddCollab(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL2}/registerCollab`, events);
  } 
  
}
