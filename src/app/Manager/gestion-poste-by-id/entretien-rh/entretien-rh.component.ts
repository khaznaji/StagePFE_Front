import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EntretienService } from 'src/app/service/entretien.service';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entretien-rh',
  templateUrl: './entretien-rh.component.html',
  styleUrls: ['./entretien-rh.component.css'],
})
export class EntretienRhComponent {
  constructor(
    private posteService: PosteService,
    private modalRef: BsModalRef
  ) {}
  p: number = 1; // Current page
  itemsPerPage: number = 5; // Number of items per page
  pages: number[] = []; // Array to store page numbers
  totalPages: number = 0;
  @Input() postId!: number;
  filteredPostes: any[] = [];
  entretien: any[] = [];
  searchTerm: string = '';
  candidats: any[] = [];
  ngOnInit(): void {
    if (this.modalRef.content) {
      this.postId = this.modalRef.content.postId;
    }
    this.EntretiensSpecifiques();
  }
  filterCandidats(): void {
    this.filteredPostes = this.candidats.filter((poste) =>
      poste.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  EntretiensSpecifiques(): void {
    this.posteService.CandidatsVersEntretienRh(this.postId).subscribe(
      (entretien) => {
        this.candidats = entretien; // Mettre à jour candidats au lieu d'entretien
        console.log('entretien:', this.entretien);
        this.filterCandidats();
        // Utiliser setTimeout pour retarder l'appel de createBarChart()
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des candidatures:',
          error
        );
      }
    );
  }

  updateCandidaturesEtatToEnAttente(): void {
    // Afficher la boîte de dialogue de confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment choisir les candidats selectionnés ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // L'utilisateur a confirmé, appeler la méthode pour mettre à jour les candidatures
        const candidatureIds = this.filteredPostes
          .filter((candidat) => candidat.selected)
          .map((candidat) => candidat.candidature_id);

        // Appeler le service pour mettre à jour l'état des candidatures
        this.posteService
          .updateCandidaturesEtatToEnAttente(candidatureIds)
          .subscribe(
            () => {
              console.log('Les candidatures ont été mises à jour avec succès.');
              // Mettre à jour les candidats dans le composant après la mise à jour
              this.EntretiensSpecifiques();
              // Afficher un message de succès
              Swal.fire('Succès!', 'Les candidatures ont été mises à jour avec succès.', 'success')
                .then(() => {
                  // Recharger la page après la mise à jour des candidatures
                  window.location.reload();
                });
            },
            (error) => {
              console.error('Erreur lors de la mise à jour des candidatures :', error);
              // Afficher un message d'erreur
              Swal.fire('Erreur!', 'Une erreur s\'est produite lors de la mise à jour des candidatures.', 'error');
            }
          );
      }
    });
  }

}
