import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from 'src/app/model/competence.model';
import { Poste } from 'src/app/model/poste.model';
import { CompetenceService } from 'src/app/service/competence.service';
import { PosteService } from 'src/app/service/poste.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { AddCompetenceModalComponent } from './add-competence-modal/add-competence-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-fiche',
  templateUrl: './edit-fiche.component.html',
  styleUrls: ['./edit-fiche.component.css']
})
export class EditFicheComponent implements OnInit {
  titre!: string;
  description!: string;
  nombrePostesDisponibles!: number;
  competences!: any[];
  poste! : Poste[];
  postId!: number;
  newCategory: Poste = new Poste();
  constructor(private route: ActivatedRoute ,  private router: Router ,  private posteService: PosteService, private competenceService: CompetenceService , private modalService: BsModalService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['postId']; // Convertissez la chaîne en nombre
      this.fetchPostDetails(); // Fetch post details when component initializes
    });
 
  }


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
 
   
   modalRef!: BsModalRef;
   openModal() {
    const initialState = {
       postId: this.postId
    };
    this.modalRef = this.modalService.show(AddCompetenceModalComponent, { initialState });
   }
   
   
   
  fetchPostDetails(): void {
    this.posteService.getPosteById(this.postId).subscribe(
      (response: any) => {
        this.newCategory = response; 
        this.titre = this.newCategory.titre;
        this.description = this.newCategory.description;
        this.nombrePostesDisponibles = this.newCategory.nombrePostesDisponibles;
     },
      error => {
        console.error(error);
        // Handle error here
      }
    );
  }



  


  updatePoste(): void {
      // Fusionner les compétences sélectionnées avec les anciennes
      // (Assurez-vous que cette partie est correctement implémentée)
  
      const postData = new FormData();
      postData.append('titre', this.titre);
      postData.append('description', this.description);
      postData.append('nombrePostesDisponibles', this.nombrePostesDisponibles.toString());
      // Convertir les compétences en une chaîne de caractères séparée par des virgules pour l'envoi
      // (Assurez-vous que cette partie est correctement implémentée)
  
      this.posteService.editPoste(this.postId, postData).subscribe(
         (response: any) => {
           console.log('Post updated successfully:', response);
           // Utiliser SweetAlert2 pour afficher un message de succès
           Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Le poste a été mis à jour avec succès.',
            confirmButtonText: 'OK'
          }).then(() => {
            // Rediriger l'utilisateur après 3 secondes
            setTimeout(() => {
              this.router.navigate(['/managerService/mes-postes']);
            }, 3000);
          });
          // Handle success here, for example, redirect the user or refresh the page
        },
         error => {
           console.error('Error updating post:', error);
           // Utiliser SweetAlert2 pour afficher un message d'erreur
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Quelque chose s\'est mal passé!',
             confirmButtonText: 'OK'
           });
           // Handle error here, for example, display an error message to the user
         }
      );
  }
  
 
   
   
   
}