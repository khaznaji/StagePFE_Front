import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtatPoste } from 'src/app/model/etatposte.model';
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

  showAllCompetences = false; 
  archive: boolean = false;
  encours: boolean = false;
  approuveParManagerRH: boolean = false;
  events:any;
  filteredEvents: any[] = [];

  applyFilter() {
    this.filteredEvents = [...this.postes];
    switch (this.filterOption) {
        case 'Nouvelle Demandes':
            // Filtrer les postes qui ne sont pas traités (par exemple, ceux qui ne sont pas 'Accepte' ou 'Archive')
            this.filteredEvents = this.filteredEvents.filter(poste => poste.poste !== EtatPoste.Accepte && poste.etatPoste !== EtatPoste.Archive);
            break;
        case 'Demandes Rejetées':
            this.filteredEvents = this.filteredEvents.filter(poste => poste.poste === EtatPoste.Rejete);
            break;
        case 'Demandes Acceptées':
            this.filteredEvents = this.filteredEvents.filter(poste => poste.poste === EtatPoste.Accepte);
            break;
          
        default:
            break;
    }
}
  
  toggleCompetences() {
     this.showAllCompetences = !this.showAllCompetences;
  }
  
  onAccept(id: any) : void {
    this.posteService.updateApproval(id).subscribe(
      response => {
        console.log('Poste approved successfully', response);
        Swal.fire({
          title: 'Succès!',
          text: 'Le poste a été approuvé avec succès. Un mail a été envoyé au ManagerService.',
          icon: 'success',
          confirmButtonText: 'OK'
        });   
        setTimeout(() => {
          window.location.reload();  
        }, 3000);  
          },
      error => {
        console.error('Error approving poste', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de l\'approbation du poste.',
          icon: 'error',
          confirmButtonText: 'OK'
        });    
        }
    ); 
    }

    filterOption: string = 'all'; 

    onRefuse(id: any) : void {
      this.posteService.updateRefus(id).subscribe(
        response => {
          console.log('Poste approved successfully', response);
          Swal.fire({
            title: 'Refus!',
            text: 'Le poste a été refusé. Un mail a été envoyé au ManagerService.',
            icon: 'success',
            confirmButtonText: 'OK'
          });  
          window.location.reload();  // Recharge la fenêtre après la suppression
        },
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
    this.posteService.getDemandesEnCours().subscribe(
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
  }  
  selectedPoste: Poste | null = null; // Track the selected poste for details

  isDetailsPanelOpen = false; // Variable to track the details panel state

  showDetails(poste: Poste) {
    this.selectedPoste = poste;
  }
  
  closeDetailsPanel() {
    this.selectedPoste = null;
  }

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
            // Ajoutez ici la logique supplémentaire si nécessaire
            this.closeDetailsPanel(); 
            window.location.reload();  // Recharge la fenêtre après la suppression
            // Ferme le panneau après la suppression
          },
          error => {
            console.error('Erreur lors de la suppression du poste:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du poste.',
              'error'
            );
            // Gérez les erreurs ici
          }
        );
      }
    });
  }
}
