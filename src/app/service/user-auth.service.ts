import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setRoles(roles:any) {
    localStorage.setItem("roles", JSON.stringify(roles)) ;
  }
 public getRoles(): [] {

   const roles= JSON.parse(localStorage.getItem('roles')!);
   if (roles) {
    return JSON.parse(roles);
  } else {
    return [];
  }

  }
  public setToken(jwtToken:string) {
    localStorage.setItem("jwtToken",jwtToken) ;

  }
  public getToken(): string {
  return localStorage.getItem("jwtToken")! ;

  }

  public setId(id:number) {
    localStorage.setItem("id",id.toString()) ;
  }

  public getId(): number {
  return Number(localStorage.getItem("id"))! ;
  }
  public getNom(): string {
    return localStorage.getItem("nom")!;
  }
  public setNom(nom:string) {
    localStorage.setItem("nom",nom) ;
  }
  public getFirstName(): string {
    return localStorage.getItem("firstName")!;
  }

  public getLastName(): string {
    return localStorage.getItem("lastName")!;
  }

  public getImage(): string {
    return localStorage.getItem("image")!;
  }
  public getUsername(): string {
    return localStorage.getItem("username")!;
  }

  public setRolesSession(roles:any) {
    sessionStorage.setItem("roles", JSON.stringify(roles)) ;
  }
  public getRolesSession(): [] {

   const roles= JSON.parse(sessionStorage.getItem('roles')!);
   if (roles) {
    return JSON.parse(roles);
  } else {
    return [];
  }

  }

  public setSessionId(id:number) {
    sessionStorage.setItem("id",id.toString()) ;}
    public getSessionId(): number {
      return Number(sessionStorage.getItem("id"))! ;}


  public setTokenSession(jwtToken:string) {
    sessionStorage.setItem("jwtToken",jwtToken) ;

  }
  public getTokenSession(): string {
  return sessionStorage.getItem("jwtToken")! ;

  }



  public clear() {
    localStorage.clear() ;
    sessionStorage.clear();

  }
  public isLoggedIn() {
    return this.getRoles() && this.getToken() ;
  }
  public setUserData(userData: any) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  public getUserData(): any {
    const userData = JSON.parse(localStorage.getItem("userData")!);
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }
}