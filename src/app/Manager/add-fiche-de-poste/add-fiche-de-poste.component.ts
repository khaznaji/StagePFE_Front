import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessDialogComponent } from 'src/app/User/Dialog/success-dialog/success-dialog.component';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Competence } from 'src/app/model/competence.model';
import { TypeContrat } from 'src/app/model/typeContrat.model';
import { User } from 'src/app/model/user.model';
import { CompetenceService } from 'src/app/service/competence.service';
import { PosteService } from 'src/app/service/poste.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fiche-de-poste',
  templateUrl: './add-fiche-de-poste.component.html',
  styleUrls: ['./add-fiche-de-poste.component.css'],
})
export class AddFicheDePosteComponent implements OnInit {
  constructor(
    private userService: UserService,
    private posteService: PosteService,
    private router: Router,
    private competenceService: CompetenceService,
    private fb: FormBuilder,
    private Auth: UserAuthService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private modalService: BsModalService
  ) {}
  managerServiceForm!: FormGroup;
  allCompetences: Competence[] = [];
  selectedCompetences: Competence[] = [];
  allManagerService: User[] = [];

  competences: Competence[] = [];
  domains: string[] = [
    'CDI',
    'CDD',
    'Temporaire',
    'Professionnalisation',
    'TempsPartiel',
    'ConsultantIndependant',
  ];

  ngOnInit() {
    this.selectedCompetences = [];

    this.getUserByid(localStorage.getItem('id'));
    this.managerServiceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      typeContrat: ['', Validators.required],
      competences: [[]],
    });
    this.competenceService.getAll().subscribe(
      (competences) => {
        this.competences = competences; // Ajoutez cette ligne pour affecter les compétences récupérées à this.competences
        console.log(this.allCompetences);
      },
      (error) => {
        console.error('Error fetching competences', error);
      }
    );

    // Watch for changes in the selected domain
    this.managerServiceForm
      .get('domain')
      ?.valueChanges.subscribe((selectedDomain) => {
        // Update the available competences based on the selected domain
        this.competenceService.getCompetencesByDomain(selectedDomain).subscribe(
          (competences) => (this.allCompetences = competences), // Remove .map(comp => comp.id)
          (error) => console.error('Error fetching competences:', error)
        );
      });
  }
  toggleCompetenceSelection(competence: Competence): void {
    const index = this.selectedCompetences.findIndex(
      (c) => c.id === competence.id
    );
    if (index !== -1) {
      this.selectedCompetences.splice(index, 1);
    } else {
      this.selectedCompetences.push(competence);
    }
  }
  isCompetenceSelected(competence: Competence): boolean {
    return this.selectedCompetences.some((c) => c.id === competence.id);
  }

  data: any = [];

  filteredCompetences: Competence[] = [];
  onDomainChange(event: any) {
    const selectedDomain = event.target.value;
    // Assuming allCompetences is an array of Competence objects
    this.filteredCompetences = this.allCompetences.filter(
      (comp) => comp.domaine === selectedDomain
    );
  }
  getUserByid(id: any) {
    const headers = { Authorization: 'Bearer ' + this.Auth.getToken() };
    this.userService.getUserById2(id, headers).subscribe((res) => {
      this.data = res;
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

  cancel() {
    // Réinitialiser le formulaire et effacer les messages d'erreur
    this.users = new User();
    this.form.resetForm();
    this.clearErrorMessages();
  }

  clearErrorMessages() {
    // Effacer les messages d'erreur en réinitialisant les modèles associés
    this.form.resetForm();
  }

  currentStep = 1; // Use a generic type or 'any' if the type is dynamic
  nextStep() {
    this.currentStep++;
  }
  Step() {
    this.currentStep--;
  }

  project: Collaborateur = new Collaborateur();
  projects: User = new User();
  image: File | null = null;
  searchTerm: string = '';
  searchResults: Competence[] = [];

  cancelSelection(competence: Competence): void {
    // Supprimer la compétence de la liste des compétences sélectionnées
    this.selectedCompetences = this.selectedCompetences.filter(
      (comp) => comp.id !== competence.id
    );
  }
  selectCompetence(competence: Competence): void {
    // Vérifier si la compétence est déjà sélectionnée
    const alreadySelected = this.selectedCompetences.find(
      (comp) => comp.id === competence.id
    );

    if (!alreadySelected) {
      // Ajouter la compétence à la liste des compétences sélectionnées
      this.selectedCompetences.push(competence);
    }

    // Réinitialiser la barre de recherche et les résultats de recherche
    this.searchTerm = '';
    this.searchResults = [];
  }
  searchCompetences(): void {
    if (this.searchTerm.length >= 3) {
      // Effectuez une recherche dans la liste des compétences pour trouver les correspondances
      this.searchResults = this.competences.filter((competence) =>
        competence.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }
  onSubmit() {
    if (this.managerServiceForm.valid) {
      const formData = new FormData();
      formData.append(
        'competences',
        this.selectedCompetences.map((comp) => comp.id).join(',')
      );
      formData.append('titre', this.managerServiceForm.get('titre')?.value);
      formData.append(
        'description',
        this.managerServiceForm.get('description')?.value
      );
      formData.append(
        'typeContrat',
        this.managerServiceForm.get('typeContrat')?.value
      );
      const titreValue = this.managerServiceForm.get('titre')?.value;
      console.log('Titre:', titreValue);
      this.posteService.createPoste(formData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Succès !',
            text: 'Poste envoye avec Succes',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            setTimeout(() => {
              this.router.navigate(['/managerService/mes-postes']);
            }, 3000);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Erreur !',
            text:
              'Erreur lors de la création du Collaborateur : ' + error.message, // Display the server error message
            icon: 'error',
            confirmButtonText: 'OK',
          }); // Ajoutez ici le code pour gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
        }
      );
    }
  }
}
