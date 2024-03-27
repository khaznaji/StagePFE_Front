import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appouved-poste',
  templateUrl: './appouved-poste.component.html',
  styleUrls: ['./appouved-poste.component.css']
})
export class AppouvedPosteComponent implements OnInit{
  ngOnInit(): void {
    this.getApprovedPostes();

  }

  approvedPostes!: any[];
  constructor(private posteService: PosteService , private router: Router){}
  
  cardStates: boolean[] = []; 
  approuveParManagerRH: boolean = false;
  archive: boolean = false;
  encours: boolean = false;// Tableau pour stocker l'état de chaque carte
  ToList()
  {
    this.router.navigate(['managerService/add-fiche-de-poste']);

  }


  showAllCompetences = false; 

  toggleFormVisibility(index: number): void {
    // Inversion de l'état de la carte à l'index spécifié
    this.cardStates[index] = !this.cardStates[index];
  }
  toggleCompetences() {
    this.showAllCompetences = !this.showAllCompetences;
 }
 
  getApprovedPostes(): void {
    this.posteService.PosteApprouve()
      .subscribe(
        (data) => {
          this.approvedPostes = data;
                    console.log('Approved Postes:', this.approvedPostes);
        },
        (error) => {
          console.error('Error fetching approved postes:', error);
        }
      );
  }
  selectedFilter: string = '';
 
  onDelete(postId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'La suppression du poste est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.posteService.deletePoste(postId).subscribe(
          response => {
            console.log('Poste supprimé avec succès:', response);
            Swal.fire(
              'Supprimé!',
              'Le poste a été supprimé avec succès.',
              'success'
            );
            // Ajoutez ici la logique supplémentaire si nécessaire
            window.location.reload();  // Recharge la fenêtre après la suppression
            // Ferme le panneau après la suppression
          },
          error => {
            console.error('Erreur lors de la suppression du poste:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du poste.',
              'error'
            );
            // Gérez les erreurs ici
          }
        );
      }
    });
  }
 ToEdit(postid :number  ){
  this.router.navigate(['managerService/edit-postes', postid]);
 }
 ToPostId(postid :number  ){
  this.router.navigate(['managerService/poste-approuve', postid]);
 }

}
