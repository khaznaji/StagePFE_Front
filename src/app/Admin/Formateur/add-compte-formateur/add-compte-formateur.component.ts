import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessDialogComponent } from 'src/app/User/Dialog/success-dialog/success-dialog.component';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Competence } from 'src/app/model/competence.model';
import { User } from 'src/app/model/user.model';
import { CollaborateurService } from 'src/app/service/collaborateur.service';
import { FormateurService } from 'src/app/service/formateur.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-compte-formateur',
  templateUrl: './add-compte-formateur.component.html',
  styleUrls: ['./add-compte-formateur.component.css']
})
export class AddCompteFormateurComponent  implements OnInit{
  constructor(private userService: UserService ,private router: Router, private collabService: FormateurService , private fb: FormBuilder , private Auth: UserAuthService,public dialog: MatDialog , private elementRef: ElementRef,private modalService: BsModalService){}
  managerServiceForm!: FormGroup;
  allCompetences: Competence[] = [];
  selectedCompetences: Competence[] = [];
  allManagerService: User[] = [];

  competences: number[] = [];
  domains: string[] = ["Finance_et_comptabilité", "Informatique_et_Technologie", "Ressources_humaines"];

  ngOnInit() {
    this.selectedCompetences = [];

    this.managerServiceForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numtel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      specialite: ['', Validators.required],
      dateEntree: ['', Validators.required],


    });

 


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
 
  
  clearErrorMessages() {
    // Effacer les messages d'erreur en réinitialisant les modèles associés
    this.form.resetForm();

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


project: Collaborateur = new Collaborateur();
projects: User = new User();
image: File | null = null;

onSubmit() {
  if (this.managerServiceForm.valid) {
    const formData = new FormData();

    formData.append('nom', this.managerServiceForm.get('nom')?.value || '');
    formData.append('prenom', this.managerServiceForm.get('prenom')?.value || '');
    formData.append('numtel', (this.managerServiceForm.get('numtel')?.value || '').toString());
    formData.append('matricule', this.managerServiceForm.get('matricule')?.value || '');
    formData.append('email', this.managerServiceForm.get('email')?.value || '');
    formData.append('gender', this.managerServiceForm.get('gender')?.value || '');
    formData.append('specialite', this.managerServiceForm.get('specialite')?.value || '');
const dateEntree: Date | null = this.managerServiceForm.get('dateEntree')?.value;

// Vérifiez si dateEntree est définie et non nulle
if (dateEntree instanceof Date && !isNaN(dateEntree.getTime())) {
    // Formatez la date au format ISO
    const formattedDate: string = dateEntree.toISOString();

    // Ajoutez la date formatée à FormData
    formData.append('dateEntree', formattedDate);
} else {
    console.error('La valeur de dateEntree est invalide ou nulle.');
}


    // Ajoutez les compétences en tant qu'ID séparés par des virgules

    this.collabService.createFormateur(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Succès !',
          text: 'Collaborateur créé avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Attendre 3 secondes avant de recharger la page
          setTimeout(() => {
            // Rediriger vers la page désirée après 3 secondes
            this.router.navigate(['/managerRh/all-collaborateur']);
          }, 3000);
        });
      },
      (error) => {
        console.log("error" ,error)
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
