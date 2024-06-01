import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historique-des-poste',
  templateUrl: './historique-des-poste.component.html',
  styleUrls: ['./historique-des-poste.component.css']
})
export class HistoriqueDesPosteComponent implements OnInit {
  approvedPostes: any[] = [];
  filteredPostes: any[] = [];
  searchTerm: string = '';
  showAllCompetences = false;

  constructor(private posteService: PosteService, private router: Router) {}

  ngOnInit(): void {
    this.getApprovedPostes();
  }

  getApprovedPostes(): void {
    this.posteService.PosteArchive().subscribe(
      (data) => {
        this.approvedPostes = data;
        this.filteredPostes = data;
        console.log('Approved Postes:', this.approvedPostes);
      },
      (error) => {
        console.error('Error fetching approved postes:', error);
      }
    );
  }

  toggleCompetences() {
    this.showAllCompetences = !this.showAllCompetences;
  }

  onSearch() {
    this.filteredPostes = this.approvedPostes.filter(poste =>
      poste.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
            window.location.reload();
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
    this.router.navigate(['managerService/edit-postes', postid]);
  }

  ToPostId(postid: number) {
    this.router.navigate(['managerService/postearchive', postid]);
  }
}
