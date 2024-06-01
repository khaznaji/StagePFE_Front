import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-demande-publie',
  templateUrl: './display-demande-publie.component.html',
  styleUrls: ['./display-demande-publie.component.css']
})
export class DisplayDemandePublieComponent implements OnInit {
  approvedPostes: any[] = [];
  filteredPostes: any[] = [];
  searchTerm: string = '';
  showAllCompetences: boolean = false;
  cardStates: boolean[] = []; 

  constructor(private posteService: PosteService, private router: Router) {}

  ngOnInit(): void {
    this.getApprovedPostes();
  }

  getApprovedPostes(): void {
    this.posteService.getPostePulie().subscribe(
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

  filterPostes(): void {
    if (this.searchTerm) {
      this.filteredPostes = this.approvedPostes.filter(poste =>
        poste.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPostes = this.approvedPostes;
    }
  }

  toggleCompetences(): void {
    this.showAllCompetences = !this.showAllCompetences;
  }

  ToPostId(postid: number): void {
    this.router.navigate(['managerService/poste', postid]);
  }

  archivePoste(postId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment archiver ce poste?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, archiver',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.posteService.ArchiverPoste(postId).subscribe(
          () => {
            Swal.fire(
              'Archivé!',
              'Le poste a été archivé avec succès.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.error('Erreur lors de l\'archivage du poste:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de l\'archivage du poste.',
              'error'
            );
          }
        );
      }
    });
  }
}
