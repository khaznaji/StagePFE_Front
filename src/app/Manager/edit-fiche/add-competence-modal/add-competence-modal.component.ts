import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Competence } from 'src/app/model/competence.model';
import { Poste } from 'src/app/model/poste.model';
import { CompetenceService } from 'src/app/service/competence.service';
import { PosteService } from 'src/app/service/poste.service';

@Component({
 selector: 'app-add-competence-modal',
 templateUrl: './add-competence-modal.component.html',
 styleUrls: ['./add-competence-modal.component.css']
})
export class AddCompetenceModalComponent  implements OnInit {
  @Output() competencesSelected = new EventEmitter<Competence[]>();
  newCategory: Poste = new Poste();
  allCompetences: Competence[] = []; // Vous devrez remplir cette liste avec les compétences disponibles
  selectedCompetences: Competence[] = [];
  @Input() postId!: number; // Ajoutez cette ligne pour déclarer postId comme un @Input
 
  constructor(private route: ActivatedRoute , private posteService: PosteService, private competenceService: CompetenceService , private modalService: BsModalService , private modalRef: BsModalRef) { }
 
  ngOnInit(): void {
  // Accédez à modalRef.content.postId ici, après que le composant a été initialisé
  if (this.modalRef.content) {
     this.postId = this.modalRef.content.postId;
     this.fetchPostDetails(); // Appeler cette méthode après avoir récupéré l'ID du poste

  }

  this.fetchPostDetails(); // Appeler cette méthode après avoir récupéré l'ID du poste

   
  this.getCompetences();
  
 }
 
 fetchPostDetails(): void {
  this.posteService.getPosteById(this.postId).subscribe(
    (response: any) => {
      this.newCategory = response;
      // Update the competences array with the competences associated with the post
      this.competences = this.newCategory.competences;
      // Pre-select the competences in the UI
      console.log('Compétences associées au poste :', this.newCategory.competences);

    },
    error => {
      console.error(error);
      // Handle error here
    }
  );
}

competences: Competence[] = [];

getCompetences(): void {
 
  this.competenceService.getAll().subscribe(
    (competences) => {
      this.competences = competences;
      console.log(this.competences)
    },
    (error) => {
      console.error('Error fetching competences', error);
    }
  ); 
}
selectCompetence(competence: Competence): void {
  // Vérifier si la compétence est déjà sélectionnée
  const alreadySelected = this.selectedCompetences.find(comp => comp.id === competence.id);
   
  if (!alreadySelected) {
     // Ajouter la compétence à la liste des compétences sélectionnées
     this.selectedCompetences.push(competence);
  }
 
  // Réinitialiser la barre de recherche et les résultats de recherche
  this.searchTerm = '';
  this.searchResults = [];
 }
 isAlreadyAssociated: boolean = false;

 searchCompetences(): void {
  // Réinitialiser les résultats de recherche avant chaque recherche
  this.searchResults = [];
 
  if (this.searchTerm.length >= 3) {
     // Filtrer toutes les compétences disponibles pour trouver les correspondances
     this.searchResults = this.competences.filter(competence =>
       competence.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
     );
 
     // Vérifier si la liste des résultats est vide
     if (this.searchResults.length === 0) {
       console.log("Aucune compétence trouvée.");
     }
  }
 }
 




 
searchCompetence(): void {
  if (this.searchTerm.length >= 3) {
    // Effectuez une recherche dans la liste des compétences pour trouver les correspondances
    this.searchResults = this.competences.filter(competence =>
      competence.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } else {
    this.searchResults = [];
  }
}
selectedCompetence: Competence | null = null;
showSearchBar = true; // Affiche la barre de recherche par défaut
searchTerm: string = '';
searchResults: Competence[] = [];
deleteCompetenceFromPoste(competenceId: number): void {
  this.posteService.deletePosteByCompetence(this.postId, competenceId).subscribe(
    (response: any) => {
      console.log('Competence deleted from poste:', response);
      // Mettre à jour la liste des compétences du poste après la suppression
      this.fetchPostDetails();
    },
    error => {
      console.error('Error deleting competence from poste:', error);
      // Gérer les erreurs ici
    }
  );
}
cancelSelection(competence: Competence): void {
  // Supprimer la compétence de la liste des compétences sélectionnées
  this.selectedCompetences = this.selectedCompetences.filter(comp => comp.id !== competence.id);
}

updatePoste(): void {
  const postData = new FormData();

  // Ajoutez les IDs des compétences déjà associées au poste
  this.newCategory.competences.forEach(comp => postData.append('competences', comp.id.toString()));

  // Ajoutez les IDs des nouvelles compétences sélectionnées
  const competenceIds = this.selectedCompetences.map(comp => comp.id);
  competenceIds.forEach(id => postData.append('competences', id.toString())); // Ajoutez chaque ID comme une chaîne

  // Ensuite, envoyez les données pour mettre à jour le poste
  this.posteService.updatePosteCompetence(this.postId, postData).subscribe(
    (response: any) => {
      console.log('Post updated successfully:', response);
      // Handle success here, for example, display a success message to the user
    },
    error => {
      console.error('Error updating post:', error);
      // Handle error here, for example, display an error message to the user
    }
  );
}


 
 
}



