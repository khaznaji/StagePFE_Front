import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessDialogComponent } from 'src/app/User/Dialog/success-dialog/success-dialog.component';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Competence } from 'src/app/model/competence.model';
import { ManagerService } from 'src/app/model/managerservice.model';
import { User } from 'src/app/model/user.model';
import { CompetenceService } from 'src/app/service/competence.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-compte-collab',
  templateUrl: './add-compte-collab.component.html',
  styleUrls: ['./add-compte-collab.component.css']
})
export class AddCompteCollabComponent implements OnInit{
  constructor(private userService: UserService ,private router: Router, private competenceService: CompetenceService , private fb: FormBuilder , private Auth: UserAuthService,public dialog: MatDialog , private elementRef: ElementRef,private modalService: BsModalService){}
  managerServiceForm!: FormGroup;
  allCompetences: Competence[] = [];
  selectedCompetences: Competence[] = [];
  allManagerService: User[] = [];

  competences: number[] = [];
  domains: string[] = ["Finance_et_comptabilité", "Informatique_et_Technologie", "Ressources_humaines"];

  ngOnInit() {
    this.selectedCompetences = [];

    this.getUserByid(localStorage.getItem('id'));
    this.managerServiceForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numtel: ['', Validators.required],
      matricule: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      poste: ['', Validators.required],
      bio: [''],
      dateEntree: ['', Validators.required],
      competences: [[]] ,
      domain: ['', Validators.required],
      managerServiceId: ['', Validators.required],


    });
    this.competenceService.getAll().subscribe(
      (competences) => {
        this.allCompetences = competences;
        console.log(this.allCompetences)
      },
      (error) => {
        console.error('Error fetching competences', error);
      }
    );
    this.userService.getAllManagerServices().subscribe(
      (competences) => {
        this.allManagerService = competences;
        console.log(this.allManagerService)
      },
      (error) => {
        console.error('Error fetching ManagerService', error);
      }
    );
   // Watch for changes in the selected domain
this.managerServiceForm.get('domain')?.valueChanges.subscribe((selectedDomain) => {
  // Update the available competences based on the selected domain
  this.competenceService.getCompetencesByDomain(selectedDomain).subscribe(
    competences => this.allCompetences = competences, // Remove .map(comp => comp.id)
    error => console.error('Error fetching competences:', error)
  );
});
this.managerServiceForm.get('domain')?.valueChanges.subscribe((selectedDomain) => {
  // Sauvegarder les compétences sélectionnées actuelles
  const currentSelectedCompetences = this.managerServiceForm.get('competences')?.value;

  // Mettre à jour la liste des compétences disponibles
  this.competenceService.getCompetencesByDomain(selectedDomain).subscribe(
    competences => {
      this.allCompetences = competences;

      // Restaurer les compétences sélectionnées précédemment
      this.managerServiceForm.get('competences')?.setValue(
        currentSelectedCompetences.filter((compId: number) => this.competences.includes(compId))
        );
    },
    error => console.error('Error fetching competences:', error)
  );
});
  }
  toggleCompetenceSelection(competence: Competence): void {
    const index = this.selectedCompetences.findIndex(c => c.id === competence.id);
  
    if (index !== -1) {
      // Remove the competence if already selected
      this.selectedCompetences.splice(index, 1);
    } else {
      // Add the competence if not selected
      this.selectedCompetences.push(competence);
    }
  }
  
  isCompetenceSelected(competence: Competence): boolean {
    return this.selectedCompetences.some(c => c.id === competence.id);
  }
  
  data: any = [];
  currentStep = 1; // Use a generic type or 'any' if the type is dynamic
  nextStep() {
    this.currentStep++;
  }
  Step() {
    this.currentStep--;
  }
  filteredCompetences: Competence[] = [];

  onDomainChange(event: any) {
    const selectedDomain = event.target.value;
    // Assuming allCompetences is an array of Competence objects
    this.filteredCompetences = this.allCompetences.filter(comp => comp.domaine === selectedDomain);
  }
  getUserByid(id: any) {
    const headers = { 'Authorization': 'Bearer ' + this.Auth.getToken() };
    this.userService.getUserById2(id,headers).subscribe((res) => {      this.data = res;
      console.log(this.data);
     

      console.log('User info:', this.data);
    });
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
  const headers = { 'Authorization': 'Bearer ' + this.Auth.getToken() };
  console.log('Headers:', headers);

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
              this.userService.AddCollab(this.users)
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
cancel() {
  // Réinitialiser le formulaire et effacer les messages d'erreur
  this.users = new User();
  this.form.resetForm();
  this.clearErrorMessages();
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
  return ((this.users.password.length / 20) * 100) + '%'; // Par exemple, diviser la longueur par 20 et multiplier par 100 pour obtenir un pourcentage
  }


  passwordStrength(): string {
   if (this.users.password.length < 8) {
      return 'Faible';
    } else if (this.users.password.length < 15) {
      return 'Moyen';
    } else {
      return 'Fort';
    }
  }


   passwordStrengthClass(): string {
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
    return score;
  }
  onNumTelInput(event: any) {
    const inputValue: string = event.target.value;
    if (inputValue.length > 8) {
        this.users.numtel = parseInt(inputValue.substring(0, 8));
    }

}
isSopraHrEmail(email: string): boolean {
  return email.endsWith('@soprahr.com') || email.endsWith('@gmail.com');
}

passwordInvalid = false;
confirmPasswordInvalid = false;
validatePasswordFields() {
    this.passwordInvalid = !this.users.password;
    this.confirmPasswordInvalid = !this.confirmPassword;
}

project: Collaborateur = new Collaborateur();
projects: User = new User();
image: File | null = null;

onSubmit() {
  if (this.managerServiceForm.valid) {
    const formData = new FormData();

    // Ajoutez les autres contrôles de formulaire
    Object.keys(this.managerServiceForm.controls).forEach((key) => {
      if (key !== 'competences') {
        formData.append(key, this.managerServiceForm.get(key)!.value);
      }
    });
    console.log('ManagerServiceId:', this.managerServiceForm.get('managerServiceId')!.value);

    // Ajoutez l'ID du ManagerService à partir de la propriété managerServiceId du formulaire
    formData.append('managerServiceId', this.managerServiceForm.get('managerServiceId')!.value);

    // Ajoutez les compétences en tant qu'ID séparés par des virgules
    formData.append('competences', this.selectedCompetences.map(comp => comp.id).join(','));

    this.userService.createCollab(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Succès !',
          text: 'Collaborateur créé avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect to the desired page after success
          this.router.navigate(['/managerRh/all-collaborateur']);
        });
      },
      (error) => {
        Swal.fire({
          title: 'Erreur !',
          text: 'Erreur lors de la création du Collaborateur : ' + error.message, // Display the server error message
          icon: 'error',
          confirmButtonText: 'OK'
        });        // Ajoutez ici le code pour gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
      }
    );
  }
}










}
