import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewCandidateByIdComponent } from 'src/app/Manager/gestion-poste-by-id/view-candidate-by-id/view-candidate-by-id.component';
import { Candidature } from 'src/app/model/candidature.model';
import { PosteService } from 'src/app/service/poste.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from 'src/app/Admin/Poste/getpostebyid/full-calendar/full-calendar.component';
@Component({
  selector: 'app-getpostebyid',
  templateUrl: './getpostebyid.component.html',
  styleUrls: ['./getpostebyid.component.css']
})
export class GetpostebyidComponent implements OnInit{
  collaborateursEnAttente: number = 0;
  collaborateursAcceptees: number = 0;
  collaborateursRefusees: number = 0;
  filteredPostes: any[] = [];
  searchTerm: string = ''; 
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.postId = +params['postId']; // Convertissez la chaîne en nombre
      this.loadPosteDetails(); 
      this.getCandidatsByPoste();
      this.getCandidatures();
      this.loadCandidatureDates();

      this.posteService.countCollaborateursEnAttente(this.postId).subscribe(count => {
        this.collaborateursEnAttente = count;
      });
  
      this.posteService.countCollaborateursAcceptees(this.postId).subscribe(count => {
        this.collaborateursAcceptees = count;
      });
  
      this.posteService.countCollaborateursRefusees(this.postId).subscribe(count => {
        this.collaborateursRefusees = count;
      });
      // Fetch post details when component initializes
    });
  }
  postId!: number;
  poste: any; 

  constructor(private route: ActivatedRoute ,
    private s: Router ,  private posteService: PosteService ,public dialog: MatDialog ,  private modalService: BsModalService) {}
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
  redirectToFullCalendar(postId: number) {
    // Naviguez vers la page Full Calendar avec le 'postId' dans l'URL
    this.s.navigate(['/managerRh/fullcalendar', postId]);
  }
 
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
  //gestion candidat 
  filterCandidats(): void {
    this.filteredPostes = this.candidats.filter(poste => poste.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
}
  candidats: any[] = [];
  getCandidatsByPoste(): void {
    this.posteService.getCandidatsByPosteId(this.postId)
      .subscribe(
        candidats => {
          this.candidats = candidats;
          console.log('Candidats:', this.candidats);
          this.filterCandidats();

        },
        error => {
          console.error('Erreur lors de la récupération des candidats:', error);
        }
      );
  }
  modalRef!: BsModalRef;
  openModal(candidatId: number): void {
    const initialState = {
      candidatId: candidatId
    };
    this.modalRef = this.modalService.show(ViewCandidateByIdComponent, { initialState });
  }
  openModalFullCalendar(posteId: number): void {
    const initialState = { postId: posteId };
    this.modalRef = this.modalService.show(FullCalendarComponent, {
       initialState,
       class: 'full-calendar-modal' // Assurez-vous que cette classe est définie dans votre CSS
    });
   }
   
  openCandidatDetailModal(candidatId: number): void {
    this.posteService.getCollaborateurInfoById(candidatId).subscribe(candidat => {
      this.dialog.open(ViewCandidateByIdComponent, {
        width: '400px',
        data: candidat
      });
    });
  }
  


onDrop(event: CdkDragDrop<string[]>, newState: string) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    const candidatId = event.item.element.nativeElement.id; // Obtenez l'ID du candidat
    const posteId = /* Obtenez l'ID du poste */ this.postId;
    this.modifierEtatCandidature(candidatId, newState);
    this.getCandidatures();

    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}
calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin],
  events: [
    { title: 'Event 1', date: '2024-04-01' },
    { title: 'Event 2', date: '2024-04-02' }
  ]
};
loadCandidatureDates() {
  this.posteService.getCandidatureDates(this.postId).subscribe(dates => {
    let events = dates.map(date => ({
      title: `${date[2]} ${date[1]} - Entretien`, // Affichage du nom et du prénom du collaborateur
      start: new Date(date[0]) // Assurez-vous que la date est au format ISO (ex: '2024-04-01')
    }));
    this.calendarOptions.events = events;
  });
}


modifierEtatCandidature(collaborateurId: string, newState: string) {
  this.posteService.updateCandidatureState(collaborateurId, newState)
    .subscribe(
      (candidature: Candidature) => {
        console.log('État de la candidature mis à jour avec succès : ', candidature);
        this.getCandidatures();

        // Mettez à jour votre interface utilisateur ou effectuez d'autres actions en fonction de la réponse
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'état de la candidature : ', error);
        // Gérer les erreurs
      }
    );
}
candidatures: any[] = [];
getCandidatures(): void {
  this.posteService.getAllCandidatures(this.postId)
    .subscribe(
      candidatures => {
        this.candidatures = candidatures;
        console.log('Candidatures:', this.candidatures);
        
      },
      error => {
        console.error('Erreur lors de la récupération des candidatures:', error);
      }
    );
}
}
