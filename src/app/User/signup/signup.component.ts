import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService: UserService ){}

  ngOnInit() {
      
  }
  users: User = new User();
  @ViewChild('form') form!: NgForm; // Référence au formulaire

  save() {
    this.userService.Register(this.users)
      .subscribe(
        (response: any) => {
          console.log('User registered successfully:', response.message);
          this.users = new User();
          this.form.resetForm();
          this.clearErrorMessages();  

        },
        error => {
          console.error('Error registering user:', error);
        }
      );
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
isSopraHrEmail(email: string) {
  return email.endsWith('@soprahr.com');
}
passwordInvalid = false;
confirmPasswordInvalid = false;

// Cette fonction valide les champs de mot de passe
validatePasswordFields() {
    this.passwordInvalid = !this.users.password;
    this.confirmPasswordInvalid = !this.confirmPassword;
}

}
