import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent  implements OnInit {
  token!: string;
  password!: string;
  confirmPassword!: string;
  errorMessage!: string;
  successMessage!: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];

    });
  }
  
  onSubmit(form: NgForm): void {
    console.log('Password:', this.password);
  
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
  
    const resetData = {
      token: this.token, // Incluez le token dans le corps de la requête
      password: this.password
    };
  
    this.http.post<any>('http://localhost:8080/User/reset', resetData).subscribe(
      response => {
        this.successMessage = response.text; // Vous pouvez également utiliser response.body selon la structure de la réponse côté serveur
        this.errorMessage = '';
        form.resetForm();
      },
      error => {
        console.error('Error Response:', error);
        this.errorMessage = 'Échec de la réinitialisation du mot de passe.';
      }
    );
  }
  
  
}
