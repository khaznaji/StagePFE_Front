import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessDialogComponent } from 'src/app/User/Dialog/success-dialog/success-dialog.component';
import { Competence } from 'src/app/model/competence.model';
import { ManagerService } from 'src/app/model/managerservice.model';
import { User } from 'src/app/model/user.model';
import { CompetenceService } from 'src/app/service/competence.service';
import { ManagerserviceService } from 'src/app/service/managerservice.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit{
  constructor(private userService: UserService ,private router: Router ,private competenceService: CompetenceService , private fb: FormBuilder , private Auth: UserAuthService,public dialog: MatDialog , private elementRef: ElementRef,private modalService: BsModalService , private managerservice : ManagerserviceService){}
  managerServiceForm!: FormGroup;
 
  ngOnInit() {

    this.managerServiceForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numtel: ['', Validators.required],
      matricule: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      poste: ['', Validators.required],
      bio: [''],
      dateEntree: ['', Validators.required],
  
    });
  }
  todayDate(): string {
    const currentDate = new Date();
    return formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
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
    this.form.resetForm();
  }
  confirmPassword: string = '';

  onNumTelInput(event: any) {
    const inputValue: string = event.target.value;
    if (inputValue.length > 8) {
        this.users.numtel = parseInt(inputValue.substring(0, 8));
    }

}
isSopraHrEmail(email: string): boolean {
  return email.endsWith('@soprahr.com') || email.endsWith('@gmail.com');
}
project: ManagerService = new ManagerService();
projects: User = new User();
image: File | null = null;
currentStep = 1; // Use a generic type or 'any' if the type is dynamic
errorMessage: string = '';

nextStep(): void {
  // Réinitialisez errorMessage
  this.errorMessage = '';

  // Vérifiez la validité des champs spécifiques
  const nomControl = this.managerServiceForm.get('nom');
  const prenomControl = this.managerServiceForm.get('prenom');
  const matriculeControl = this.managerServiceForm.get('matricule');
  const numtelControl = this.managerServiceForm.get('numtel');
  const genderControl = this.managerServiceForm.get('gender');

  if (
    nomControl && prenomControl && matriculeControl && numtelControl && genderControl &&
    nomControl.valid && prenomControl.valid && matriculeControl.valid && numtelControl.valid && genderControl.valid
  ) {
    // Passez au step suivant
    this.currentStep++;
    this.errorMessage = '';

  } else {
    // Affichez un message d'erreur si l'une des validations échoue
    this.errorMessage = 'Veuillez remplir correctement les champs obligatoires avant de passer à l\'étape suivante.';
  }
}




  Step() {
    this.currentStep--;
  }
onSubmit() {
  if (this.managerServiceForm && this.managerServiceForm.valid) {
    const formData = new FormData();
    formData.append('nom', this.managerServiceForm.get('nom')?.value || '');
    formData.append('prenom', this.managerServiceForm.get('prenom')?.value || '');
    formData.append('numtel', (this.managerServiceForm.get('numtel')?.value || '').toString());
    formData.append('matricule', this.managerServiceForm.get('matricule')?.value || '');
    formData.append('email', this.managerServiceForm.get('email')?.value || '');
    formData.append('gender', this.managerServiceForm.get('gender')?.value || '');
    formData.append('department', this.managerServiceForm.get('department')?.value || '');
    formData.append('poste', this.managerServiceForm.get('poste')?.value || '');
    formData.append('dateEntree', this.managerServiceForm.get('dateEntree')?.value || '');
    this.managerservice.createManagerService(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Succès !',
          text: 'Service manager créé avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Attendre 3 secondes avant de recharger la page
          setTimeout(() => {
            // Rediriger vers la page désirée après 3 secondes
            this.router.navigate(['/managerRh/all-manager-service']);
          }, 3000);
        });
      },
      (error) => {
        let errorMessage = 'Erreur lors de la création du service manager.';

        if (error.error && error.error.message) {
          errorMessage += ' ' + error.error.message;
        }
       
      }
    );
  }
}











}
