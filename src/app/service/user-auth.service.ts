import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: any) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    if (roles) {
      try {
        return JSON.parse(roles);
      } catch (error) {
        console.error('Error parsing roles from localStorage:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }

  public setId(id: number) {
    localStorage.setItem('id', id.toString());
  }

  public getId(): number {
    return Number(localStorage.getItem('id'));
  }

  public getNom(): string {
    return localStorage.getItem('nom')!;
  }

  public setNom(nom: string) {
    localStorage.setItem('nom', nom);
  }

  public getFirstName(): string {
    return localStorage.getItem('firstName')!;
  }

  public getLastName(): string {
    return localStorage.getItem('lastName')!;
  }

  public getImage(): string {
    return localStorage.getItem('image')!;
  }

  public getUsername(): string {
    return localStorage.getItem('username')!;
  }

  public setRolesSession(roles: any) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRolesSession(): string[] {
    const roles = sessionStorage.getItem('roles');
    if (roles) {
      try {
        return JSON.parse(roles);
      } catch (error) {
        console.error('Error parsing roles from sessionStorage:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  public setSessionId(id: number) {
    sessionStorage.setItem('id', id.toString());
  }

  public getSessionId(): number {
    return Number(sessionStorage.getItem('id'));
  }

  public setTokenSession(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken);
  }

  public getTokenSession(): string {
    return sessionStorage.getItem('jwtToken')!;
  }

  public clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles().length && !!this.getToken();
  }

  public setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  public getUserData(): any {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing userData from localStorage:', error);
        return null;
      }
    } else {
      return null;
    }
  }
}
