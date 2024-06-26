import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmailSuccessComponent } from '../Dialog/email-success/email-success.component';
import { RequestPasswordComponent } from '../request-password/request-password.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivationreussieComponent } from '../Dialog/activationreussie/activationreussie.component';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activation-compte',
  templateUrl: './activation-compte.component.html',
  styleUrls: ['./activation-compte.component.css']
})
export class ActivationCompteComponent {
  token!: string;
  code!: string;
  errorMessage!: string;
  successMessage!: string;

  constructor(private route: ActivatedRoute, private userService: UserService , private router: Router, private http: HttpClient , private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];

    });
  }
  regenerateCode(): void {
    // Call the regenerateCode method with the retrieved token
    this.userService.regenerateCode(this.token).subscribe(
      response => {
        // Show a success message using SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'Code régénéré avec succès. Veuillez vérifier votre boîte mail.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // Process the response as needed
      },
      error => {
        // Show an error message using SweetAlert
        Swal.fire({
          title: 'Error!',
          text: 'Erreur lors de la régénération du code : ' + error.message, // Afficher le message d'erreur du serveur
          icon: 'error',
          confirmButtonText: 'OK'
        });
        // Handle the error as needed
      }
    );
  }
  onSubmit(form: NgForm): void {
    const resetData = {
        code: this.code
    };

    const options = {
        params: { token: this.token, code: this.code }
    };

    this.http.post<any>('http://192.168.56.2:8085/auth/activate', resetData, options).subscribe(
        response => {
            this.successMessage = response.message;
            this.errorMessage = '';
            form.resetForm();
            this.openModal(); 
            setTimeout(() => {
              this.router.navigate(['/signin']);  // Assurez-vous d'importer Router depuis '@angular/router'
          }, 4000);
        },
        error => {
            console.error('Error Response:', error);
            if (error.error.includes('Jeton invalide ou expiré')) {
                this.errorMessage = 'Jeton invalide ou expiré.';
            } else if (error.error.includes('Code incorrect.')) {
                this.errorMessage = 'Code incorrect.';
            } else {
                this.errorMessage = 'Échec de la réinitialisation du mot de passe.';
            }
        }
    );
}
modalRef!: BsModalRef;
openModal() {
  this.modalRef = this.modalService.show(ActivationreussieComponent);
}



 
}