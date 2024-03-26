import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/model/candidature.model';
import { EtatPostulation } from 'src/app/model/etatpostulation.model';
import { Poste } from 'src/app/model/poste.model';
import { PosteService } from 'src/app/service/poste.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

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
export class MespostulationsComponent implements OnInit{
  postulations: Candidature[] = [];
  constructor(private posteService : PosteService) { }
  formatEtat(etat: string): string {
    if (!etat) return ''; // Vérifier si l'état est défini
  
    // Convertir la première lettre en majuscule et le reste en minuscules
    return etat.charAt(0).toUpperCase() + etat.slice(1).toLowerCase();
  }
  
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
 

  cardStates: boolean[] = []; // Tableau pour stocker l'état de chaque carte

  ngOnInit(): void {
    this.getPostulations();
    this.postulations.forEach(() => this.cardStates.push(false));

  }
  showAllCompetences = false; 

  toggleCompetences() {
    this.showAllCompetences = !this.showAllCompetences;
 }
  isFormVisible: boolean = false;
  selectedPosteId: number | null = null; // Track the selected poste ID

  togglePosteDetails(posteId: number): void {
    // If the selectedPosteId is the same as the posteId passed to the method, close the details panel
    if (this.selectedPosteId === posteId) {
       this.closeDetailsPanel();
    } else {
       // Otherwise, load the details for the new posteId
       this.selectedPosteId = posteId;
       this.loadSelectedPosteDetails(posteId);
    }
   }
   
   loadSelectedPosteDetails(posteId: number): void {
    // Assuming the PosteService has a method to get a Poste by its ID
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
   
  

  toggleFormVisibility(index: number): void {
    // Inversion de l'état de la carte à l'index spécifié
    this.cardStates[index] = !this.cardStates[index];
  }
 
  getPostulations() {
    this.posteService.getMesPostulations()
      .subscribe(
        (data: Candidature[]) => {
          this.postulations = data;
          console.log('Postulations récupérées:', this.postulations);

        },
        error => {
          console.error('Une erreur s\'est produite:', error);
        }
      );
  }
  // Poste 
  selectedPoste: Poste | null = null; // Track the selected poste for details

  isDetailsPanelOpen = false;
  closeDetailsPanel() {
    this.selectedPosteId = null;
  }
  postId!: number;
  poste: any; 
  private loadPosteDetails() {
    this.posteService.getPosteById(this.postId).subscribe(
      data => {
        this.poste = data;
        console.log('Poste details:', this.poste);
      },
      error => {
        console.error('Error loading poste details:', error);
      }
    );
  }

  

  private updateTableResponsiveClass() {
    const tableResponsive = document.querySelector('.table-responsive');
    if (tableResponsive) {
      tableResponsive.classList.toggle('details-panel-open', this.isDetailsPanelOpen);
    }
  }
}
