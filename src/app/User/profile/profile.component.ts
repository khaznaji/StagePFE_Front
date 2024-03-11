import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService ,private fb: FormBuilder ,private router: Router,private http: HttpClient ,       private Auth: UserAuthService,
    ){ }
  data: any = [];
  username!:string;
  email!:string;
  role!:string;
  matricule!:string;
  numtel!:number;
  genre!:number;

  food!:User;

  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'));
    this.imagePreview = 'assets/images/' + this.food.image;


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
  isFormVisible: boolean = true;
  isFormVisibleInfo: boolean = true;
  showUpdateForm = false;

  toggleFormVisibilityInfo() {
    this.showUpdateForm = false;
  }
  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }
  newEmail: string = '';
  newNumtel: number = 0;
  updateInfo() {
  
}
projectData: FormData = new FormData();
files: File[] = [];
project: User = new User();
thumbnails: string[] = [];
imagePreview: string | undefined;
// Tableau pour stocker les URL des miniatures générées


selectedFile!: File;
file: File | null = null;
profileForm!: FormGroup;

profileError: string | null = null;  // Declare the profileError variable

onSubmitr() {
  const formData = new FormData();
  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
  }

  formData.append('numtel', this.project.numtel.toString());
  formData.append('email', this.project.email);

  this.userService.updateProfile(formData).subscribe(
    (response) => {
      console.log(response);

      // Handle the server response
      // Perform other actions if necessary
    },
    (error) => {
      console.error(error);
      // Handle any errors that occur
    }
  );
}



onSubmit(): void {
  const formData = new FormData();
  formData.append('newEmail', this.profileForm.get('newEmail')?.value || '');
  formData.append('newNumtel', this.profileForm.get('newNumtel')?.value?.toString() || '');

  // Append image only if it is not null or undefined
    for (let i = 0; i < this.files.length; i++) {
      formData.append('image', this.files[i]);
    }

  this.userService.updateProfile(formData).subscribe(
    (response) => {
      console.log(response); // Handle success response
      // Optionally, you can navigate to a different page or display a success message
    },
    (error) => {
      console.error(error); // Handle error response
      // Optionally, you can display an error message to the user
    }
  );
}

  passwordStrengthPercentage(): string {
    // Implémentez le calcul du pourcentage de force du mot de passe ici
    // Par exemple, retournez un pourcentage basé sur la longueur du mot de passe
    // Vous pouvez également utiliser des bibliothèques ou des algorithmes sophistiqués pour évaluer la force du mot de passe
    return ((this.newPassword.length / 20) * 100) + '%'; // Par exemple, diviser la longueur par 20 et multiplier par 100 pour obtenir un pourcentage
  }


  passwordStrength(): string {
    // Implémentez la logique pour décrire la force du mot de passe ici
    // Par exemple, vous pouvez retourner un texte basé sur la longueur ou la complexité du mot de passe
    if (this.newPassword.length < 8) {
      return 'Faible';
    } else if (this.newPassword.length < 15) {
      return 'Moyen';
    } else {
      return 'Fort';
    }
  }


   passwordStrengthClass(): string {
    // Attribution de classes CSS en fonction de la force du mot de passe
    if (this.newPassword.length >= 12 && /[!@#$%&*_?]/.test(this.newPassword)) {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-success'; // Vert pour fort
    } else if (this.newPassword.length >= 8) {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-warning'; // Orange pour moyen
    } else {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-danger'; // Rouge pour faible
    }
  }
  passwordStrengthScore(): number {
    const password = this.newPassword;
    let score = 0;

    // Logique de calcul du score du mot de passe (identique à la méthode passwordStrength())

    return score;
  }
  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  passwordError: string | null = null;
status!:string;
image: File | null = null;

updateProfileForm(): void {
  // Ensure that the image is not null before calling the service
  if (this.image !== null) {
    this.userService.updateProfileE(this.email, this.numtel, this.image).subscribe(
      response => {
        console.log(response);

        // Display a success alert using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Profil mis à jour',
          text: 'Votre profil a été mis à jour avec succès !',
        });
        timer(3000).subscribe(() => {
          // Rafraîchir la page
          window.location.reload();
        });
      },
      error => {
        console.error(error);

        // Display an error alert using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la mise à jour de votre profil. Veuillez réessayer.',
        });
      }
    );
  } else {
    // Handle the case where the image is not selected
    console.log("No image selected for update");
  }}

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
  
      // Affiche un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.image);
    }
  }

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

