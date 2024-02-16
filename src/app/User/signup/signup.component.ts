import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { SuccessDialogComponent } from '../Dialog/success-dialog/success-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'
]
})
export class SignupComponent implements OnInit{
  constructor(private userService: UserService , public dialog: MatDialog , private elementRef: ElementRef,private modalService: BsModalService){}

  ngOnInit() {
      
  }
  isHomme: boolean = false;
  isFemme: boolean = false;
  emailErrorMessage: string = '';
  matriculeErrorMessage: string = '';

  users: User = new User();
  @ViewChild('form') form!: NgForm;
  modalRef!: BsModalRef;

  openModal() {
    this.modalRef = this.modalService.show(SuccessDialogComponent);
  }
  emailExists: boolean = false;
matriculeExists: boolean = false;

onEmailChange() {
  this.emailExists = false;
}
onMatriculeChange() {
  this.matriculeExists = false;
}
save() {
  this.userService.checkEmail(this.users.email)
    .subscribe((exists: boolean) => {
      if (exists) {
        // Display error message for existing email
        this.emailExists = true;
      } else {
        // Check matricule existence
        this.userService.checkmatricule(this.users.matricule)
          .subscribe((matriculeExists: boolean) => {
            if (matriculeExists) {
              // Display error message for existing matricule
              this.matriculeExists = true;
            } else {
              // Continue with registration
              this.userService.Register(this.users)
                .subscribe(
                  (response: any) => {
                    console.log('User registered successfully:', response.message);
                    this.users = new User();
                    this.form.resetForm();
                    this.clearErrorMessages();
                    this.openModal(); 
                  },
                  error => {
                    // Handle registration error if needed
                  }
                );
            }
          });
      }
    });
}

  handleServerError(errorMessage: string) {
    // Traitez l'erreur côté serveur et affichez le message approprié
    if (errorMessage.includes('Cet e-mail est déjà utilisé')) {
      this.emailErrorMessage = errorMessage;
    } else if (errorMessage.includes('Ce matricule est déjà utilisé')) {
      this.matriculeErrorMessage = errorMessage;
    } else {
      console.error('Erreur inattendue:', errorMessage);
    }
  }
  openConfirmationDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      message: 'Votre inscription a été effectuée avec succès.'
    };
  
    // Calculer la position par rapport au formulaire
    const formRect = this.elementRef.nativeElement.getBoundingClientRect();
    const dialogHeight = 250; // Ajustez cette valeur en fonction de votre contenu de dialog
  
    // Déplacer le dialog deux fois l'espace vers le bas
    const centerY = formRect.top - (2 * dialogHeight);
  
    // Décaler légèrement le dialog vers la droite, en ajoutant une valeur fixe
    const centerX = formRect.left + (formRect.width / 2) - 250; // Ajustez cette valeur en fonction de vos besoins
  
    dialogConfig.position = { top: centerY + 'px', left: centerX + 'px' };
  
    const dialogRef = this.dialog.open(SuccessDialogComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialog de succès a été fermé');
    });
  }
  
  clearErrorMessages() {
    // Effacer les messages d'erreur en réinitialisant les modèles associés
    this.form.resetForm();

  }
  confirmPassword: string = '';
  passwordsMatch(): boolean {
    return this.users.password === this.confirmPassword;
  }


  passwordStrengthPercentage(): string {
    // Implémentez le calcul du pourcentage de force du mot de passe ici
    // Par exemple, retournez un pourcentage basé sur la longueur du mot de passe
    // Vous pouvez également utiliser des bibliothèques ou des algorithmes sophistiqués pour évaluer la force du mot de passe
    return ((this.users.password.length / 20) * 100) + '%'; // Par exemple, diviser la longueur par 20 et multiplier par 100 pour obtenir un pourcentage
  }


  passwordStrength(): string {
    // Implémentez la logique pour décrire la force du mot de passe ici
    // Par exemple, vous pouvez retourner un texte basé sur la longueur ou la complexité du mot de passe
    if (this.users.password.length < 8) {
      return 'Faible';
    } else if (this.users.password.length < 15) {
      return 'Moyen';
    } else {
      return 'Fort';
    }
  }


   passwordStrengthClass(): string {
    // Attribution de classes CSS en fonction de la force du mot de passe
    if (this.users.password.length >= 12 && /[!@#$%&*_?]/.test(this.users.password)) {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-success'; // Vert pour fort
    } else if (this.users.password.length >= 8) {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-warning'; // Orange pour moyen
    } else {
      return 'progress-bar progress-bar-striped progress-bar-animated progress-bar-danger'; // Rouge pour faible
    }
  }
  passwordStrengthScore(): number {
    const password = this.users.password;
    let score = 0;

    // Logique de calcul du score du mot de passe (identique à la méthode passwordStrength())

    return score;
  }
  onNumTelInput(event: any) {
    const inputValue: string = event.target.value;

    // Limite la longueur à 8 chiffres
    if (inputValue.length > 8) {
        this.users.numtel = parseInt(inputValue.substring(0, 8));
    }

}
isSopraHrEmail(email: string): boolean {
  return email.endsWith('@soprahr.com') || email.endsWith('@gmail.com');
}

passwordInvalid = false;
confirmPasswordInvalid = false;

// Cette fonction valide les champs de mot de passe
validatePasswordFields() {
    this.passwordInvalid = !this.users.password;
    this.confirmPasswordInvalid = !this.confirmPassword;
}








}
