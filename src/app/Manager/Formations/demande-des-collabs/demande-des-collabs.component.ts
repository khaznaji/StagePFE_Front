import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormationDetailComponent } from 'src/app/Collaborateur/Formation/formation-detail/formation-detail.component';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-des-collabs',
  templateUrl: './demande-des-collabs.component.html',
  styleUrls: ['./demande-des-collabs.component.css']
})
export class DemandeDesCollabsComponent {
  formations: any[] = [];

  constructor(private formationService: ParticapationFormationService ,  private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getMesFormationsPourManager();
  }

  getMesFormationsPourManager(): void {
    this.formationService.getFormationsPourManager()
      .subscribe((data: any[]) => {
        this.formations = data;
      });
  }
  modalRef!: BsModalRef;

  openModalById(formationId: number): void {
    const initialState = {
      formationId: formationId,
    };
    this.modalRef = this.modalService.show(FormationDetailComponent, {
      initialState,
    });
  }
  updateEtatAccepte(participationId: number): void {
    Swal.fire({
      title: 'Confirmer',
      text: 'Voulez-vous vraiment accepter cette participation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationService.updateEtatParticipationAccepte(participationId).subscribe(
          response => {
            Swal.fire('Succès', 'L\'état de participation a été mis à jour avec succès.', 'success');
            setTimeout(() => {
              window.location.reload(); // Rechargement de la page après confirmation et délai de 3 secondes
            }, 3000); // 3 secondes
          },
          error => {
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour de l\'état de participation.', 'error');
            console.error('Une erreur s\'est produite lors de la mise à jour de l\'état de participation :', error);
            // Gérez l'erreur de manière appropriée
          }
        );
      }
    });
  }
  
  // Méthode pour mettre à jour l'état de participation à "Refusee"
  updateEtatRefusee(participationId: number): void {
    Swal.fire({
      title: 'Confirmer',
      text: 'Voulez-vous vraiment refuser cette participation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationService.updateEtatParticipationRefusee(participationId).subscribe(
          response => {
            Swal.fire('Succès', 'L\'état de participation a été mis à jour avec succès.', 'success');
            setTimeout(() => {
              window.location.reload(); // Rechargement de la page après confirmation et délai de 3 secondes
            }, 3000); // 3 secondes
          },
          error => {
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour de l\'état de participation.', 'error');
            console.error('Une erreur s\'est produite lors de la mise à jour de l\'état de participation :', error);
            // Gérez l'erreur de manière appropriée
          }
        );
      }
    });
  }
  
}
