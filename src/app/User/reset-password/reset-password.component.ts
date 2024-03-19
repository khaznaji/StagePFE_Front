import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MotdepasseComponent } from '../Dialog/motdepasse/motdepasse.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  token!: string;
  password!: string;
  confirmPassword!: string;
  errorMessage!: string;
  successMessage!: string;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,private modalService: BsModalService ) { }
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
      password: this.password

    };
    const options = {
      params: { token: this.token ,
        password: this.password  // Assurez-vous que le nom du champ correspond au paramètre côté serveur
}
    };
    this.http.post<any>('http://localhost:8080/auth/reset', resetData, options).subscribe(
      response => {
        this.successMessage = response;
        this.errorMessage = '';
        form.resetForm();
        this.openModal(); 
        setTimeout(() => {
          this.router.navigate(['/signin']);  // Assurez-vous d'importer Router depuis '@angular/router'
      }, 4000);
      },
      error => {
        console.error('Error Response:', error);
        this.errorMessage = 'Échec de la réinitialisation du mot de passe.';
      }
    );
  }

  passwordStrengthPercentage(): string {
   return ((this.password.length / 20) * 100) + '%'; // Par exemple, diviser la longueur par 20 et multiplier par 100 pour obtenir un pourcentage
  }

  passwordStrength(): string {
    if (this.password.length < 8) {
      return 'Faible';
    } else if (this.password.length < 15) {
      return 'Moyen';
    } else {
      return 'Fort';
    }
  }

  passwordStrengthClass(): string {
    if (this.password.length >= 12 && /[!@#$%&*_?]/.test(this.password)) {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-success'; // Vert pour fort
    } else if (this.password.length >= 8) {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-warning'; // Orange pour moyen
    } else {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-danger'; // Rouge pour faible
    }
  }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  modalRef!: BsModalRef;

  openModal() {
  this.modalRef = this.modalService.show(MotdepasseComponent);
}
}