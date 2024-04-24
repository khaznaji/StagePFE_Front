import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import { GroupsService } from 'src/app/service/groups.service';
import { SessionFormationService } from 'src/app/service/session-formation.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  formationId!: number;
  groupId!: number;
  dateDebut!: string;
  dateFin!: string;
  constructor(
    private route: ActivatedRoute,
    private sessionFormationService: SessionFormationService,
    public dialog: MatDialog,
    private groupService: GroupsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formationId = +params['formationId'];
      // this.loadCandidatureDates();
    });
    this.loadCandidatureDates(); 
    this.getGroupesByFormation();
  }

  showModal: boolean = true;
  showModal2: boolean = false;

  eventData: any = {}; // To store event data

  calendarOptions: any = {
    initialView: 'dayGridMonth', // Commencez par afficher la vue semaine
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: (arg: any) => this.handleDateClick(arg),
    eventClick: (arg: any) => this.handleEventClick(arg),
    events: [],
    views: {
      // Définissez les vues que vous souhaitez inclure
      dayGridMonth: {
        // Vue mois
        type: 'dayGridMonth', // Utilisez le plugin dayGrid pour la vue mois
        buttonText: 'Month', // Texte du bouton pour basculer vers cette vue
      },
      timeGridWeek: {
        // Vue semaine
        type: 'timeGridWeek', // Utilisez le plugin timeGrid pour la vue semaine
        buttonText: 'Week', // Texte du bouton pour basculer vers cette vue
      },
    },
    headerToolbar: {
      // Barre d'outils d'en-tête pour afficher les boutons de navigation entre les vues
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek', // Boutons pour basculer entre la vue mois et la vue semaine
    },
  };

  loadCandidatureDates() {
    this.sessionFormationService.getAllSessionsByFormation(this.formationId).subscribe((entretiens) => {
      console.log('Candidature dates loaded successfully:', entretiens);
  
      let events = entretiens.map((entretien, index) => {
        // Convertir les dates de début et de fin en objets Date
        const startDate = new Date(entretien.dateDebut);
        const endDate = new Date(entretien.dateFin);
  
        // Définir la couleur en fonction de la date de début
        const isPast = startDate < new Date();
        const color = isPast ? '#E74C3C' : '#2ECC71';
        const borderColor = isPast ? '#E74C3C' : '#2ECC71';
        
        return {
          title: `${entretien.group.nom}`,
          start: startDate,
          end: endDate,
          backgroundColor: color, // Couleur de fond de l'événement
          borderColor: borderColor, // Couleur de bordure de l'événement
          textColor: 'white', // Couleur du texte de l'événement
          displayEventTime: true, // Afficher l'heure de début et de fin de l'événement
          className: index === 0 ? 'highlighted-event' : '', 
          id: entretien.id, // Ajoutez l'ID de l'entretien comme identifiant d'événement
          // Ajoutez une classe CSS si nécessaire
        };
      });
      this.calendarOptions.events = events;
    });
  }
  
  
  

  // Déclarer une variable pour suivre si la date est antérieure à aujourd'hui
isPastDate: boolean = false;

handleDateClick(arg: any) {
  const clickedDate = new Date(arg.dateStr);
  const today = new Date(); // Obtenez la date actuelle

  // Vérifiez si la date cliquée est antérieure à aujourd'hui
  if (clickedDate < today) {
    // Si la date est antérieure à aujourd'hui, configurez la variable isPastDate sur true
    this.isPastDate = true;
    console.log("Vous ne pouvez pas sélectionner une date antérieure à aujourd'hui.");
    return; // Quittez la fonction sans effectuer d'autres actions
  } else {
    // Si la date n'est pas antérieure à aujourd'hui, configurez isPastDate sur false
    this.isPastDate = false;
  }

  // Si la date est valide, continuez avec votre logique actuelle
  this.showModal = true;
  
  // this.eventData.start = arg.dateStr;
  // this.eventData.end = arg.dateStr;
  // this.eventData.date = arg.dateStr;
}

  
  entretienDetails: any | undefined; // Définissez la propriété entretienDetails de type Entretien | undefined
  closeModal() {
    this.showModal2 = false;
  }
  handleEventClick(eventClickInfo: any) {
    const eventId = eventClickInfo.event.id; // Récupérez l'identifiant de l'événement FullCalendar
    this.sessionFormationService.getSessionById(eventId).subscribe(
      (entretien) => {
        this.entretienDetails = entretien;
        this.showModal2 = true;
        this.showModal = false;

        console.log(
          "// Afficher le second modal avec les détails de l'entretien"
        );
      },
      (error) => {
        console.error('Error loading entretien details:', error);
        // Gérer l'erreur
      }
    );
  }
  deleteEntretien(id: number): void {
    // Afficher une fenêtre modale de confirmation Swal avant de supprimer l'événement
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas récupérer cette session!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme la suppression, effectuez la requête de suppression
        this.sessionFormationService.deleteSession(id).subscribe(
          () => {
            console.log('Session supprimée avec succès.');
  
            // Afficher une fenêtre modale Swal pour indiquer que l'événement a été supprimé avec succès
            Swal.fire({
              icon: 'success',
              title: 'Session supprimée avec succès!',
              showConfirmButton: false,
              timer: 3000 // Affichez la fenêtre modale pendant 3 secondes
            }).then(() => {
              // Rechargez la page après 3 secondes
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            });
  
            // Vous pouvez également effectuer d'autres actions ici, si nécessaire
          },
          (error) => {
            console.error("Erreur lors de la suppression de l'entretien :", error);
  
            // Gérer l'erreur ici, afficher un message d'erreur à l'utilisateur, etc.
          }
        );
      }
    });
  }
  
  editMode: boolean = false; // Variable pour suivre l'état de l'affichage du formulaire de modification

  updateEntretien(id: number): void {
    this.editMode = true;
  
    const updatedGroupId = this.groupId;
    const updatedDateDebut = this.dateDebut;
    const updatedDateFin = this.dateFin;
  
    this.sessionFormationService.updateSession(id, updatedGroupId, updatedDateDebut, updatedDateFin)
      .subscribe(
        (response) => {
          console.log(response);
  
          // Affichez une fenêtre modale Swal pour indiquer que l'événement a été mis à jour avec succès
          Swal.fire({
            icon: 'success',
            title: 'Session mis à jour avec succès!',
            showConfirmButton: false,
            timer: 3000 // Affichez la fenêtre modale pendant 3 secondes
          }).then(() => {
            // Rechargez la page après 3 secondes
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });
  
          // Vous pouvez également effectuer d'autres actions ici, comme rediriger l'utilisateur vers une autre page
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de la session de formation :", error);
  
          // Gérer l'erreur ici, afficher un message d'erreur à l'utilisateur, etc.
        }
      );
  }
  
  
  submitUpdatedEntretien(id : number): void {
    this.sessionFormationService
      .updateSession(
id ,        this.groupId,
        this.dateDebut,
        this.dateFin,
      )
      .subscribe(
        (response) => {
          console.log(response); // Afficher la réponse du serveur après la mise à jour de l'entretien
          // Réinitialiser le mode d'édition et recharger les données si nécessaire
          this.editMode = false;
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'entretien:", error);
          // Gérer l'erreur, afficher un message à l'utilisateur, etc.
        }
      );
  }
  candidats: any[] = [];

  getGroupesByFormation(): void {
    this.groupService.getGroupesByFormation(this.formationId)
      .subscribe(
        candidats => {
          this.candidats = candidats;
          console.log('Candidats:', this.candidats);

        },
        error => {
          console.error('Erreur lors de la récupération des candidats:', error);
        }
      );
  }
  addEvent() {
    const newEvent: EventInput = {
      title: this.candidats.find(candidat => candidat.id === this.groupId)?.nom || '', // Titre de l'événement
      start: this.dateDebut, // Date de début de l'événement
      end: this.dateFin, // Date de fin de l'événement
    };

    this.createEntretien(
      this.groupId,
      this.dateDebut,
      this.dateFin
    );

    // Affichez une fenêtre modale SweetAlert pour indiquer que l'événement a été ajouté avec succès
    Swal.fire({
      icon: 'success',
      title: 'Session ajoutée avec succès!',
      showConfirmButton: false,
      timer: 3000 // Affichez la fenêtre modale pendant 3 secondes
    }).then(() => {
      // Rechargez la page après 3 secondes
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });

  }

  cancelAddEvent() {
    this.resetEventData();
    this.showModal = false;
  }

  resetEventData() {
    this.eventData = {};
  }

  // Method to handle event creation dynamically based on user interaction
  createEntretien(
    groupId: number,
    dateDebut: string,
    dateFin: string,
  ): void {
    // Call the createEntretien method from the PosteService to create the Entretien
    this.sessionFormationService
      .createSession(
        this.formationId , 
        groupId,
        dateDebut,
        dateFin,
      )
      .subscribe(
        (response) => {
          console.log('Entretien created successfully:', response);
          // Handle success response
        },
        (error) => {
          console.error('Error creating entretien:', error);
          // Handle error response
        }
      );
  }

  onSubmit(): void {
    this.createEntretien(
      this.groupId,
      this.dateDebut,
      this.dateFin,
    );
  }

  handleDayClick(date: Date, jsEvent: MouseEvent) {
    // Your event handling logic here
    console.log('Clicked on day:', date.toLocaleString());
    // Optionally, open a modal, navigate to another view, etc.
  }
}
