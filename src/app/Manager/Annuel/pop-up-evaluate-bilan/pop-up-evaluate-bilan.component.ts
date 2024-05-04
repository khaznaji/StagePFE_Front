import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Competence } from 'src/app/model/competence.model';
import { Evaluation } from 'src/app/model/evaluation.model';
import { CollaborateurService } from 'src/app/service/collaborateur.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { EvaluationService } from 'src/app/service/evaluation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pop-up-evaluate-bilan',
  templateUrl: './pop-up-evaluate-bilan.component.html',
  styleUrls: ['./pop-up-evaluate-bilan.component.css']
})
export class PopUpEvaluateBilanComponent implements OnInit {
  evaluations!: Evaluation[];
  newEvaluationValue!: number; // Nouvelle valeur d'évaluation
  selectedEvaluation: Evaluation | null = null; // Évaluation sélectionnée pour la modification
  showModifyForm = false; 
  project: Collaborateur = new Collaborateur();
  showAddForm = false; // Déclaration de la propriété showAddForm
  selectedCompetence: Competence | null = null;
  constructor(private evaluationService: EvaluationService ,       private modalRef: BsModalRef
    // Injectez ActivatedRoute dans le constructeur
  , private competenceService : CompetenceService) { }

  @Input() idCollab!: number;

   
  ngOnInit(): void {
    if (this.modalRef.content) {
      this.idCollab = this.modalRef.content.idCollab;
    }
    this.getEvaluations();
    this.getCompetences();
  }

  getEvaluations(): void {
    this.evaluationService.getEvaluationCollab(this.idCollab)
      .subscribe(evaluations => this.evaluations = evaluations);
  }
  getCompetences(): void {
    this.competenceService.getAll().subscribe(
      (competences) => {
        this.competences = competences;
      },
      (error) => {
        console.error('Error fetching competences', error);
      }
    ); 
  }


  showMainContent = true; // Ajoutez cette ligne
  showSearchBar = true; // Affiche la barre de recherche par défaut

  openModifyForm(evaluation: Evaluation): void {
     this.selectedEvaluation = evaluation;
     this.showModifyForm = true;
     this.showMainContent = false; // Cache le reste du contenu
  }
 
  closeModifyForm(): void {
     this.selectedEvaluation = null;
     this.showModifyForm = false;
     this.showMainContent = true; // Affiche le reste du contenu
  }

 openAddForm(): void {
    this.showMainContent = false; // Cache le reste du contenu
    this.showAddForm = true; // Affiche le formulaire d'ajout de compétence
 }

 closeAddForm(): void {
  this.showMainContent = true; // Affiche le reste du contenu
  this.showAddForm = false; // Cache le formulaire d'ajout de compétence
  this.showSearchBar = true; // Affiche la barre de recherche
}
selectedRate: number = 1; // Note sélectionnée par défaut
selectRating(rate: number): void {
  this.selectedRate = rate;
  this.newEvaluationValue = rate; // Mettre à jour newEvaluationValue avec la valeur de rate sélectionnée
}


getProgressBarWidth(rate: number): string {
  // Supposons que la note maximale est 100
  const maxRate = 10;
  return `${rate}%`;
}

updateEvaluation(selectedEvaluation: Evaluation, newEvaluationValue: number): void {
  if (!selectedEvaluation) return; // Vérifiez si une évaluation est sélectionnée

  // Appel du service pour mettre à jour l'évaluation
  this.evaluationService.updateEvaluationByIdForCollab(selectedEvaluation.id, newEvaluationValue , this.idCollab)
    .subscribe(() => {
      // Afficher un message de succès après la mise à jour
      Swal.fire(
        'Succès!',
        'L\'évaluation a été mise à jour avec succès.',
        'success'
      );
      // Réactualisez les évaluations après la mise à jour
      this.getEvaluations();
      this.closeModifyForm(); // Fermez le formulaire de modification après la mise à jour
    }, error => {
      // Afficher un message d'erreur en cas d'échec de la mise à jour
      Swal.fire(
        'Erreur!',
        'Erreur lors de la mise à jour de l\'évaluation: ' + error.message,
        'error'
      );
      console.error("Erreur lors de la mise à jour de l'évaluation:", error);
      // Gérer l'erreur
    });
}
  deleteEvaluation(evaluationId: number): void {
    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer cette évaluation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Appel du service pour supprimer l'évaluation
        this.evaluationService.deleteEvaluationForCollab(evaluationId , this.idCollab)
          .subscribe(() => {
            // Afficher un message de succès après la suppression
            Swal.fire(
              'Supprimé!',
              'L\'évaluation a été supprimée avec succès.',
              'success'
            );
            // Réactualiser les évaluations après la suppression
            this.getEvaluations();
          }, error => {
            // Afficher un message d'erreur en cas d'échec de la suppression
            Swal.fire(
              'Erreur!',
              'Erreur lors de la suppression de l\'évaluation: ' + error.message,
              'error'
            );
            console.error("Erreur lors de la suppression de l'évaluation:", error);
            // Gérer l'erreur
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Action si l'utilisateur annule la suppression
        Swal.fire(
          'Annulé',
          'La suppression de l\'évaluation a été annulée.',
          'error'
        );
      }
    });
  }
  competences: Competence[] = [];
  selectedCompetenceId: number | null = null;
  searchCompetences(): void {
    if (this.searchTerm.length >= 3) {
      // Effectuez une recherche dans la liste des compétences pour trouver les correspondances
      this.searchResults = this.competences.filter(competence =>
        competence.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }
  searchTerm: string = '';
  searchResults: Competence[] = [];
  selectCompetence(competence: Competence): void {
    this.selectedCompetence = competence;
    this.searchTerm = '';
    this.searchResults = [];
    this.showSearchBar = false; // Cache la barre de recherche
  }
 

   
 
addEvaluation(): void {
  if (this.selectedCompetence && this.newEvaluationValue) {
    // Appelez le service pour ajouter l'évaluation
    this.evaluationService.addEvaluationForCollab(this.idCollab , this.selectedCompetence.id, this.newEvaluationValue)
      .subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'Évaluation ajoutée avec succès: ' + response.message,
          });
          // Ajoutez ici la logique de traitement de la réponse si nécessaire

        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Erreur lors de l\'ajout de l\'évaluation: ' + error.error.message,
          });
          // Ajoutez ici la logique de gestion des erreurs si nécessaire

        }
      );
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erreur!',
      text: 'Veuillez sélectionner une compétence et spécifier une valeur d\'évaluation.',
    });
    // Ajoutez ici la logique de gestion de l'erreur si les champs ne sont pas valides
  }}
}

