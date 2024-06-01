import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appouved-poste',
  templateUrl: './appouved-poste.component.html',
  styleUrls: ['./appouved-poste.component.css']
})
export class AppouvedPosteComponent implements OnInit {
  searchTerm: string = '';
  approvedPostes!: any[];
  filteredPostes!: any[];

  constructor(private posteService: PosteService, private router: Router) {}

  ngOnInit(): void {
    this.getApprovedPostes();
  }

  getApprovedPostes(): void {
    this.posteService.PosteApprouve().subscribe(
      (data) => {
        this.approvedPostes = data;
        this.filteredPostes = data; // Initialize filteredPostes
        console.log('Approved Postes:', this.approvedPostes);
      },
      (error) => {
        console.error('Error fetching approved postes:', error);
      }
    );
  }

  filterPostes(): void {
    this.filteredPostes = this.approvedPostes.filter(poste =>
      poste.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  cardStates: boolean[] = []; // Property to hold the state of each card
  showAllCompetences: boolean = false; // Property to toggle the display of all competences

  // Other existing methods...

  toggleFormVisibility(index: number): void {
    this.cardStates[index] = !this.cardStates[index];
  }

  toggleCompetences() {
    this.showAllCompetences = !this.showAllCompetences;
  }

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
            Swal.fire('Supprimé!', 'Le poste a été supprimé avec succès.', 'success');
            window.location.reload();  // Reload the window after deletion
          },
          error => {
            console.error('Erreur lors de la suppression du poste:', error);
            Swal.fire('Erreur!', 'Une erreur s\'est produite lors de la suppression du poste.', 'error');
          }
        );
      }
    });
  }

  ToEdit(postid: number) {
    this.router.navigate(['managerService/add-test', postid]);
  }

  ToPostId(postid: number) {
    this.router.navigate(['managerService/poste-approuve', postid]);
  }

  ToList() {
    this.router.navigate(['managerService/add-fiche-de-poste']);
  }
}
