import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import { FormationDetailComponent } from '../formation-detail/formation-detail.component';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css'],
})
export class MesDemandesComponent implements OnInit {
  mesFormations!: any[];
  filteredFormations!: any[];
  searchTerm: string = '';
  modalRef!: BsModalRef;

  constructor(
    private participationFormationService: ParticapationFormationService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getMesFormations();
  }

  getMesFormations(): void {
    this.participationFormationService
      .getMesFormations()
      .subscribe((formations) => {
        this.mesFormations = formations;
        this.filteredFormations = formations; // Initialize filtered list
      });
  }

  filterFormations(): void {
    this.filteredFormations = this.mesFormations.filter((formation) =>
      formation.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getBadgeClasses(etatParticipation: string): string {
    switch (etatParticipation) {
      case 'Accepte':
        return 'badge badge-success';
      case 'EN_ATTENTE':
        return 'badge badge-warning';
      case 'REFUSE':
        return 'badge badge-danger';
      case 'AFFECTE':
        return 'badge badge-success';
      default:
        return 'badge badge-secondary';
    }
  }

  openModalById(formationId: number): void {
    const initialState = {
      formationId: formationId,
    };
    this.modalRef = this.modalService.show(FormationDetailComponent, {
      initialState,
    });
  }
}
