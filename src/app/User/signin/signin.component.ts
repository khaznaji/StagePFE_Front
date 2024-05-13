import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string;
  isLoading: boolean = false;
  emailError!: string;
  passwordError!: string;
  recaptchaResolved: boolean = false;

  accountInactiveError!: string;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router 
    
  ){
    this.email = '';
  }
  resolved(captchaResponse: string) {
    // Cette fonction est appelée lorsque le reCAPTCHA est résolu avec succès
    this.recaptchaResolved = true;
  }

  login(loginForm: any) {
   
    this.isLoading = true;
    this.passwordError = '';
    this.accountInactiveError = ''; // Réinitialiser l'erreur de compte inactif
    if (!this.recaptchaResolved) {
      // Gérer le cas où le reCAPTCHA n'a pas été résolu
      this.isLoading = false;
      return;
    }
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        sessionStorage.setItem('token', response.accessToken);
        this.userAuthService.setRoles(response.roles[0]);
        this.userAuthService.setToken(response.accessToken);
        this.userAuthService.setRolesSession(response.roles[0]);
        this.userAuthService.setTokenSession(response.accessToken);
        this.userAuthService.setSessionId(response.id);
        this.userAuthService.setId(response.id);

        const role = response.roles[0];
        if (role === 'ManagerRh') {
          this.router.navigate(['/managerRh/dashboard']);
        } else if (role === 'ManagerService') {
          this.router.navigate(['/managerService']);
        } else if (role === 'Formateur') {
          this.router.navigate(['/formateur']);
        }  else if (role === 'Collaborateur')  {
          this.router.navigate(['/collaborateur']);
        }
      },
      
      (error) => {
        console.log(error);
        if (error.status === 400) {
       const errorResponse = error.error;
         
       if (errorResponse.message === "Error: Mot de passe invalide!") {
        this.passwordError = 'Mot de passe invalide.';
      } 
       if (errorResponse.message === 'Error: Compte inactif!') {
        this.accountInactiveError = 'Votre compte n\'est pas actif.';
      } 
       if (errorResponse.message === 'Error: Email not found!') {
        this.passwordError = 'Cet email n\'existe pas.';
      } 
        }
        this.isLoading = false;
      }
    );
  }
  isSopraHrEmail(email: string): boolean {
    return email.endsWith('@soprahr.com') || email.endsWith('@gmail.com');
  }
}
