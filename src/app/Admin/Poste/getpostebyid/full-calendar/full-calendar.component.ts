import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PosteService } from 'src/app/service/poste.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';

import { EntretienService } from 'src/app/service/entretien.service';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Entretien } from 'src/app/model/entretien.model';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css'],
})
export class FullCalendarComponent implements OnInit {
  postId!: number;
  id!: number;
  candidatureId!: number;
  dateEntretien!: string;
  heureDebut!: string;
  heureFin!: string;
  constructor(
    private route: ActivatedRoute,
    private entretienService: EntretienService,
    public dialog: MatDialog,
    private posteService: PosteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['postId'];
      this.loadCandidatureDates();
    });
    this.loadCandidatureDates(); 
    this.getCandidatsByPoste();
  }

  showModal: boolean = false;
  showModal2: boolean = false;

  eventData: any = {}; // To store event data

  calendarOptions: any = {
    weekends: false, // initial value
    initialView: 'timeGridWeek', // Commencez par afficher la vue semaine
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
    this.entretienService
      .getEntretiensByPosteId(this.postId)
      .subscribe((entretiens) => {
        console.log('Candidature dates loaded successfully:', entretiens);

        let events = entretiens.map((entretien, index) => ({
          title: `${entretien.prenomCollaborateur} ${entretien.nomCollaborateur}`,
          start: new Date(
            `${entretien.entretien.dateEntretien}T${entretien.entretien.heureDebut}`
          ),
          end: new Date(
            `${entretien.entretien.dateEntretien}T${entretien.entretien.heureFin}`
          ),
          className: index === 0 ? 'highlighted-event' : '',
          id: entretien.entretien.id, // Ajoutez l'ID de l'entretien comme identifiant d'événement
        }));
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
  this.eventData.start = arg.dateStr;
  this.eventData.end = arg.dateStr;
  this.eventData.date = arg.dateStr;
}

  
  entretienDetails: any | undefined; // Définissez la propriété entretienDetails de type Entretien | undefined
  closeModal() {
    this.showModal2 = false;
  }
  handleEventClick(eventClickInfo: any) {
    const eventId = eventClickInfo.event.id; // Récupérez l'identifiant de l'événement FullCalendar
    this.entretienService.getEntretienById(eventId).subscribe(
      (entretien) => {
        this.entretienDetails = entretien;
        this.showModal2 = true;
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
    this.entretienService.deleteEntretien(id).subscribe(
      () => {
        console.log('Entretien supprimé avec succès.');
        // Ajoutez ici toute logique supplémentaire après la suppression réussie
      },
      (error) => {
        console.error("Erreur lors de la suppression de l'entretien :", error);
        // Gérer l'erreur ici
      }
    );
  }
  editMode: boolean = false; // Variable pour suivre l'état de l'affichage du formulaire de modification

  updateEntretien(id: number): void {
    this.editMode = true; // Activer le mode d'édition

    this.entretienService
      .updateEntretien(
        id,
        this.candidatureId,
        this.dateEntretien,
        this.heureDebut,
        this.heureFin
      )
      .subscribe(
        (response) => {
          console.log(response); // Afficher la réponse du serveur après la mise à jour de l'entretien
          // Vous pouvez également rediriger l'utilisateur vers une autre page ou effectuer d'autres actions ici
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'entretien:", error);
          // Gérer l'erreur, afficher un message à l'utilisateur, etc.
        }
      );
  }
  submitUpdatedEntretien(id : number): void {
    this.entretienService
      .updateEntretien(
id ,        this.candidatureId,
        this.dateEntretien,
        this.heureDebut,
        this.heureFin
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

  getCandidatsByPoste(): void {
    this.posteService.getCandidatsByPosteIdEnAttenteEntretien(this.postId)
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
      title: this.eventData.title,
      start: this.eventData.start,
      end: this.eventData.end,
    };
    this.createEntretien(
      this.postId,
      this.candidatureId,
      this.eventData.date, // Utilisez la date de l'événement
      this.heureDebut,
      this.heureFin
    );
    this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
    this.resetEventData();
    this.showModal = false;
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
    postId: number,

    candidatureId: number,
    dateEntretien: string,
    heureDebut: string,
    heureFin: string
  ): void {
    // Call the createEntretien method from the PosteService to create the Entretien
    this.entretienService
      .createEntretien(
        postId,
        candidatureId,
        dateEntretien,
        heureDebut,
        heureFin
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
      this.postId,
      this.candidatureId,
      this.dateEntretien,
      this.heureDebut,
      this.heureFin
    );
  }

  handleDayClick(date: Date, jsEvent: MouseEvent) {
    // Your event handling logic here
    console.log('Clicked on day:', date.toLocaleString());
    // Optionally, open a modal, navigate to another view, etc.
  }
}
