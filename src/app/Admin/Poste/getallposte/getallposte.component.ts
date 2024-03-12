import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poste } from 'src/app/model/poste.model';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getallposte',
  templateUrl: './getallposte.component.html',
  styleUrls: ['./getallposte.component.css'],
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
export class GetallposteComponent implements OnInit {
  postes: Poste[] = [];
  postId!: number;
  poste: any; 
  constructor(private route: ActivatedRoute , private posteService: PosteService , private elRef: ElementRef) {}
  showAllCompetences = false; // Property to track if all competencies should be displayed
  archive: boolean = false;
  encours: boolean = false;
  approuveParManagerRH: boolean = false;
  events:any;
  filteredEvents: any[] = [];

  applyFilter() {
    // Copy the main list to avoid modifying it directly
    this.filteredEvents = [...this.postes];
  
    // Apply filter based on the selected option
    switch (this.filterOption) {
      case 'NonTraite':
        this.filteredEvents = this.filteredEvents.filter((poste: { encours: boolean }) => !poste.encours);
        break;
      case 'Archive':
        this.filteredEvents = this.filteredEvents.filter((poste: { archive: boolean }) => poste.archive);
        break;
      case 'Accepter':
        this.filteredEvents = this.filteredEvents.filter((poste: { approuveParManagerRH: boolean }) => poste.approuveParManagerRH);
        break;
      default:
        // If "All" option is selected, reset the list
        break;
    }
  }
  
  // Existing methods
  toggleCompetences() {
     this.showAllCompetences = !this.showAllCompetences;
  }
  onAccept(id: any) : void {
    // Logic for accepting the poste
    this.posteService.updateApproval(id).subscribe(
      response => {
        console.log('Poste approved successfully', response);
        Swal.fire({
          title: 'Succès!',
          text: 'Le poste a été approuvé avec succès. Un mail a été envoyé au ManagerService.',
          icon: 'success',
          confirmButtonText: 'OK'
        });      },
      error => {
        console.error('Error approving poste', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de l\'approbation du poste.',
          icon: 'error',
          confirmButtonText: 'OK'
        });      }
    );   }
    filterOption: string = 'all'; // Option de filtre par défaut

  
    onRefuse(id: any) : void {
      // Logic for accepting the poste
      this.posteService.updateRefus(id).subscribe(
        response => {
          console.log('Poste approved successfully', response);
          Swal.fire({
            title: 'Refus!',
            text: 'Le poste a été refusé. Un mail a été envoyé au ManagerService.',
            icon: 'success',
            confirmButtonText: 'OK'
          });      },
        error => {
          console.error('Error approving poste', error);
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur s\'est produite .',
            icon: 'error',
            confirmButtonText: 'OK'
          });      }
      );   }
  ngOnInit(): void {
    this.filteredEvents = [...this.postes];
this.applyFilter();

    this.posteService.getAllPostes().subscribe(
      (data) => {
        this.postes = data;
        this.applyFilter();
        this.filterOption = 'all';  // Set the default filter option
        // Appliquez le filtre après avoir chargé les postes
        console.log('Received Postes:', this.postes);
      },
      (error) => {
        console.error('Error fetching Postes:', error);
      }
    );
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadPosteDetails();
    });
  }  selectedPoste: Poste | null = null; // Track the selected poste for details

  isDetailsPanelOpen = false; // Variable to track the details panel state


  showDetails(poste: Poste) {
    this.selectedPoste = poste;
  }

  closeDetailsPanel() {
    this.selectedPoste = null;
  }

  toggleDetailsPanel(poste: Poste) {
    if (this.selectedPoste === poste) {
      // If the same button is clicked again, close the panel
      this.closeDetailsPanel();
    } else {
      // Show the details panel for the selected poste
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
  handleImageError() {
    console.error('Error loading image:', 'assets/images/' + this.selectedPoste?.managerService.image);
  }
  
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
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
}
