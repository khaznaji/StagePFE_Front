import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poste } from 'src/app/model/poste.model';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-display-mes-postes',
  templateUrl: './display-mes-postes.component.html',
  styleUrls: ['./display-mes-postes.component.css']
})
export class DisplayMesPostesComponent implements OnInit {
  searchTerm: string = ''; // Property to hold the search term
  approvedPostes!: Poste[]; // Ensure to import the Poste model
  filteredPostes!: Poste[];

  constructor(private posteService: PosteService, private router: Router) {}

  ngOnInit(): void {
    this.getApprovedPostes();
  }

  getApprovedPostes(): void {
    this.posteService.PosteEncoursRefuse()
      .subscribe(
        (data: Poste[]) => {
          this.approvedPostes = data;
          this.filteredPostes = data; // Initialize the filtered posts
          console.log('Approved Postes:', this.approvedPostes);
        },
        (error) => {
          console.error('Error fetching approved postes:', error);
        }
      );
  }
  showAllCompetences: boolean = false; // Property to toggle the display of all competences
  cardStates: boolean[] = []; // Property to hold the state of each card

  filterPostes(): void {
    this.filteredPostes = this.approvedPostes.filter(poste =>
      poste.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ToList(): void {
    this.router.navigate(['managerService/add-fiche-de-poste']);
  }

  toggleFormVisibility(index: number): void {
    this.cardStates[index] = !this.cardStates[index];
  }

  toggleCompetences(): void {
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
            Swal.fire(
              'Supprimé!',
              'Le poste a été supprimé avec succès.',
              'success'
            );
            window.location.reload();  // Reload the window after deletion
          },
          error => {
            console.error('Erreur lors de la suppression du poste:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du poste.',
              'error'
            );
          }
        );
      }
    });
  }

  ToEdit(postid: number): void {
    this.router.navigate(['managerService/edit-postes', postid]);
  }

  ToPostId(postid: number): void {
    this.router.navigate(['managerService/poste-encours', postid]);
  }

  modalRef!: BsModalRef;
}
