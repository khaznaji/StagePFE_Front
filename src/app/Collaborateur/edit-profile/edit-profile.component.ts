import { Component, OnInit } from '@angular/core';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Competence } from 'src/app/model/competence.model';
import { CollaborateurService } from 'src/app/service/collaborateur.service';
import { CompetenceService } from 'src/app/service/competence.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  bio!: string;
  competences: Competence[] = [];
  resume!: File;
  project: Collaborateur = new Collaborateur();

  constructor(private collaborateurService: CollaborateurService, private competenceService: CompetenceService) { }
  
  ngOnInit(): void {
    this.getCollaborateurInfo();

    this.competenceService.getAll().subscribe(
      (competences) => {
        this.project.competences = competences;
      },
      (error) => {
        console.error('Error fetching competences', error);
      }
    );  
  }
  collaborateurInfo: any;

  getCollaborateurInfo(): void {
    this.collaborateurService.getCollaborateurInfo()
      .subscribe((data: any) => {
        this.collaborateurInfo = data;
      });
  }
  onFileSelected(event: any) {
    this.resume = event.target.files[0] as File;
  }
  evaluations: { [key: number]: number } = {}; // Modifiez cette ligne pour utiliser un objet

  toggleCompetenceSelection(competence: Competence) {
    if (this.competences.includes(competence)) {
      this.competences = this.competences.filter(c => c !== competence);
      // Supprimez l'évaluation associée à cette compétence
      delete this.evaluations[competence.id];
    } else {
      this.competences.push(competence);
      // Ajoutez une évaluation par défaut pour cette compétence
      this.evaluations[competence.id] = 0; // Utilisez 0 comme valeur par défaut
    }
}
  updateProfile() {
    // Assurez-vous que les évaluations sont correctement associées aux compétences sélectionnées
  
  
    // Créez un FormData et ajoutez les données pertinentes
    const formData = new FormData();
    formData.append('bio', this.project.bio);
  
    this.competences.forEach(competence => {
      // Ajoutez l'ID de la compétence
      formData.append('competences', competence.id.toString());
      // Ajoutez l'évaluation associée
      formData.append('evaluations', this.evaluations[competence.id].toString());
    });
  // Itérez sur les compétences sélectionnées
  
    // Ajoutez le fichier de CV, s'il est sélectionné
    if (this.resume) {
      formData.append('resume', this.resume);
    }
  
    // Appelez le service pour mettre à jour le profil
    this.collaborateurService.updateProfile(formData)
      .subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          // Mettez à jour les compétences dans votre modèle Angular si elles sont renvoyées par le backend
          if (response && response.competences) {
            // Réinitialisez les compétences locales avec les compétences mises à jour depuis le backend
            this.competences = response.competences;
          }
          // Mettez à jour les évaluations dans votre modèle Angular si elles sont renvoyées par le backend
          if (response && response.evaluations) {
            // Réinitialisez les évaluations locales avec les évaluations mises à jour depuis le backend
            this.evaluations = response.evaluations;
          }
          console.log('comp', this.competences);

        },
        error => {
          console.error('Failed to update profile:', error);
          // Ajoutez ici la logique pour gérer les erreurs
        }
      );
  }
  
  
}
