import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poste } from 'src/app/model/poste.model';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-mes-postes',
  templateUrl: './display-mes-postes.component.html',
  styleUrls: ['./display-mes-postes.component.css']
})
export class DisplayMesPostesComponent implements OnInit{
  ngOnInit(): void {
    this.getApprovedPostes();

  }

  approvedPostes!: any[];
  constructor(private posteService: PosteService , private router: Router){}
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
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
    this.posteService.mespostes()
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
  this.router.navigate(['managerService/poste', postid]);
 }

}
