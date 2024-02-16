import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  accountInactiveError!: string;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ){
    this.email = '';
  }

  login(loginForm: any) {
    this.isLoading = true;
    this.passwordError = '';
    this.accountInactiveError = ''; // Réinitialiser l'erreur de compte inactif

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setRoles(response.roles[0]);
        this.userAuthService.setToken(response.accessToken);
        this.userAuthService.setRolesSession(response.roles[0]);
        this.userAuthService.setTokenSession(response.accessToken);
        this.userAuthService.setSessionId(response.id);
        this.userAuthService.setId(response.id);

        const role = response.roles[0];

        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'ManagerRh') {
          this.router.navigate(['/manager']);
        } else {
          this.router.navigate(['/collaborateur']);
        }
      },
      (error) => {
        console.log(error);
        if (error.status === 400) {
       const errorResponse = error.error;
         
          if (errorResponse.message === "Error: Invalid credentials!" )
           {
            this.passwordError = 'Email ou mot de passe invalides.';
          }
          if (errorResponse.message === 'Error: User Inactive!') {
            this.accountInactiveError = 'Votre compte n\'est pas actif.';
          }
        }
        this.isLoading = false;
      }
    );
  }
}
