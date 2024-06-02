import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/model/candidature.model';
import { PosteService } from 'src/app/service/poste.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Poste } from 'src/app/model/poste.model';

@Component({
  selector: 'app-mespostulations',
  templateUrl: './mespostulations.component.html',
  styleUrls: ['./mespostulations.component.css'],
  animations: [
    trigger('panelAnimation', [
      state('void', style({
        transform: 'translateX(-100%)'
      })),
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class MespostulationsComponent implements OnInit {
  postulations: Candidature[] = [];
  filteredPostulations: Candidature[] = [];
  searchTerm: string = '';
  selectedPosteId: number | null = null;
  selectedPoste: any = null;

  constructor(private posteService: PosteService) { }

  ngOnInit(): void {
    this.getPostulations();
  }

  getPostulations() {
    this.posteService.getMesPostulations()
      .subscribe(
        (data: Candidature[]) => {
          this.postulations = data;
          this.filteredPostulations = data; // Initialize filtered list
          console.log('Postulations récupérées:', this.postulations);
        },
        error => {
          console.error('Une erreur s\'est produite:', error);
        }
      );
  }

  filterPostulations(): void {
    this.filteredPostulations = this.postulations.filter(poste =>
      poste.poste.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  togglePosteDetails(posteId: number): void {
    if (this.selectedPosteId === posteId) {
      this.closeDetailsPanel();
    } else {
      this.selectedPosteId = posteId;
      this.loadSelectedPosteDetails(posteId);
    }
  }

  loadSelectedPosteDetails(posteId: number): void {
    this.posteService.getPosteById(posteId).subscribe(
      data => {
        this.selectedPoste = data;
        console.log('Selected Poste details:', this.selectedPoste);
      },
      error => {
        console.error('Error loading selected Poste details:', error);
      }
    );
  }

  closeDetailsPanel() {
    this.selectedPosteId = null;
  }

  formatEtat(etat: string): string {
    if (!etat) return ''; // Vérifier si l'état est défini

    // Convertir la première lettre en majuscule et le reste en minuscules
    return etat.charAt(0).toUpperCase() + etat.slice(1).toLowerCase();
  }
  showDetails(poste: Poste) {
    this.selectedPoste = poste;
  }
    isDetailsPanelOpen = false; // Variable to track the details panel state

 
  toggleDetailsPanel(poste: Poste) {
    if (this.selectedPoste === poste) {
      this.closeDetailsPanel();
    } else {
      this.showDetails(poste);
    }
    this.updateTableResponsiveClass();
  }
  private updateTableResponsiveClass() {
    const tableResponsive = document.querySelector('.table-responsive');
    if (tableResponsive) {
      tableResponsive.classList.toggle('details-panel-open', this.isDetailsPanelOpen);
    }
  }
}
