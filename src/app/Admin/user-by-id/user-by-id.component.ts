import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-by-id',
  templateUrl: './user-by-id.component.html',
  styleUrls: ['./user-by-id.component.css']
})
export class UserByIdComponent implements OnInit {
  userId!: number;
  userDetails: any; // Adjust the type based on your actual data structure

  constructor(private route: ActivatedRoute, private userService: UserService ,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    this.userService.getById(this.userId).subscribe(
      (response: any) => {
        this.userDetails = response;
        console.log(this.userDetails);  // Check the console for debugging
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  // Dans le composant TypeScript
redirectToUserDetail(userId: number) {
  console.log('Redirecting to user detail with ID:', userId);

  // Utilisez le service Router pour naviguer vers la route managerRh/user-detail/:id
  this.router.navigate(['/managerRh/user-detail', userId]);
}
toggleActivation(userId: number): void {
  this.userService.activateUser(userId).subscribe(
    response => {
      console.log(response); // Gérez la réponse de l'API comme nécessaire

      // Afficher l'alerte avec le message approprié
      const activationStatus = response.toLowerCase() === 'activé' ? 'activé' : 'désactivé';
      
      Swal.fire({
        icon: 'success',
        title: `Compte ${activationStatus}`,
        text: `Le statut d'activation de votre compte a été modifié avec succès. Un e-mail de notification a été envoyé pour vous informer du changement.`,
        confirmButtonText: 'OK',
        timer: 3000,  // Fermer automatiquement après 3 secondes
        showConfirmButton: false,  // Ne pas afficher le bouton de confirmation
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error => {
      console.error(error); // Gérez les erreurs

      // Afficher une alerte d'erreur en cas d'échec
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: `Une erreur s'est produite lors de la modification du statut d'activation du compte.`,
        confirmButtonText: 'OK',
      });
    }
  );
}
}