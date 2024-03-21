import { Component, OnInit } from '@angular/core';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { CollaborateurService } from 'src/app/service/collaborateur.service';

@Component({
  selector: 'app-bio-pop-up',
  templateUrl: './bio-pop-up.component.html',
  styleUrls: ['./bio-pop-up.component.css']
})
export class BioPopUpComponent implements OnInit {
  constructor(private collaborateurService: CollaborateurService ) { }

  ngOnInit(): void {
    this.getCollaborateurInfo();

  }
  bio!: string;
  collaborateurInfo: any;

  project: Collaborateur = new Collaborateur();
  getCollaborateurInfo(): void {
    this.collaborateurService.getCollaborateurInfo()
      .subscribe((data: any) => {
        this.collaborateurInfo = data;
        this.project.bio = this.collaborateurInfo.bio; // Ajustez cette ligne selon la structure de vos données

      });
  }
  updateProfile() {
    // Assurez-vous que les évaluations sont correctement associées aux compétences sélectionnées
  
  
    // Créez un FormData et ajoutez les données pertinentes
    const formData = new FormData();
    formData.append('bio', this.project.bio);
    // Appelez le service pour mettre à jour le profil
    this.collaborateurService.updateProfile(formData)
      .subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          // Mettez à jour les compétences dans votre modèle Angular si elles sont renvoyées par le backend
       

        },
        error => {
          console.error('Failed to update profile:', error);
          // Ajoutez ici la logique pour gérer les erreurs
        }
      );
  }
  showPopup = true; // Ajoutez cette propriété pour contrôler l'affichage du pop-up

  closePopup(event: MouseEvent): void {
    // Vérifiez si le clic a été effectué en dehors du pop-up
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.showPopup = false;
    }
 }
}
