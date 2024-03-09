import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService  ,private router: Router,private http: HttpClient ,       private Auth: UserAuthService,
    ){ }
  data: any = [];
  username!:string;
  email!:string;
  role!:string;
  matricule!:string;
  numtel!:number;
  genre!:number;


  image!:string;
  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'));
  }
  getUserByid(id: any) {
    const headers = { 'Authorization': 'Bearer ' + this.Auth.getToken() };
    this.userService.getUserById2(id,headers).subscribe((res) => {      this.data = res;
      console.log(this.data);
      this.username = this.data.nom + ' ' + this.data.prenom;
      this.image = this.data.image;
      this.email = this.data.email;
      this.role = this.data.role;
      this.matricule = this.data.matricule;
      this.numtel = this.data.numtel;
      this.genre = this.data.gender;

      console.log('User info:', this.data);
      console.log('User photo:', this.image);
    });
  }
  confirmDelete(): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous êtes sur le point de supprimer votre compte.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, trigger the account deletion
        this.deleteAccount(localStorage.getItem('id'));
        this.router.navigate(['/signup']);

      }
    });
  }

  // Method to delete the account
  deleteAccount(id: any): void {
    // Call your deleteAccount method from the service
    this.userService.deleteAccount(id).subscribe(
      () => {
        // Successful deletion
        Swal.fire('Compte supprimé !', 'Votre compte a été supprimé avec succès.', 'success');
        // Optionally, navigate to a different page or perform additional actions
      },
      (error) => {
        // Handle error if deletion fails
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du compte.', 'error');
        console.error('Error deleting account:', error);
      }
    );
  }
  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  passwordError: string | null = null;
status!:string;
  changePassword(form: NgForm): void {
    this.passwordError = null;  // Réinitialiser le message d'erreur

    if (form.valid && this.newPassword === this.confirmPassword) {
      this.userService.updatePassword(this.oldPassword, this.newPassword).subscribe(
        response => {

         
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Mot de passe mis à jour avec succès.',
              confirmButtonText: 'OK',
            });
            form.reset();  // Effacez le formulaire après la mise à jour réussie
          } 
          
        ,
        error => {
          console.error(error);
      
          if (error.status === 400) {
            this.passwordError = 'Votre ancien mot de passe est incorrect.';
          } else {
            this.passwordError = 'Une erreur s\'est produite lors de la mise à jour du mot de passe.';
          }
      
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: this.passwordError,
            confirmButtonText: 'OK',
          });
        }
      );
      
      }else {
      this.passwordError = 'Veuillez remplir correctement tous les champs et assurez-vous que les nouveaux mots de passe correspondent.';
    }
  }
  
}

