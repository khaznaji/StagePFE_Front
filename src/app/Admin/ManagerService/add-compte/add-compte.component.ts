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
  nextStep() {
    this.currentStep++;
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
        Swal.fire({
          title: 'Erreur !',
          text: 'Erreur lors de la création du service manager : ' + error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}











}
